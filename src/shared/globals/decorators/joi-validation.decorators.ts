/* eslint-disable @typescript-eslint/no-explicit-any */

import { ObjectSchema } from 'joi';

import { Request } from 'express';
import { JoiReqValidationError } from '@global/helpers/error/error-handler';
//factory decorator, it is function can be passed args|params that return decorator,
type JoiDecorator=(target:any,key:string,descriptor:PropertyDescriptor)=>void
export function joiValidation(schema:ObjectSchema):JoiDecorator{
return (_target:any,_key:string | symbol,descriptor:PropertyDescriptor)=>{
    const originalMethod=descriptor.value;
    //below we perform actual validation
    //params of async function are req =args[0],res=args[1],next=arg[2],  decs are attached to class or method
    // we are passing these 3 params and validating req.body by schema.validate
    descriptor.value=async function(...args:any[]){
      const req:Request=args[0];
      //joi provides us 2 options for validations 1st validateAsync 2nd validate
      //the diff is that if we use 1st opt then we need call validateAsync inside try/catch
      //if 2nd opt is chosen then we can call validate method without using try/catch
      //we can pass not only body for validation, req.params also can be passed
      const {error}=await Promise.resolve(schema.validate(req.body));
      //in case error does not have details property and not throwing error then we throw error
      // os details is array
      if(error?.details){
        //if error have details property or field that means it has error and it throws errors
        //so this message is coming from joi library
         throw new JoiReqValidationError(error.details[0].message);
      }
      //if the property does not exist or empty in this case do this following action
      //setting the args to original value we are resetting the args back to property(descriptor.value) and then we return descriptor
      return originalMethod.apply(this,args);

    };
    //so we are returning descriptor in order to get access to error message
    //this is all we need to create our joy validation method
    return descriptor;
  };
}
