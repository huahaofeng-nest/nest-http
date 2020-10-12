import 'reflect-metadata';
import { Injectable } from '@nestjs/common';
import { NEST_HTTP_REQUEST, NEST_HTTP_REQUEST_PARAMS, NEST_HTTP_RESPONSE } from './nest-http.constants';
import { RequestMetadata } from './interfaces/request-metadata.interface';
import { ResponseMetadata } from './interfaces/response-metadata.interface';
import { ParamsMetadata } from './interfaces/params-metadata.interface';

@Injectable()
export class NestHttpMetadataAccessor {

  getRequests(target: Function): RequestMetadata[] | undefined {
    try {
      return Reflect.getMetadata(NEST_HTTP_REQUEST, target.constructor);
    } catch (e) {
      return;
    }
  }

  getResponse(target: Function, key: any): ResponseMetadata | undefined {
    try {
      return Reflect.getMetadata(NEST_HTTP_RESPONSE, target.constructor, key);
    } catch (e) {
      return;
    }
  }

  getParams(target: Function, key: any): ParamsMetadata | undefined {
    try {
      return Reflect.getMetadata(NEST_HTTP_REQUEST_PARAMS, target.constructor, key);
    } catch (e) {
      return;
    }
  }
}
