import { ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

const ApiAuthProtected = () => {
  return applyDecorators(
    ApiBearerAuth('accessToken'),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
};

export default ApiAuthProtected;
