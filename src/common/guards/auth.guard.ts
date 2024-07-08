import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if(!token){
      throw new UnauthorizedException('token is empty')
    }

    try {
      const payload = this.jwtService.verify(token)
      request.id = payload.id //
    } catch (err) {
    //   Logger.error(err.message);
      throw new UnauthorizedException('invalid token')
      
    }
    return true;
  }

  private extractTokenFromHeader(request:Request): string | undefined{
    return request.headers.authorization?.split(' ')[1];
  }
}
