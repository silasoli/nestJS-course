import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConflictInterceptor } from './common/erros/interceptors/conflict.interceptors';
import { DatabaseInterceptor } from './common/erros/interceptors/database.interceptors';
import { NotFoundInterceptor } from './common/erros/interceptors/notfound.interceptors';
import { UnathorizedInterceptor } from './common/erros/interceptors/unauthorized.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  //app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());
  app.useGlobalInterceptors(new UnathorizedInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
