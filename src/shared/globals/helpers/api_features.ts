import { Document, FilterQuery, Query } from 'mongoose';

export interface RequestQuery {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  sort?: string;
  page?: string;
  limit?: string;
  fields?: string;
  q?: string;
}

export interface PaginationMeta {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface QueryResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export class ApiFeatures<T extends Document> {
  private query: Query<T[], T>;
  private reqQueryStr: RequestQuery;
  private filterObj: FilterQuery<T> = {};
  private page: number = 1;
  private limit: number = 10;

  constructor(query: Query<T[], T>, reqQueryStr: RequestQuery) {
    this.query = query;
    this.reqQueryStr = reqQueryStr;
  }

  filter(): this {
    const queryObj = { ...this.reqQueryStr };
    const exclude = ['page', 'sort', 'limit', 'fields', 'q'];
    exclude.forEach(param => delete queryObj[param]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt|eq)\b/g, (match) => `$${match}`);
    this.filterObj = JSON.parse(queryStr);
    return this;
  }


  sorting(): this {
    if (this.reqQueryStr.sort) {
      const sortBy = this.reqQueryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields(...allowed: string[]): this {
    // if (this.reqQuery.fields) {
    // const fields = this.reqQuery.fields.split(',').join(' ');
    // need to recheck
    //   this.query = this.query.select(opts ? opts : fields);
    // } else {
    //   this.query = this.query.select('-__v');
    // }
    // return this;
    if (this.reqQueryStr.fields) {
      const requested = this.reqQueryStr.fields.split(',').filter(f => allowed.includes(f));
       // need to recheck
      this.query = this.query.select(requested.join(' '));
    } else {
      this.query = this.query.select('-__v');
    }
    return this;



    //   if (this.reqQuery.fields) {
    //   const fields = this.reqQuery.fields.split(',').join(' ');
    //   // need to recheck
    //   this.query = this.query.select(opts ? opts : fields);
    // } else {
    //   this.query = this.query.select('-__v');
    // }
    // return this;
  }

  paginate(): this {
    this.page = parseInt(this.reqQueryStr.page || '1', 10);
    this.limit = parseInt(this.reqQueryStr.limit || '10', 10);
    const skip = (this.page - 1) * this.limit;
    // const total_page = Math.floor(
    //   parseInt(await Tour.find(JSON.parse(queryStr)).countDocuments()) / limit,
    // );

    // if(req.query.skip){
    //   query=query.skip(skip).limit(limit)
    // }else{
    // }
    // if (reqQuery.page) {
    //   const numTours = await this.query.countDocuments();
    //   //  if(skip>numTours) throw  new Error('This page does not exist')
    //   console.log(`numTours:${numTours}`);
    //   if (skip > numTours) {
    //     page = parseInt(reqQuery.page === 1) * 1 || 1;
    //     skip = (total_page - 1) * limit;
    //     // skip=(req.query.page===1)*limit
    //   }
    // }
    this.query = this.query.skip(skip).limit(this.limit);
    return this;
  }

  searchByQuery(fields: (keyof T)[] = []): this {
  //       if(this.queryStr.q){
  //     const qu=this.queryStr.q.split('-').join(' ')
  //     this.query=this.query.find({$text:{$search:'\''+ qu + '\''}})
  //   }
  //   return this
  // }
    const q = this.reqQueryStr.q;
    if (q && fields.length > 0) {
      const regex = new RegExp(q.split('-').join(' '), 'i');
      this.filterObj.$or = fields.map((field) => ({
        [field]: { $regex: regex },
      })) as FilterQuery<T>[];
    } else if (q) {
      // If using $text index
      this.filterObj.$text = { $search: `'${q.split('-').join(' ')}'` };
    }
    return this;
  }
  async exec(): Promise<QueryResult<T>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const countQuery = (this.query.model as any).countDocuments(this.filterObj);
    const [totalItems, data] = await Promise.all([
      countQuery,
      this.query.find(this.filterObj),
    ]);

    const totalPages = Math.ceil(totalItems / this.limit);
    return {
      data,
      meta: {
        totalItems,
        totalPages,
        currentPage: this.page,
        limit: this.limit,
      },
    };
  }
}















// interface RequestQuery {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   [key: string]: any;
//   sort?: string;
//   page?: string;
//   limit?: string;
//   fields?: string;
//   q?: string;
// }

// class ApiFeatures<T extends Document> {
//   private query: Query<T[], T>;
//   private reqQueryStr: RequestQuery;

//   constructor(query: Query<T[], T>, reqQueryStr: RequestQuery) {
//     this.query = query;
//     this.reqQueryStr = reqQueryStr;
//   }

//   filter(): this {
//     const queryObjCopy = { ...this.reqQueryStr };
//     const excludedFields = ['page', 'limit', 'sort', 'fields', 'q'];
//     excludedFields.forEach((field) => delete queryObjCopy[field]);

//     let queryStr = JSON.stringify(queryObjCopy);
//     queryStr = queryStr.replace(
//       /\b(gte|gt|lt|lte|eq)\b/g,
//       (match) => `$${match}`,
//     );

//     const mongoFilter: FilterQuery<T> = JSON.parse(queryStr);
//     this.query = this.query.find(mongoFilter);
//     return this;
//   }

//   sorting(): this {
//     if (this.reqQueryStr.sort) {
//       const sortBy = this.reqQueryStr.sort.split(',').join(' ');
//       this.query = this.query.sort(sortBy);
//     } else {
//       this.query = this.query.sort('-createdAt');
//     }
//     return this;
//   }

//   limitFields(...opts: string[]): this {
//     if (this.reqQueryStr.fields) {
//       const fields = this.reqQueryStr.fields.split(',').join(' ');
//       this.query = this.query.select(opts.length > 0 ? opts.join(' ') : fields);
//     } else {
//       this.query = this.query.select('-__v');
//     }
//     return this;
//   }

//   paginate(): this {
//     const page = parseInt(this.reqQueryStr.page || '1', 10);
//     const limit = parseInt(this.reqQueryStr.limit || '4', 10);
//     const skip = (page - 1) * limit;

//     this.query = this.query.skip(skip).limit(limit);
//     return this;
//   }

//   searchByQuery(): this {
//     const q = this.reqQueryStr.q;
//     if (q) {
//       const queryText = q.split('-').join(' ');
//       this.query = this.query.find({
//         $text: { $search: `'${queryText}'` },
//       } as FilterQuery<T>);
//     }
//     return this;
//   }

//   getQuery(): Query<T[], T> {
//     return this.query;
//   }
// }

// export { ApiFeatures };
