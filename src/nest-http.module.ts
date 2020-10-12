import { DynamicModule, Global, Module } from '@nestjs/common';
import { NestHttpOptions } from './interfaces/nest-http-options.interface';
import { NEST_HTTP_CLIENT, NEST_HTTP_OPTIONS_PROVIDER } from './nest-http.constants';
import { NestHttpExplorer } from './nest-http.explorer';
import { NestHttpClient } from './nest-http.client';
import { DiscoveryModule } from '@nestjs/core';
import { NestHttpMetadataAccessor } from './nest-http.metadata.accessor';
import { NestHttpOrchestrator } from './nest-http.orchestrator';

@Global()
@Module({
  imports: [DiscoveryModule],
})
export class NestHttpModule {
  public static forRoot(options: NestHttpOptions = {}): DynamicModule {
    return this.register(options);
  }

  private static register(options: NestHttpOptions = {}): DynamicModule {
    const nestHttpOptionsProvider = {
      provide: NEST_HTTP_OPTIONS_PROVIDER,
      useFactory: () => {
        return options;
      },
    };

    const nestHttpClientProvider = {
      provide: NEST_HTTP_CLIENT,
      useFactory: (nestHttpOptionsProvider) => {
        return new NestHttpClient(nestHttpOptionsProvider);
      },
      inject: [NEST_HTTP_OPTIONS_PROVIDER],
    };

    return {
      module: NestHttpModule,
      providers: [nestHttpOptionsProvider, nestHttpClientProvider, NestHttpExplorer, NestHttpMetadataAccessor, NestHttpOrchestrator],
      exports: [nestHttpClientProvider],
    };
  }
}
