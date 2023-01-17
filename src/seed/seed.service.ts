import { CARS_SEED } from './data/cars.seed';
import { Injectable } from '@nestjs/common';
import { BRANDS_SEED } from './data/brands.seed';

@Injectable()
export class SeedService {


  populateDB() {

    CARS_SEED
    BRANDS_SEED

    return 'SEED executed succesfully'
  }
}
