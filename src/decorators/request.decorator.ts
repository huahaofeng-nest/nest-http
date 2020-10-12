import 'reflect-metadata';
import { NEST_HTTP_REQUEST } from '../nest-http.constants';
import { AxiosRequestConfig } from 'axios';

const createMappingDecorator = (method: string, path: string, options: object = {}) => {
  return (target, key) => {
    const metadataValue = { path, method, options, property: key };
    const previousValue = Reflect.getMetadata(NEST_HTTP_REQUEST, target.constructor) || [];
    const value = [...previousValue, metadataValue];
    Reflect.defineMetadata(NEST_HTTP_REQUEST, value, target.constructor);
  };
};

export const Get = (path: string, options?: AxiosRequestConfig): MethodDecorator => createMappingDecorator('GET', path, options);
export const Post = (path: string, options?: AxiosRequestConfig): MethodDecorator => createMappingDecorator('POST', path, options);
export const Put = (path: string, options?: AxiosRequestConfig): MethodDecorator => createMappingDecorator('PUT', path, options);
export const Delete = (path: string, options?: AxiosRequestConfig): MethodDecorator => createMappingDecorator('DELETE', path, options);
export const Head = (path: string, options?: AxiosRequestConfig): MethodDecorator => createMappingDecorator('HEAD', path, options);
export const Patch = (path: string, options?: AxiosRequestConfig): MethodDecorator => createMappingDecorator('PATCH', path, options);
export const Options = (path: string, options?: AxiosRequestConfig): MethodDecorator => createMappingDecorator('OPTIONS', path, options);
export const Trace = (path: string, options?: AxiosRequestConfig): MethodDecorator => createMappingDecorator('GET', path, options);
