import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './models/User.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required])  
  });

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}

  getErrorMessage() {
    // if (this.email.hasError('required')) {
    //   return 'You must enter a value';
    // }
    // return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  startRegistration(){
    if(this.userForm.valid && this.userForm.value.firstName
      && this.userForm.value.lastName 
      && this.userForm.value.email
      && this.userForm.value.mobile){      
      this.userService.setUser(new User(-1, this.userForm.value.firstName, this.userForm.value.lastName, 
                              this.userForm.value.email, this.userForm.value.mobile));      
    }
    this.router.navigate(['/traderservices']);
  }
}
