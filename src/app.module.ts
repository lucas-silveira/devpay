import { Module } from '@nestjs/common';
import * as Presentation from './presentation';

@Module({
  imports: [],
  controllers: [Presentation.Http.HttpGlobalGatewayController],
  providers: [],
})
export class AppModule {}
