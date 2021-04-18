import { Controller, Get, Param } from '@nestjs/common';
import { controllerRoutes } from '@shared/constants/controller-routes.constants';
import { AuthenticationService } from './authentication.service';
import { Public } from './decorators/public.decorator';

@Controller(controllerRoutes.authentication)
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Public()
  @Get('checkPhone/:phone')
  findByPhone(@Param('phone') phone: string) {
    return this.authenticationService.findByPhone(phone);
  }
}
