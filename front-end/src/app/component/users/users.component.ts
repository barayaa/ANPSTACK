import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import {MatTableDataSource} from '@angular/material/table';
import { map, tap } from 'rxjs';
import { User } from 'src/app/services/auth-service/auth.service';
import {  UserData, UsersService } from 'src/app/services/user-service/users.service';




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  data: any 
  data1: any 
  pageEvent = PageEvent ;
  // dataSource!: UserData | null;
 //  data = new MatTableDataSource<UserData>();

   displayedColumns: string[] = [ 'id','name', 'username', 'email',   'role'];

   @ViewChild(MatPaginator)
  paginator!: MatPaginator;
   @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(
    private http: HttpClient,
    private userService: UsersService
  ) { }


 
  ngOnInit(): void {
    this.initDataSource();
  }


  initDataSource(){
    this.userService.findAll(1, 10).subscribe(
      (userData: UserData) => {
        //this.data =  new MatTableDataSource<User>(userData.items);
        this.data = userData;
        console.log('data', this.data)
      }
    )
  }


  onPaginateChange(event: PageEvent){
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page +1

    this.userService.findAll(page, size).subscribe(
      (userData: UserData) => {
          this.data =  userData;
        console.log('data1', this.data)
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;
      }
    )
  }


  // ngAfterViewInit() {
  //   this.data.paginator = this.paginator;
  //   this.data.sort = this.sort;
   
  // }


  // initDataSource() {
  //   this.userService.findAll(1, 10).pipe(
  //     tap(users => console.log(users)),
  //     map((userData: User) => this.dataSource = userData),  
  //   ).subscribe()
  // }

}


// <mat-paginator [length]="data.meta.totalItems" 
// [pageSize]="data.meta.itemsPerpage" 
// [pageSizeOptions]="[5,10, 15,20]" 
// (page)="onPaginateChange($event)">
// showFirstLastButtons>
// </mat-paginator>
