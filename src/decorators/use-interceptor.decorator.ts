import { Interceptor } from '../interfaces/interceptor.interface';
import { NEST_HTTP_INTERCEPTOR } from '../nest-http.constants';

export function UseInterceptors(...interceptors: (Interceptor | Function)[]) {
  return (target, key) => {
    const previousValue =
      Reflect.getMetadata(NEST_HTTP_INTERCEPTOR, target.constructor, key) || [];
    Reflect.defineMetadata(
      NEST_HTTP_INTERCEPTOR,
      [...previousValue, ...interceptors],
      target.constructor,
      key,
    );
  };
}
