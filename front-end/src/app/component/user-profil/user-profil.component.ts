import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/services/auth-service/auth.service';
import { UserData, UsersService } from 'src/app/services/user-service/users.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent implements OnInit , OnDestroy {



  userId: any;
  user: any
  private sub!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,

  ) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params =>{
      this.userId = parseInt(params['id']);
      this.userService.findOne(this.userId).subscribe(
        (user: User) => {
          this.user = user
        }
      )
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }

}
