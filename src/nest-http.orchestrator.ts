import { Inject, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { NEST_HTTP_OPTIONS_PROVIDER, NEST_HTTP_RESPONSE_CONFIG } from './nest-http.constants';
import { NestHttpOptions } from './interfaces/nest-http-options.interface';
import { NestHttpClient } from './nest-http.client';
import { RequestMetadata } from './interfaces/request-metadata.interface';
import { ResponseMetadata } from './interfaces/response-metadata.interface';
import { getRequestParams } from './utils/params.util';
import { ParamsMetadata } from './interfaces/params-metadata.interface';
import uriParams = require('uri-params');

interface DecoratorRequest {
  requestMetadata: RequestMetadata,
  responseMetadata: ResponseMetadata,
  paramsMetadata: ParamsMetadata,
  target: Function
}

@Injectable()
export class NestHttpOrchestrator {
  private readonly decoratorRequests = new Map<string, DecoratorRequest>();

  constructor(
    @Inject(NEST_HTTP_OPTIONS_PROVIDER) private readonly options: NestHttpOptions,
  ) {
  }

  public addRequest(target: Function, requestMetadata: RequestMetadata, responseMetadata: ResponseMetadata, paramsMetadata: ParamsMetadata) {
    const { property } = requestMetadata;
    const key = `${property}__${target.constructor.name}`;
    this.decoratorRequests.set(key, { requestMetadata, responseMetadata, paramsMetadata, target });
  }

  mountDecoratorRequests() {
    for (const item of this.decoratorRequests.values()) {
      const { target, requestMetadata, responseMetadata, paramsMetadata } = item;
      const { path, method, options, property } = requestMetadata;

      const http = new NestHttpClient({
        ...this.options,
      });

      target[property] = async (...params: any[]) => {
        const requestParams = getRequestParams(paramsMetadata, params);
        const requestOptions = {
          ...options,
          params: { ...options.params, ...requestParams.query },
          data: { ...options.data, ...requestParams.body },
          headers: { ...options.headers, ...requestParams.headers },
          url: uriParams(path || options.url, requestParams.params),
          method: method || options.method,
        } as AxiosRequestConfig;

        const response = await http.request(requestOptions);

        const { config } = responseMetadata || {};
        switch (config) {
          case NEST_HTTP_RESPONSE_CONFIG.FULL:
            return response;
          case NEST_HTTP_RESPONSE_CONFIG.HEADER:
            return response.headers;
          case NEST_HTTP_RESPONSE_CONFIG.BODY:
          default:
            return response.data;
        }
      };
    }
  }
}
