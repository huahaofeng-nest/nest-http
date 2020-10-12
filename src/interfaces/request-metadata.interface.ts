import { AxiosRequestConfig } from 'axios';

export interface RequestMetadata {
  path: string;
  method: string;
  options?: AxiosRequestConfig;
  property: string;
}
