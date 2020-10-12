import { AxiosBasicCredentials, AxiosProxyConfig, ResponseType } from 'axios';

export interface NestHttpOptions {
  baseURL?: string;
  headers?: { [key: string]: any };
  timeout?: number;
  withCredentials?: boolean;
  auth?: AxiosBasicCredentials;
  responseType?: ResponseType;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  maxContentLength?: number;
  maxRedirects?: number;
  proxy?: AxiosProxyConfig | false;
  service?: string;
}
