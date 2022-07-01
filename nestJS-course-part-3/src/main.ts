import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConflictInterceptor } from './common/erros/interceptors/conflict.interceptors';
import { DatabaseInterceptor } from './common/erros/interceptors/database.interceptors';
import { NotFoundInterceptor } from './common/erros/interceptors/notfound.interceptors';
import { UnathorizedInterceptor } from './common/erros/interceptors/unauthorized.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Simple blog')
    .setDescription('A simple blog created by 丂丨ㄥ卂丂ㄖㄥ丨 ')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

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
