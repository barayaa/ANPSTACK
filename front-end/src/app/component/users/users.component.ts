import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  // dataSource!: UserData | null;
 //  data = new MatTableDataSource<UserData>();

   displayedColumns: string[] = [ 'id','name', 'username', 'email',   'role'];

   

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
        this.data =  new MatTableDataSource<User>(userData.items);
      }
    )
  }


  // initDataSource() {
  //   this.userService.findAll(1, 10).pipe(
  //     tap(users => console.log(users)),
  //     map((userData: User) => this.dataSource = userData),  
  //   ).subscribe()
  // }

}



// <!-- <mat-table style="text-align:center" mat-table [dataSource]="data" class="mat-elevation-z8">
  
//     <ng-container matColumnDef="id">
//         <th mat-header-cell *matHeaderCellDef> Id </th>
//         <td mat-cell *matCellDef="let element"> {{element.id}} </td>
//     </ng-container>
  

//     <ng-container matColumnDef="name">
//         <th mat-header-cell *matHeaderCellDef> Name </th>
//         <td mat-cell *matCellDef="let element"> {{element.name}} </td>
//     </ng-container>
 
//     <ng-container matColumnDef="username">
//         <th mat-header-cell *matHeaderCellDef> username </th>
//         <td mat-cell *matCellDef="let element"> {{element.username}} </td>
//     </ng-container>
 
//     <ng-container matColumnDef="email">
//         <th mat-header-cell *matHeaderCellDef> email </th>
//         <td mat-cell *matCellDef="let element"> {{element.email}} </td>
//     </ng-container>
//     <ng-container matColumnDef="role">
//         <th mat-header-cell *matHeaderCellDef> role </th>
//         <td mat-cell *matCellDef="let element"> {{element.role}} </td>
//     </ng-container>


//     <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
//     <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
// </mat-table> -->