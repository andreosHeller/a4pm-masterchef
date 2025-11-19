import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('a4pm-masterchef API')
    .setDescription('Users & Recipes (no auth tokens in v1)')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  app.getHttpAdapter().get('/docs-json', (req, res) => res.json(document));

  const port = process.env.API_PORT || 3000;
  await app.listen(port);

  console.log(`API listening on http://localhost:${port}`);
}
bootstrap();
