import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Vehicle } from "../entities/crud-service.entity";

@ObjectType()
export class PaginatedMembers {
    @Field(() => [Vehicle])
    members: Vehicle[]; // List of members for the current page
  
    @Field(() => Int)
    totalCount: number; // Total number of members in the database
}