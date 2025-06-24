import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";
@ObjectType()
export class AuthPayloadEntities {
    @Field(()=>Int)
    id: number;
    @Field()
    name:string;
    @Field()
    @IsString()
    email:string;
    @Field()
    password:string;
    @Field({nullable:true})
    avatar?:string;
    @Field()
    accessToken:string
}