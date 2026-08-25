import { TestingModule, Test } from '@nestjs/testing';
import { Provider, Type } from '@nestjs/common';

export const createTestingModule = (
  controllers: Type<unknown>[] = [],
  providers: Provider[] = [],
): Promise<TestingModule> =>
  Test.createTestingModule({ controllers, providers }).compile();
