import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './common/config/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: environment.CORS.CORSORIGIN,
    credentials: true,
    methods: 'GET,POST,PATCH,DELETE',
  });
  app.setGlobalPrefix('api/v1');
  const Port = environment.PROJECT_PORT.PORT;
  await app.listen(Port, () => console.log(`project running on ${Port}`) );
}
bootstrap();
