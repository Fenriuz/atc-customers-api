import { Injectable } from '@nestjs/common';
import { MealsDao } from './meals.dao';

@Injectable()
export class MealsService {
  constructor(private mealsDao: MealsDao) {}

  findAll() {
    return this.mealsDao.findAll();
  }

  findById(id: string) {
    return this.mealsDao.findById(id);
  }
}
