import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLikeInput } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private readonly prismaService: PrismaService){}
  async likePost({ postId, userId }: { postId: number; userId: number }) {
    try {
      return !!(await this.prismaService.like.create({
        data: {
          userId,
          postId,
        },
      }));
    } catch (err) {
      throw new BadRequestException('You have already liked this post');
    }
  }
  async unLikePost(userId:number,postId:number) {
    try {
      //do set unique nên prisma sẽ tạo 1 index để check 
      //cần phải set key theo thứ tự
      const data = await this.prismaService.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
      return !!data
    } catch (error) {
      console.log(error)
      throw new BadRequestException("Like not found")
    }
  }

  async getPostLikesCount(postId: number) {
    return await this.prismaService.like.count({
      where: {
        postId,
      },
    });
  }


   async userLikedPost({ postId, userId }: { postId: number; userId: number }) {
    const like = await this.prismaService.like.findFirst({
      where: {
        postId,
        userId,
      },
    });
    return !!like;
  }
  
}
