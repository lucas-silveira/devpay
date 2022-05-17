import { Injectable } from '@nestjs/common';
import { Recipient } from '@domain/recipient';

@Injectable()
export class ProvidersIntegrationService {
  public async integrateWithStone(recipient: Recipient): Promise<void> {
    return;
  }
}
