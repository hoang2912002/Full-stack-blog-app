import { Optional } from '@nestjs/common';
import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';
import { Tag } from 'src/tag/entities/tag.entity';

@InputType()
export class CreatePostInput {
  @Field()
  @IsString()
  title: string;
  @Field()
  @IsString()
  content:string;
  @Field({nullable:true})
  @Optional()
  @IsString()
  thumbnail:string;

  @Field(()=>[String])
  @IsString({each:true})
  //tức là mỗi data của tag bắt buộc phải là string
  tags: string[]

  @Field(()=>Boolean)
  @IsBoolean()
  published: boolean
}
