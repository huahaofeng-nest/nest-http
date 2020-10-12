import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { NestHttpOptions } from './interfaces/nest-http-options.interface';
import { HttpException, ServiceUnavailableException } from '@nestjs/common';

export class NestHttpClient {
  private readonly http: AxiosInstance;

  constructor(options: NestHttpOptions = {}) {
    this.http = axios.create({ ...options });
  }

  public async get(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse | any> {
    return this.request({ method: 'get', url, ...config });
  }

  public async delete(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse | any> {
    return this.request({ method: 'delete', url, ...config });
  }

  public async head(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse | any> {
    return this.request({ method: 'head', url, ...config });
  }

  public async post(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<AxiosResponse | any> {
    return this.request({ method: 'post', url, data, ...config });
  }

  public async put(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<AxiosResponse | any> {
    return this.request({ method: 'put', url, data, ...config });
  }

  public async patch(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<AxiosResponse | any> {
    return this.request({ method: 'patch', url, data, ...config });
  }

  public async request(options: AxiosRequestConfig): Promise<AxiosResponse | any> {
    return this.send(options);
  }

  private async send(config: AxiosRequestConfig): Promise<AxiosResponse> {
    try {
      return await this.http.request(config);
    } catch (e) {
      if (e.response) {
        throw new HttpException(e.response.data, e.response.status);
      }
      if (e.request) {
        throw new HttpException(e.message, 400);
      }
      throw new ServiceUnavailableException(e.message);
    }
  }
}
