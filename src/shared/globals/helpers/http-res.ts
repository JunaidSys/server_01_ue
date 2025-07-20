/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import HSC from 'http-status-codes';
import { Response } from 'express';

type RES_WITH_DATA = {
  res: Response;
  statusCode: number;
  data: Record<string, any> | Record<string, any>[] | any | null;
};

// Record<string, any> | Record<string, any>[] | any | null
type Data=Record<string, any> | Record<string, any>[] | any | null;
export class HttpRes {
  static hsc = HSC;
  static test() {
    console.log(this.hsc);
  }
  static getStatusText(statusCode: number): string {
    return this.hsc.getStatusText(statusCode);
  }
  static getStatusCode(statusText: string): number {
    return this.hsc.getStatusCode(statusText);
  }
  static RES_WITH_DATA(res: Response, statusCode: number, data?: Record<string, any> | Record<string, any>[] | any | null) {
    // return res.status(Number(statusCode)).send(data);
    return res.status(Number(statusCode)).json(JSON.parse(JSON.stringify(data)));
  }
  static ACCEPTED(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.ACCEPTED, {
      statusCode: this.hsc.ACCEPTED,
      statusResp: statusFn(this.hsc.ACCEPTED),
      message: message ? message : this.hsc.getStatusText(this.hsc.ACCEPTED)
    });
  }
  static BAD_GATEWAY(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.BAD_GATEWAY, {
      statusCode: this.hsc.BAD_GATEWAY,
      statusResp: statusFn(this.hsc.BAD_GATEWAY),
      message: message ? message : this.hsc.getStatusText(this.hsc.BAD_GATEWAY)
    });
  }
  static BAD_REQUEST(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.BAD_REQUEST, {
      statusCode: this.hsc.BAD_REQUEST,
      statusResp: statusFn(this.hsc.BAD_REQUEST),
      message: message ? message : this.hsc.getStatusText(this.hsc.BAD_REQUEST)
    });
  }
  static CONFLICT(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.CONFLICT, {
      statusCode: this.hsc.CONFLICT,
      statusResp: statusFn(this.hsc.CONFLICT),
      message: message ? message : this.hsc.getStatusText(this.hsc.CONFLICT)
    });
  }
  static CONTINUE(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.CONTINUE, {
      statusCode: this.hsc.CONTINUE,
      statusResp: statusFn(this.hsc.CONTINUE),
      message: message ? message : this.hsc.getStatusText(this.hsc.CONTINUE)
    });
  }
  static CREATED(res: Response, data?: any, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.CREATED, {
      statusCode: this.hsc.CREATED,
      statusResp: statusFn(this.hsc.CREATED),
      message: message ? message : this.hsc.getStatusText(this.hsc.CREATED),
      data: data ? { ...data } : null
    });
  }
  static EXPECTATION_FAILED(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.EXPECTATION_FAILED, {
      statusCode: this.hsc.EXPECTATION_FAILED,
      statusResp: statusFn(this.hsc.EXPECTATION_FAILED),
      message: message ? message : this.hsc.getStatusText(this.hsc.EXPECTATION_FAILED)
    });
  }
  static FORBIDDEN(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.FORBIDDEN, {
      statusCode: this.hsc.FORBIDDEN,
      statusResp: statusFn(this.hsc.FORBIDDEN),
      message: message ? message : this.hsc.getStatusText(this.hsc.FORBIDDEN)
    });
  }
  static GATEWAY_TIMEOUT(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.GATEWAY_TIMEOUT, {
      statusCode: this.hsc.GATEWAY_TIMEOUT,
      statusResp: statusFn(this.hsc.GATEWAY_TIMEOUT),
      message: message ? message : this.hsc.getStatusText(this.hsc.GATEWAY_TIMEOUT)
    });
  }
  static GONE(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.GONE, {
      statusCode: this.hsc.GONE,
      statusResp: statusFn(this.hsc.GONE),
      message: message ? message : this.hsc.getStatusText(this.hsc.GONE)
    });
  }
  static HTTP_VERSION_NOT_SUPPORTED(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.HTTP_VERSION_NOT_SUPPORTED, {
      statusCode: this.hsc.HTTP_VERSION_NOT_SUPPORTED,
      statusResp: statusFn(this.hsc.HTTP_VERSION_NOT_SUPPORTED),
      message: message ? message : this.hsc.getStatusText(this.hsc.HTTP_VERSION_NOT_SUPPORTED)
    });
  }
  static IM_A_TEAPOT(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.IM_A_TEAPOT, {
      statusCode: this.hsc.IM_A_TEAPOT,
      statusResp: statusFn(this.hsc.IM_A_TEAPOT),
      message: message ? message : this.hsc.getStatusText(this.hsc.IM_A_TEAPOT)
    });
  }
  static INSUFFICIENT_SPACE_ON_RESOURCE(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.INSUFFICIENT_SPACE_ON_RESOURCE, {
      statusCode: this.hsc.INSUFFICIENT_SPACE_ON_RESOURCE,
      statusResp: statusFn(this.hsc.INSUFFICIENT_SPACE_ON_RESOURCE),
      message: message ? message : this.hsc.getStatusText(this.hsc.INSUFFICIENT_SPACE_ON_RESOURCE)
    });
  }
  static INSUFFICIENT_STORAGE(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.INSUFFICIENT_STORAGE, {
      statusCode: this.hsc.INSUFFICIENT_STORAGE,
      statusResp: statusFn(this.hsc.INSUFFICIENT_STORAGE),
      message: message ? message : this.hsc.getStatusText(this.hsc.INSUFFICIENT_STORAGE)
    });
  }
  static INTERNAL_SERVER_ERROR(res: Response, data?: any, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.INTERNAL_SERVER_ERROR, {
      statusCode: this.hsc.INTERNAL_SERVER_ERROR,
      statusResp: statusFn(this.hsc.INTERNAL_SERVER_ERROR),
      message: message ? message : this.hsc.getStatusText(this.hsc.INTERNAL_SERVER_ERROR),
      ...data
    });
  }
  static LENGTH_REQUIRED(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.LENGTH_REQUIRED, {
      statusCode: this.hsc.LENGTH_REQUIRED,
      statusResp: statusFn(this.hsc.LENGTH_REQUIRED),
      message: message ? message : this.hsc.getStatusText(this.hsc.LENGTH_REQUIRED)
    });
  }
  static LOCKED(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.LOCKED, {
      statusCode: this.hsc.LOCKED,
      statusResp: statusFn(this.hsc.LOCKED),
      message: message ? message : this.hsc.getStatusText(this.hsc.LOCKED)
    });
  }
  static METHOD_FAILURE(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.METHOD_FAILURE, {
      statusCode: this.hsc.METHOD_FAILURE,
      statusResp: statusFn(this.hsc.METHOD_FAILURE),
      message: message ? message : this.hsc.getStatusText(this.hsc.METHOD_FAILURE)
    });
  }
  static METHOD_NOT_ALLOWED(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.METHOD_NOT_ALLOWED, {
      statusCode: this.hsc.METHOD_NOT_ALLOWED,
      statusResp: statusFn(this.hsc.METHOD_NOT_ALLOWED),
      message: message ? message : this.hsc.getStatusText(this.hsc.METHOD_NOT_ALLOWED)
    });
  }
  static MOVED_PERMANENTLY(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.MOVED_PERMANENTLY, {
      statusCode: this.hsc.MOVED_PERMANENTLY,
      statusResp: statusFn(this.hsc.MOVED_PERMANENTLY),
      message: message ? message : this.hsc.getStatusText(this.hsc.MOVED_PERMANENTLY)
    });
  }
  static MOVED_TEMPORARILY(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.MOVED_TEMPORARILY, {
      statusCode: this.hsc.MOVED_TEMPORARILY,
      statusResp: statusFn(this.hsc.MOVED_TEMPORARILY),
      message: message ? message : this.hsc.getStatusText(this.hsc.MOVED_TEMPORARILY)
    });
  }
  static MULTI_STATUS(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.MULTI_STATUS, {
      statusCode: this.hsc.MULTI_STATUS,
      statusResp: statusFn(this.hsc.MULTI_STATUS),
      message: message ? message : this.hsc.getStatusText(this.hsc.MULTI_STATUS)
    });
  }
  static MULTIPLE_CHOICES(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.MULTIPLE_CHOICES, {
      statusCode: this.hsc.MULTIPLE_CHOICES,
      statusResp: statusFn(this.hsc.MULTIPLE_CHOICES),
      message: message ? message : this.hsc.getStatusText(this.hsc.MULTIPLE_CHOICES)
    });
  }
  static NETWORK_AUTHENTICATION_REQUIRED(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.NETWORK_AUTHENTICATION_REQUIRED, {
      statusCode: this.hsc.NETWORK_AUTHENTICATION_REQUIRED,
      statusResp: statusFn(this.hsc.NETWORK_AUTHENTICATION_REQUIRED),
      message: message ? message : this.hsc.getStatusText(this.hsc.NETWORK_AUTHENTICATION_REQUIRED)
    });
  }
  static NO_CONTENT(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.NO_CONTENT, {
      statusCode: this.hsc.NO_CONTENT,
      statusResp: statusFn(this.hsc.NO_CONTENT),
      message: message ? message : this.hsc.getStatusText(this.hsc.NO_CONTENT)
    });
  }
  static NON_AUTHORITATIVE_INFORMATION(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.NON_AUTHORITATIVE_INFORMATION, {
      statusCode: this.hsc.NON_AUTHORITATIVE_INFORMATION,
      statusResp: statusFn(this.hsc.NON_AUTHORITATIVE_INFORMATION),
      message: message ? message : this.hsc.getStatusText(this.hsc.NON_AUTHORITATIVE_INFORMATION)
    });
  }
  static NOT_ACCEPTABLE(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.NOT_ACCEPTABLE, {
      statusCode: this.hsc.NOT_ACCEPTABLE,
      statusResp: statusFn(this.hsc.NOT_ACCEPTABLE),
      message: message ? message : this.hsc.getStatusText(this.hsc.NOT_ACCEPTABLE)
    });
  }
  static NOT_FOUND(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.NOT_FOUND, {
      statusCode: this.hsc.NOT_FOUND,
      statusResp: statusFn(this.hsc.NOT_FOUND),
      message: message ? message : this.hsc.getStatusText(this.hsc.NOT_FOUND)
    });
  }
  static NOT_IMPLEMENTED(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.NOT_IMPLEMENTED, {
      statusCode: this.hsc.NOT_IMPLEMENTED,
      statusResp: statusFn(this.hsc.NOT_IMPLEMENTED),
      message: message ? message : this.hsc.getStatusText(this.hsc.NOT_IMPLEMENTED)
    });
  }
  static NOT_MODIFIED(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.NOT_MODIFIED, {
      statusCode: this.hsc.NOT_MODIFIED,
      statusResp: statusFn(this.hsc.NOT_MODIFIED),
      message: message ? message : this.hsc.getStatusText(this.hsc.NOT_MODIFIED)
    });
  }
  static OK(res: Response, message?: string, data?: any) {
    return this.RES_WITH_DATA(res, this.hsc.OK, {
      statusCode: this.hsc.OK,
      statusResp: statusFn(this.hsc.OK),
      message: message ? message : this.hsc.getStatusText(this.hsc.OK),
      data: data ? data : null
    });
  }
  static PARTIAL_CONTENT(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.PARTIAL_CONTENT, {
      statusCode: this.hsc.PARTIAL_CONTENT,
      statusResp: statusFn(this.hsc.PARTIAL_CONTENT),
      message: message ? message : this.hsc.getStatusText(this.hsc.PARTIAL_CONTENT)
    });
  }
  static PAYMENT_REQUIRED(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.PAYMENT_REQUIRED, {
      statusCode: this.hsc.PAYMENT_REQUIRED,
      statusResp: statusFn(this.hsc.PAYMENT_REQUIRED),
      message: message ? message : this.hsc.getStatusText(this.hsc.PAYMENT_REQUIRED)
    });
  }
  static PERMANENT_REDIRECT(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.PERMANENT_REDIRECT, {
      statusCode: this.hsc.PERMANENT_REDIRECT,
      statusResp: statusFn(this.hsc.PERMANENT_REDIRECT),
      message: message ? message : this.hsc.getStatusText(this.hsc.PERMANENT_REDIRECT)
    });
  }
  static PRECONDITION_FAILED(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.PRECONDITION_FAILED, {
      statusCode: this.hsc.PRECONDITION_FAILED,
      statusResp: statusFn(this.hsc.PRECONDITION_FAILED),
      message: message ? message : this.hsc.getStatusText(this.hsc.PRECONDITION_FAILED)
    });
  }
  static PRECONDITION_REQUIRED(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.PRECONDITION_REQUIRED, {
      statusCode: this.hsc.PRECONDITION_REQUIRED,
      statusResp: statusFn(this.hsc.PRECONDITION_REQUIRED),
      message: message ? message : this.hsc.getStatusText(this.hsc.PRECONDITION_REQUIRED)
    });
  }
  static PROCESSING(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.PROCESSING, {
      statusCode: this.hsc.PROCESSING,
      statusResp: statusFn(this.hsc.PROCESSING),
      message: message ? message : this.hsc.getStatusText(this.hsc.PROCESSING)
    });
  }
  static PROXY_AUTHENTICATION_REQUIRED(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.PROXY_AUTHENTICATION_REQUIRED, {
      statusCode: this.hsc.PROXY_AUTHENTICATION_REQUIRED,
      statusResp: statusFn(this.hsc.PROXY_AUTHENTICATION_REQUIRED),
      message: message ? message : this.hsc.getStatusText(this.hsc.PROXY_AUTHENTICATION_REQUIRED)
    });
  }
  static REQUEST_HEADER_FIELDS_TOO_LARGE(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.REQUEST_HEADER_FIELDS_TOO_LARGE, {
      statusCode: this.hsc.REQUEST_HEADER_FIELDS_TOO_LARGE,
      statusResp: statusFn(this.hsc.REQUEST_HEADER_FIELDS_TOO_LARGE),
      message: message ? message : this.hsc.getStatusText(this.hsc.REQUEST_HEADER_FIELDS_TOO_LARGE)
    });
  }
  static REQUEST_TIMEOUT(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.REQUEST_TIMEOUT, {
      statusCode: this.hsc.REQUEST_TIMEOUT,
      statusResp: statusFn(this.hsc.REQUEST_TIMEOUT),
      message: message ? message : this.hsc.getStatusText(this.hsc.REQUEST_TIMEOUT)
    });
  }
  static REQUEST_TOO_LONG(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.REQUEST_TOO_LONG, {
      statusCode: this.hsc.REQUEST_TOO_LONG,
      statusResp: statusFn(this.hsc.REQUEST_TOO_LONG),
      message: message ? message : this.hsc.getStatusText(this.hsc.REQUEST_TOO_LONG)
    });
  }
  static REQUEST_URI_TOO_LONG(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.REQUEST_URI_TOO_LONG, {
      statusCode: this.hsc.REQUEST_URI_TOO_LONG,
      statusResp: statusFn(this.hsc.REQUEST_URI_TOO_LONG),
      message: message ? message : this.hsc.getStatusText(this.hsc.REQUEST_URI_TOO_LONG)
    });
  }
  static REQUESTED_RANGE_NOT_SATISFIABLE(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.REQUESTED_RANGE_NOT_SATISFIABLE, {
      statusCode: this.hsc.REQUESTED_RANGE_NOT_SATISFIABLE,
      statusResp: statusFn(this.hsc.REQUESTED_RANGE_NOT_SATISFIABLE),
      message: message ? message : this.hsc.getStatusText(this.hsc.REQUESTED_RANGE_NOT_SATISFIABLE)
    });
  }
  static RESET_CONTENT(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.RESET_CONTENT, {
      statusCode: this.hsc.RESET_CONTENT,
      statusResp: statusFn(this.hsc.RESET_CONTENT),
      message: message ? message : this.hsc.getStatusText(this.hsc.RESET_CONTENT)
    });
  }
  static SEE_OTHER(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.SEE_OTHER, {
      statusCode: this.hsc.SEE_OTHER,
      statusResp: statusFn(this.hsc.SEE_OTHER),
      message: message ? message : this.hsc.getStatusText(this.hsc.SEE_OTHER)
    });
  }
  static SERVICE_UNAVAILABLE(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.SERVICE_UNAVAILABLE, {
      statusCode: this.hsc.SERVICE_UNAVAILABLE,
      statusResp: statusFn(this.hsc.SERVICE_UNAVAILABLE),
      message: message ? message : this.hsc.getStatusText(this.hsc.SERVICE_UNAVAILABLE)
    });
  }
  static SWITCHING_PROTOCOLS(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.SWITCHING_PROTOCOLS, {
      statusCode: this.hsc.SWITCHING_PROTOCOLS,
      statusResp: statusFn(this.hsc.SWITCHING_PROTOCOLS),
      message: message ? message : this.hsc.getStatusText(this.hsc.SWITCHING_PROTOCOLS)
    });
  }
  static TEMPORARY_REDIRECT(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.TEMPORARY_REDIRECT, {
      statusCode: this.hsc.TEMPORARY_REDIRECT,
      statusResp: statusFn(this.hsc.TEMPORARY_REDIRECT),
      message: message ? message : this.hsc.getStatusText(this.hsc.TEMPORARY_REDIRECT)
    });
  }
  static TOO_MANY_REQUESTS(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.TOO_MANY_REQUESTS, {
      statusCode: this.hsc.TOO_MANY_REQUESTS,
      statusResp: statusFn(this.hsc.TOO_MANY_REQUESTS),
      message: message ? message : this.hsc.getStatusText(this.hsc.TOO_MANY_REQUESTS)
    });
  }
  static UNAUTHORIZED(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.UNAUTHORIZED, {
      statusCode: this.hsc.UNAUTHORIZED,
      statusResp: statusFn(this.hsc.UNAUTHORIZED),
      message: message ? message : this.hsc.getStatusText(this.hsc.UNAUTHORIZED)
    });
  }
  static UNPROCESSABLE_ENTITY(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.UNPROCESSABLE_ENTITY, {
      statusCode: this.hsc.UNPROCESSABLE_ENTITY,
      statusResp: statusFn(this.hsc.UNPROCESSABLE_ENTITY),
      message: message ? message : this.hsc.getStatusText(this.hsc.UNPROCESSABLE_ENTITY)
    });
  }
  static UNSUPPORTED_MEDIA_TYPE(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.UNSUPPORTED_MEDIA_TYPE, {
      statusCode: this.hsc.UNSUPPORTED_MEDIA_TYPE,
      statusResp: statusFn(this.hsc.UNSUPPORTED_MEDIA_TYPE),
      message: message ? message : this.hsc.getStatusText(this.hsc.UNSUPPORTED_MEDIA_TYPE)
    });
  }
  static USE_PROXY(res: Response, message?: string) {
    return this.RES_WITH_DATA(res, this.hsc.USE_PROXY, {
      statusCode: this.hsc.USE_PROXY,
      statusResp: statusFn(this.hsc.USE_PROXY),
      message: message ? message : this.hsc.getStatusText(this.hsc.USE_PROXY)
    });
  }
}
type CodeResult = 'information' | 'success' | 'redirection' | 'client error' | 'server error' | 'error';

const statusFn = (resStatusCode: number): CodeResult => {
  switch (true) {
    case resStatusCode === 100 && resStatusCode <= 199:
      return 'information';
    case resStatusCode === 200 && resStatusCode <= 299:
      return 'success';
    case resStatusCode == 300 && resStatusCode <= 399:
      return 'redirection';
    case resStatusCode == 400 && resStatusCode <= 499:
      return 'client error';
    case resStatusCode == 500 && resStatusCode <= 599:
      return 'server error';
    default:
      return 'error';
  }
};

const statusFunV1 = (statusCode: number): CodeResult => {
  if (statusCode === 100 && statusCode <= 199) {
    return 'information';
  } else if (statusCode === 200 && statusCode <= 299) {
    return 'success';
  } else if (statusCode == 300 && statusCode <= 399) {
    return 'redirection';
  } else if (statusCode == 400 && statusCode <= 499) {
    return 'client error';
  } else if (statusCode == 500 && statusCode <= 599) {
    return 'server error';
  } else {
    return 'error';
  }
};
