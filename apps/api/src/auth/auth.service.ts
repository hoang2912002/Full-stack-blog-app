import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInInput } from './dto/signin.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}
    async validateLocalUser(signInInput:SignInInput){
        const {email,password} = signInInput
        const user = await this.prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!user) throw new UnauthorizedException("User Not Found")
        const checkPassword = await verify(user.password, password)
        if(!checkPassword) throw new UnauthorizedException("Invalid Credentials")
        return user

    }
    
}
