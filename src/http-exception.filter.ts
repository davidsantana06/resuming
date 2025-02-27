import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const { url } = request;
    const status = exception.getStatus();

    const isApiRequest = url.startsWith('/api/') && url !== '/api/';

    const isNotFound = !isApiRequest && status === 404;
    if (isNotFound) return response.render('404');

    return response.status(status).json(exception.getResponse());
  }
}
