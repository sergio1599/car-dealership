import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid'
import { Car } from './interfaces/car.interface';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';


@Injectable()
export class CarsService {

    private cars: Car[] = [
/*         {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla',
        }, */
    ];

    findAll() {
        return this.cars;
    }

    findOneById(id: string) {
        const car = this.cars.find(car => car.id === id);

        if (!car) throw new NotFoundException(`Car with id '${id}' not found`);

        return car;
    }

    create(createCarDto: CreateCarDto) {
        const newCar = {
            id: uuid(),
            ...createCarDto
            /* brand: createCarDto.brand,
            model: createCarDto.model, */
        }
        this.cars.push(newCar);
        return newCar;
    }

    update(id: string, updateCarDto: UpdateCarDto) {

        let carDB = this.findOneById(id);

        if (updateCarDto.id && updateCarDto.id !== id)
            throw new BadRequestException(`Car with id '${id}' is not valid inside body`);


        this.cars = this.cars.map(car => {

            if (car.id === id) {
                carDB = {
                    ...carDB,
                    ...updateCarDto,
                    id,
                }
                return carDB;
            }
            return car;
        });

        return carDB;
    }

    delete(id: string) {
        this.findOneById(id);
        /* if (carDB.id !== id)
            throw new BadRequestException(`Car with id '${id}' no exist`); */

        this.cars = this.cars.filter((car) => car.id !== id);

        return {
            message: 'Car eliminated'
        }

    }

    fillCarsWithSeedData(cars: Car[]) {
        this.cars = cars;
    }

}
