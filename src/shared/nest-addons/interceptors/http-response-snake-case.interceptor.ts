import * as Nest from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as snakecaseKeys from 'snakecase-keys';

@Nest.Injectable()
export class HttpResponseSnakeCaseInterceptor implements Nest.NestInterceptor {
  intercept(
    context: Nest.ExecutionContext,
    next: Nest.CallHandler,
  ): Observable<any> {
    if (context.getType() === 'http') {
      return next
        .handle()
        .pipe(map((data) => snakecaseKeys(data, { deep: true })));
    }
    return next.handle();
  }
}
