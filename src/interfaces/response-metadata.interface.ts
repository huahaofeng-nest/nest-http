import { NEST_HTTP_RESPONSE_CONFIG } from '../nest-http.constants';

export interface ResponseMetadata {
  config?: NEST_HTTP_RESPONSE_CONFIG,
  property: string;
}
