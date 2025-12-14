import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ResponseApi, ResponseMetadata } from '../interfaces/types';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ResponseApi<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T | ResponseMetadata<T>>,
  ): Observable<ResponseApi<T>> | Promise<Observable<ResponseApi<T>>> {
    return next.handle().pipe(
      map((data) => {
        const { metadata, data: responseData, token } = data ?? {};

        return {
          data: metadata || token ? responseData : data,
          message: 'Request successful',
          status: HttpStatus.OK,
          ...(metadata && { metadata }),
          ...(token && { token }),
        } as ResponseApi<T>;
      }),
    );
  }
}
