import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-jobplace',
  templateUrl: './jobplace.component.html',
  styleUrls: ['./jobplace.component.css']
})
export class JobplaceComponent implements AfterViewInit {
    @Output() optionChanged = new EventEmitter<number>();
  
    ngAfterViewInit(){
        console.log("emit from jobplace");
      this.optionChanged.emit(-1);
    }
}
