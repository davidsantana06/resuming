import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

const ApiCreatedResponses = (options: { type: Type<unknown> }) => {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description: 'Success',
      type: options.type,
    }),
    ApiResponse({ status: 400, description: 'Invalid data' }),
  );
};

export default ApiCreatedResponses;
