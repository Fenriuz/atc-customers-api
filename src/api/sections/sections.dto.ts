import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSectionDto {
  @IsString()
  @IsNotEmpty()
  readonly displayName: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsOptional()
  @IsArray()
  readonly meals?: string[];
}
