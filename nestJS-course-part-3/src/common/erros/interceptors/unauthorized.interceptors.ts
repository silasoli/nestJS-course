import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { UnathorizedError } from '../types/UnauthorizedError';

@Injectable()
export class UnathorizedInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof UnathorizedError) {
          throw new UnauthorizedException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
