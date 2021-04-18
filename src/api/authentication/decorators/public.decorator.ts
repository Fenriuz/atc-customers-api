import { SetMetadata } from '@nestjs/common';
import { authConstants } from '@shared/constants/authentication.constants';

export const IS_PUBLIC_KEY = authConstants.publicRoutes;
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
