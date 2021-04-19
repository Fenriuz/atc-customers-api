import { Controller, Get, Param } from '@nestjs/common';
import { controllerRoutes } from '@shared/constants/controller-routes.constants';
import { AuthenticationService } from './authentication.service';
import { Public } from './decorators/public.decorator';
import { auth } from 'firebase-admin';

@Controller(controllerRoutes.authentication)
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Public()
  @Get('checkPhone/:phone')
  findByPhone(@Param('phone') phone: string) {
    return this.authenticationService.findByPhone(phone);
  }

  @Public()
  @Get('token')
  token() {
    return auth().createCustomToken('oBzP6lCQ9IfJJsMxj9anK9H4yzP2', {
      abr: 'test',
    });
  }
}
