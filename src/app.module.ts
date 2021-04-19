import { AuthenticationModule } from './api/authentication/authentication.module';
import { ApiModule } from './api/api.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TokenStrategy } from './api/authentication/strategies/token.strategy';
import { APP_GUARD } from '@nestjs/core';
import { TokenAuthGuard } from './api/authentication/guards/token-auth.guard';
import { CustomersModule } from './api/customers/customers.module';

@Module({
  imports: [
    CustomersModule,
    AuthenticationModule,
    ApiModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TokenStrategy,
    {
      provide: APP_GUARD,
      useClass: TokenAuthGuard,
    },
  ],
})
export class AppModule {}
