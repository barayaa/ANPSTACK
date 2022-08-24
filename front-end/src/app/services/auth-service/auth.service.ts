import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';


export interface User {
  items: User[] | undefined;
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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = 'http://localhost:3000/api/'

  constructor(
    private http: HttpClient
  ) { }


  login(loginForm: LoginForm){
   return this.http.post<any>(this.API_URL + 'user/login', { email: loginForm.email, password: loginForm.password}).pipe(
      map((token) =>{
        localStorage.setItem('blog_token', token.acces_token);
        return token
      })
    )
  }

  register(user: any){
      return this.http.post<any>(this.API_URL + 'user/', user).pipe(
        map(user => user)
      )
  }
}
