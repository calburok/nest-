import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { TransformInterceptor } from './transform/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    // true -> DTOP에 정의된 프로퍼티만 허용

    new ValidationPipe({
      transform: true,
      whitelist: true, // true -> DTOP에 정의된 프로퍼티만 허용
      forbidNonWhitelisted: true, // 허용되지 않은 키가 있으면 즉시 400에러
    }),
  );

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
