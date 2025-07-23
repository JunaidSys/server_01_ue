import { Request, Response, NextFunction } from 'express';
import { Model, Document, PopulateOptions } from 'mongoose';


import { HttpRes } from './http-res';
import { ApiFeatures } from './api_features';

import { AppError } from './error/Error_Handler';
import UtilityHelper from './utility_helper';


export class CRUDService<T extends Document> {
  constructor(private model: Model<T>) {}

  delete() {
    return UtilityHelper.catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const doc = await this.model.findByIdAndDelete(req.params.id);
      if (!doc) {
        return next(new AppError(404, `No document found with ID ${req.params.id}`));
      }
      HttpRes.RES_WITH_DATA(res, 200, {
        message: 'Deleted successfully',
        status: 'success',
        data: null,
      });
    });
  }

  create() {
    return UtilityHelper.catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const data = await this.model.create(req.body);

      if (!data) {
        return next(new AppError(400, 'Failed to create document'));
      }

      HttpRes.RES_WITH_DATA(res, 201, {
        message: 'Created successfully',
        status: 'success',
        data,
      });
    });
  }

  update() {
    return UtilityHelper.catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const updated = await this.model.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updated) {
        return next(new AppError(404, `No document found with ID ${id}`));
      }

      HttpRes.RES_WITH_DATA(res, 200, {
        message: 'Updated successfully',
        status: 'success',
        data: updated,
      });
    });
  }

  //  read(populateOptions?: string | PopulateOptions | (string | PopulateOptions)[]) {
  read(populateOptions?:  (string | PopulateOptions)[]) {
    return UtilityHelper.catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const { id, slug } = req.params;
      let query = this.model.findById(id);
      if (id && slug) {
        query = this.model.findOne({ _id: id, slug });
      }
      if (populateOptions) {
        query = query.populate(populateOptions);
      }
      const data = await query;
      if (!data) {
        return next(new AppError(404, 'Document not found'));
      }

      HttpRes.RES_WITH_DATA(res, 200, {
        message: 'Fetched successfully',
        status: 'success',
        data,
      });
    });
  }

  readAll() {
    return UtilityHelper.catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const features = new ApiFeatures(this.model.find(), req.query)
        .filter()
        .sorting()
        .limitFields()
        .paginate();

      const data = await features.query;

      if (!data || data.length === 0) {
        return next(new AppError(404, 'No documents found'));
      }

      res.status(200).json({
        message: 'Fetched successfully',
        status: 'success',
        length: data.length,
        data,
      });
    });
  }
}
