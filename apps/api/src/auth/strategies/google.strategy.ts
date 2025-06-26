import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){
    constructor(
        private configService: ConfigService,
        private authService:AuthService,
    ){
        super({
            clientID: configService.get<string>("GOOGLE_CLIENT_ID"),
            clientSecret: configService.get<string>("GOOGLE_SECRET_CODE"),
            callbackURL: configService.get<string>("GOOGLE_CALLBACK_URL"),
            scope:["email","profile"] 
        })
    }

    async validate(accessToken:string,refreshToken:string,profile:any,done:VerifyCallback) {
        console.log({profile},profile.emails[0].value,profile.photos[0].value)
        const user = await this.authService.validateGoogleUser({
            email: profile.emails[0].value,
            name: profile.displayName,
            avatar: profile.photos[0].value,
            password:""
        })
        done(null,user)
        //request.user
        
    }
}