import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {JWT_NAME} from '../services/auth-service/auth.service'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem(JWT_NAME);
    if(token){
      const cloneReq = request.clone({
        headers: request.headers.set('Authorisation', 'Bearer ' + token)
      });
      console.log(cloneReq);
      return next.handle(cloneReq)
    }else{
      return next.handle(request);
    }
  }
}
