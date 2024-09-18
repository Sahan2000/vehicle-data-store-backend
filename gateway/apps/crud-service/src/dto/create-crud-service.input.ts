import { InputType, Int, Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
@InputType()
export class CreateCrudServiceInput {
    @Field()
    id: number;
    @Field()
    first_name: string;

    @Field()
    last_name: string;

    @Field()
    email: string

    @Field()
    car_make: string;

    @Field()
    car_model: string

    @Field()
    vin: string

    @Field(() => GraphQLISODateTime)
    manufactured_date: Date
}
