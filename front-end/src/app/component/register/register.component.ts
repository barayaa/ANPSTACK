import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';




class CustomValidators {
  static passwordContainsNumber(control: AbstractControl){
    const regex = /\d/
    if(regex.test(control.value) && control.value !== null) {
      return null as any;
    }
    else if(control.value){
      return {passwordInvalid: true};
    }
  }

  static passwordMatch(control: AbstractControl){
    const password = control.get('password');
    const passwordConfirm = control.get('passwordconfirm')

    if((password === passwordConfirm) && (password !== null && passwordConfirm !== null)){
      return null 
    }
    else{
      return {passwordsNotMatching: true}
    }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup | any;
  constructor(
    private auth: AuthService,
    private router: Router,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [null , [Validators.required]],
      username: [null , [Validators.required]],
      email: [null , [Validators.required, Validators.email, Validators.minLength(6)]],
      password: [null , 
        [Validators.required , 
          Validators.minLength(4),
          CustomValidators.passwordContainsNumber
        ]],
        passwordconfirm: [null , [Validators.required]]
    },
    {
      //validators: CustomValidators.passwordMatch
    }
    )
  }

  onSubmit() {
    if(!this.registerForm.valid){
      return;
    }
    console.log(this.registerForm.value);
    this.auth.register(this.registerForm.value).pipe(
      map(user => this.router.navigate(['login']))
    ).subscribe()
    
  }

}
