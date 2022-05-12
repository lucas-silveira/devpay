import { Module } from '@nestjs/common';
import * as Presentation from './presentation';

@Module({
  imports: [],
  controllers: [
    Presentation.Http.HttpGlobalGatewayController,
    Presentation.Http.HttpPaymentsGatewayController,
    Presentation.Http.HttpRecipientsGatewayController,
  ],
  providers: [],
})
export class AppModule {}
