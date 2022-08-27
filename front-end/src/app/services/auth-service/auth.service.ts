import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";


export interface User {
  id: number
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  role?: string;
  profileImage?: string
 // passwordconfirm?: boolean;
}

export interface LoginForm{
  email:string;
  password:string;
}

export const JWT_NAME = 'blog_token'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = 'http://localhost:3000/api/'

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }


  login(loginForm: LoginForm){
   return this.http.post<any>(this.API_URL + 'user/login', { email: loginForm.email, password: loginForm.password}).pipe(
      map((token) =>{
        localStorage.setItem(JWT_NAME, token.acces_token);
        return token
      })
    )
  }

  register(user: User){
      return this.http.post<any>(this.API_URL + 'user/', user).pipe(
        map(user => user)
      )
  }


  isAuthenticated(){
    const token:any = localStorage.getItem(JWT_NAME)
    return !this.jwtHelper.isTokenExpired(token);
  }

 

  getUserId():Observable<number>{
    return of(localStorage.getItem(JWT_NAME)).pipe(
      switchMap((jwt: any) => of(this.jwtHelper.decodeToken(jwt)).pipe(
        tap((jwt:any) => console.log(jwt)),
         map((jwt:any) => jwt.id)
        )
      )
      )
  }
}
