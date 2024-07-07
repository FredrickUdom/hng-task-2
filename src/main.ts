import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './common/config/environment';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filter/filter';
import { TransformationInterceptor } from './common/interceptor/user.response';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: environment.CORS.CORSORIGIN,
    credentials: true,
    methods: 'GET,POST,PATCH,DELETE',
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    errorHttpStatusCode: 422,
  }));
  app.useGlobalInterceptors(new TransformationInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.setGlobalPrefix('api/v1');
  const Port = environment.PROJECT_PORT.PORT;
  await app.listen(Port, () => console.log(`project running on ${Port}`) );
}
bootstrap();
