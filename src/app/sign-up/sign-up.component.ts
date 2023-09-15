import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  selectedTrade = 'Builder';
  selectedEmpno = 'Just Me';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  login() {
    // Add your login logic here
    console.log('Logging in...');
  }

  startRegistration(){
    this.router.navigate(['/traderservices']);
  }
}
