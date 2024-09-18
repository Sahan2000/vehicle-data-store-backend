import { CreateCrudServiceInput } from './create-crud-service.input';
import { InputType, Field, Int, PartialType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType()
export class UpdateCrudServiceInput extends PartialType(CreateCrudServiceInput) {
  @Field(() => Int)
  id?: number;

  @Field({ nullable: true })
  first_name?: string;

  @Field({ nullable: true })
  last_name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  car_make?: string;

  @Field({ nullable: true })
  car_model?: string;

  @Field({ nullable: true })
  vin?: string;

  @Field({ nullable: true })
  manufactured_date?: Date;

  @Field({ nullable: true })
  age_of_vehicle?: number;
}
