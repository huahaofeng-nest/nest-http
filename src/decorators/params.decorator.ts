import 'reflect-metadata';
import { NEST_HTTP_REQUEST_PARAMS, REQUEST_PARAM_TYPE } from '../nest-http.constants';

const assignMetadata = (args, paramType, index, field, value?) => {
  return {
    ...args,
    [`${paramType}:${index}`]: {
      index,
      field,
      value,
    },
  };
};

const createParamDecorator = (paramType) => {
  return (field?: string) => (target, key, index) => {
    const args = Reflect.getMetadata(NEST_HTTP_REQUEST_PARAMS, target.constructor, key) || {};
    Reflect.defineMetadata(
      NEST_HTTP_REQUEST_PARAMS,
      assignMetadata(args, paramType, index, field),
      target.constructor,
      key,
    );
  };
};

const createSetParamDecorator = (paramType) => {
  return (field: string | any, value?: any) => (target, key) => {
    if (field && typeof field !== 'string') {
      value = field;
      field = undefined;
    }
    const args = Reflect.getMetadata(NEST_HTTP_REQUEST_PARAMS, target.constructor, key) || {};
    Reflect.defineMetadata(
      NEST_HTTP_REQUEST_PARAMS,
      assignMetadata(args, paramType, 'const__' + field, field, value),
      target.constructor,
      key,
    );
  };
};

export const Param = (field?: string): ParameterDecorator => createParamDecorator(REQUEST_PARAM_TYPE.PARAM)(field);
export const Body = (field?: string): ParameterDecorator => createParamDecorator(REQUEST_PARAM_TYPE.BODY)(field);
export const Query = (field?: string): ParameterDecorator => createParamDecorator(REQUEST_PARAM_TYPE.QUERY)(field);
export const Header = (field?: string): ParameterDecorator => createParamDecorator(REQUEST_PARAM_TYPE.HEADER)(field);
export const SetHeader = (field: string | any, value?: any): MethodDecorator => createSetParamDecorator(REQUEST_PARAM_TYPE.HEADER)(field, value);
export const SetQuery = (field: string | any, value?: any): MethodDecorator => createSetParamDecorator(REQUEST_PARAM_TYPE.QUERY)(field, value);
export const SetBody = (field: string | any, value?: any): MethodDecorator => createSetParamDecorator(REQUEST_PARAM_TYPE.BODY)(field, value);
export const SetParam = (field: string | any, value?: any): MethodDecorator => createSetParamDecorator(REQUEST_PARAM_TYPE.PARAM)(field, value);
