import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  
  constructor() {}

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
}
