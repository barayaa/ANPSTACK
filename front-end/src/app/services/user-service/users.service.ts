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


  findOne(id: number): Observable<any> {
    return this.http.get(this.API_URL + 'user/' + id).pipe(
      map((user: any) => user)
    )
  }

  findAll(page: number, size: number): Observable<UserData>{
    let params = new HttpParams();
    params = params.append('page', String(page));
    params.append('size', String(size));
    return this.http.get<UserData>(this.API_URL + 'user', {params}).pipe(
      map((userData: UserData) => {
        return userData;
      }),
      catchError(err => throwError(err))
    )}

    paginateByUserName(page: number, size: number, username: string): Observable<UserData> {
      let params = new HttpParams()
      params = params.append('page', String(page));
      params = params.append('size', String(size));
      params = params.append('username', username)

      return this.http.get<UserData>(this.API_URL + 'user', {params}).pipe(
        map((userData: UserData) =>{
          return userData;
        }),
        catchError(err => throwError(err))
      )
    }
}



