import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-jobplace',
  templateUrl: './jobplace.component.html',
  styleUrls: ['./jobplace.component.css']
})
export class JobplaceComponent implements AfterViewInit {

    email = new FormControl('', [Validators.required, Validators.email]);
    hide = true;

    @Output() optionChanged = new EventEmitter<number>();
  
    ngAfterViewInit(){
        console.log("emit from photos");
      this.optionChanged.emit(-1);
    }

    getErrorMessage() {
        if (this.email.hasError('required')) {
          return 'You must enter a value';
        }
        return this.email.hasError('email') ? 'Not a valid email' : '';
      }
}
