import 'reflect-metadata';
import { NEST_HTTP_RESPONSE, NEST_HTTP_RESPONSE_CONFIG } from '../nest-http.constants';

export const Response = (config: NEST_HTTP_RESPONSE_CONFIG = NEST_HTTP_RESPONSE_CONFIG.BODY): MethodDecorator => {
  return (target, key) => {
    Reflect.defineMetadata(
      NEST_HTTP_RESPONSE,
      { config, property: key },
      target.constructor,
      key,
    );
  };
};
