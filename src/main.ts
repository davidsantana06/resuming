import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';

const setupViewEngine = (app: NestExpressApplication) => {
  app.setViewEngine('hbs');
  app.setBaseViewsDir('view');
};

const setupStaticAssets = (app: NestExpressApplication) => {
  app.useStaticAssets('static', { prefix: '/static' });
};

const setupExceptionFilter = (app: NestExpressApplication) => {
  const exceptionFilter = new HttpExceptionFilter();
  app.useGlobalFilters(exceptionFilter);
};

const setupValidationPipe = (app: NestExpressApplication) => {
  const validationPipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  });
  app.useGlobalPipes(validationPipe);
};

const setupSwagger = (app: NestExpressApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Resuming')
    .setDescription('Platform dedicated to managing and sharing resumes')
    .addTag('app')
    .addTag('auth')
    .addTag('profile')
    .addTag('user')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'accessToken',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme();
  const options = {
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
    jsonDocumentUrl: 'swagger/json',
  };

  SwaggerModule.setup('swagger/ui', app, document, options);
};

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  setupViewEngine(app);
  setupStaticAssets(app);
  setupExceptionFilter(app);
  setupValidationPipe(app);
  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
};

bootstrap();
