import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { UsersComponent } from './component/users/users.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { UserProfilComponent } from './component/user-profil/user-profil.component';
import { UpdateUserProfileComponent } from './component/update-user-profile/update-user-profile.component'
import { JwtHelperService ,JWT_OPTIONS } from "@auth0/angular-jwt";
import { JwtInterceptor } from './interceptors/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UsersComponent,
    UserProfilComponent,
    UpdateUserProfileComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,

  ],
  providers: [JwtHelperService, 
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    { provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
