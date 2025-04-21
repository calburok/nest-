import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // ExecutionContext에서 요청 정보를 추출
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url, params } = request;

    // 요청 정보 로깅 (params 객체를 문자열로 변환)
    const now = Date.now();
    console.log(
      ` [Request],  method: ${method}, url: ${url}, params: ${JSON.stringify(params)}`,
    );

    // 핸들러로 요청을 넘김
    return next
      .handle()
      .pipe(tap(() => console.log(`Duration: ${Date.now() - now}`)));
  }
}
