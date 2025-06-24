import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  name:string;
  @Field()
  @IsString()
  password:string
  @Field()
  @IsEmail()
  email: string
  @IsOptional()
  @Field({nullable:true})
  bio?: string
  @IsOptional()
  @Field({nullable:true})
  avatar?: string
}
