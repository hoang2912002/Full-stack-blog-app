import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class SignInInput {
  @Field()
  @IsEmail()
  @IsString()
  email:string

  @Field()
  @IsString()
  @MinLength(1)
  password:string
}
