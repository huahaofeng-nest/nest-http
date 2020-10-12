import { Injectable, OnModuleInit } from '@nestjs/common';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { DiscoveryService } from '@nestjs/core';
import { NestHttpMetadataAccessor } from './nest-http.metadata.accessor';
import { NestHttpOrchestrator } from './nest-http.orchestrator';

@Injectable()
export class NestHttpExplorer implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataAccessor: NestHttpMetadataAccessor,
    private readonly orchestrator: NestHttpOrchestrator,
  ) {
  }

  async onModuleInit() {
    this.explore();
    this.orchestrator.mountDecoratorRequests();
  }

  explore() {
    const providers: InstanceWrapper[] = [
      ...this.discoveryService.getProviders(),
      ...this.discoveryService.getControllers(),
    ];
    providers.forEach((wrapper: InstanceWrapper) => {
      const { instance } = wrapper;
      if (!instance || typeof instance === 'string') {
        return;
      }
      this.lookupRequests(instance);
    });
  }

  lookupRequests(instance: Function) {
    const requests = this.metadataAccessor.getRequests(instance);
    if (requests && requests.length > 0) {
      for (const requestMetadata of requests) {
        const { property } = requestMetadata;
        const responseMetadata = this.metadataAccessor.getResponse(instance, property);
        const paramsMetadata = this.metadataAccessor.getParams(instance, property);
        this.orchestrator.addRequest(instance, requestMetadata, responseMetadata, paramsMetadata);
      }
    }
  }
}
