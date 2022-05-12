import { Module } from '@nestjs/common';
import * as Presentation from './presentation';

@Module({
  imports: [],
  controllers: [
    Presentation.Http.HttpGlobalGatewayController,
    Presentation.Http.HttpPaymentsGatewayController,
  ],
  providers: [],
})
export class AppModule {}
