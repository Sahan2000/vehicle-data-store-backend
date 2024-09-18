import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity()
export class Vehicle {
  @Field()
  @PrimaryGeneratedColumn()
    id: number;
    
    @Field()
    @Column()
    first_name: string;

    @Field()
    @Column()
    last_name: string;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    car_make: string;

    @Field()
    @Column()
    car_model: string

    @Field()
    @Column()
    vin: string

    @Field()
    @Column({type:'date'})
    manufactured_date: Date

    @Field()
    @Column()
    age_of_vehicle: number
}
