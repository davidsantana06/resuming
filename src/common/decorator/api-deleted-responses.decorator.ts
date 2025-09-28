import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

const ApiDeletedResponses = (options: {
  type: Type<unknown>;
  entityName: string;
}) => {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'Success',
      type: options.type,
    }),
    ApiResponse({
      status: 404,
      description: `${options.entityName} not found`,
    }),
  );
};

export default ApiDeletedResponses;
