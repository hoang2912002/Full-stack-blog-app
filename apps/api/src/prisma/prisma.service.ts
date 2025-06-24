import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable() // đánh dấu class PrismaService là 1 service
export class PrismaService extends PrismaClient implements OnModuleInit {
    //OnModuleInit là lifecycle của react hook
    //khi module đc khởi tạo thì method onModuleInit() sẽ chạy
    async onModuleInit() {
        //Khi nestjs load module sẽ chạy vào đây và 
        //kết nối với Prisma với db ngay khi service đc chạy bằng câu lệnh connect
        await this.$connect()
    }
}
