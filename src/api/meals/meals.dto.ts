import { Complement } from '@ts/interfaces/complement';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateMealDto {
  @IsNotEmpty()
  @IsString()
  readonly displayName: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly restaurant: string;

  @IsNotEmpty()
  @IsString()
  readonly price: string;

  @IsNotEmpty()
  readonly complements: Complement[];
}
