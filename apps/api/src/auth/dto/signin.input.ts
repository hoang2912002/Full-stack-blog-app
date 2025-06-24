import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class SignInInput {
  @Field()
  @IsEmail()
  @IsString()
  email:string

  @Field()
  @IsString()
  password:string
}
