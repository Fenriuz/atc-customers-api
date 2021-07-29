import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly displayName: string;

  @IsNotEmpty()
  @IsString()
  readonly uid: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @IsUrl()
  @IsNotEmpty()
  readonly photoURL: string;

  readonly password: string;
}

export class UpdateCustomerDto {
  @IsString()
  @IsOptional()
  readonly displayName: string;

  // @IsNotEmpty()
  // @IsOptional()
  // readonly uid: string;

  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly phone: string;

  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  readonly photoURL: string;

  @IsOptional()
  @IsBoolean()
  disabled?: boolean;

  readonly password: string;
}
