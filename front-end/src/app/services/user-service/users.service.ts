import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError, catchError } from 'rxjs';
import { User } from '../auth-service/auth.service';

export interface UserData {
    items: User[];
    meta: {
      totalItems: number,
      itemCount:number ,
      itemsPerPage: number,
      totalPages: number,
      currentPage: number
  },
  links: {
    first: string,
    previous: string,
    next: string,
    last: string
 }
} 


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URL = 'http://localhost:3000/api/'

  constructor(private http: HttpClient) { }

  findAll(page: number, size: number): Observable<UserData>{
    let params = new HttpParams();
    params = params.append('page', String(page));
    params.append('size', String(size));
    return this.http.get<UserData>(this.API_URL + 'user', {params}).pipe(
      map((userData: UserData) => {
        return userData;
      }),
      catchError(err => throwError(err))
      // catchError(err => {
      //   return throwError(err);
      // }),
    )
  //   return this.http.get(this.API_URL + 'user' ,{params}).pipe(
  //  //   map((userData: UserData) => userData),
  //     map(( userData: UserData) => { return userData }),
  //     catchError(err => throwError(err))
  //   )   
  }
}
