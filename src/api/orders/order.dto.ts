import { LocationCustomer } from '@ts/interfaces/customers';
import { MealsOrder } from '@ts/interfaces/meals';
import { IsArray, IsMongoId, IsNotEmpty, IsObject } from 'class-validator';

export class CreateOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly restaurant: string;

  @IsArray()
  @IsNotEmpty()
  readonly meals: MealsOrder[];

  @IsObject()
  @IsNotEmpty()
  readonly location: LocationCustomer;
}
