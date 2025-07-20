
import { ObjectSchema } from 'joi';
import { JoiReqValidationError } from '@global/helpers/error/error-handler';
import { Request } from 'express';
//factory decorator, it is function can be passed args|params that return decorator,
type JoiDecorator=(target:any,key:string,descriptor:PropertyDescriptor)=>void
export function joiValidation(schema:ObjectSchema):JoiDecorator{
return (_target:any,_key:string | symbol,descriptor:PropertyDescriptor)=>{
    const originalMethod=descriptor.value;
    descriptor.value=async function(...args:any[]){
      const req:Request=args[0];
      const {error}=await Promise.resolve(schema.validate(req.body));
      if(error?.details){
         throw new JoiReqValidationError(error.details[0].message);
      }
    };
    return originalMethod;
  };
}
