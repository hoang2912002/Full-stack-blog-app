import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/signin.input';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { AuthPayloadEntities } from './entities/auth-payload.entities';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Mutation(()=>AuthPayloadEntities)
  async signIn(@Args('signInInput') signInInput: SignInInput) {
    const user = await this.authService.validateLocalUser(signInInput) as any;
    return await this.authService.login(user);
  }
}
