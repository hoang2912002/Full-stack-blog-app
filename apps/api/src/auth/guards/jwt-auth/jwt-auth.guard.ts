import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
// export class JwtAuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     return true;
//   }
// }

export class JwtAuthGuard extends AuthGuard("jwt"){
  getRequest(context: ExecutionContext) {
    //jwt validation bị ràng buộc để được HTTP request object
    //nhưng graphql thì lại có HTTP request đó cho nên là 
    //cần khai báo cho nó biết
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }
}