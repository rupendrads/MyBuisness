import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-photos',
  templateUrl: './add-photos.component.html',
  styleUrls: ['./add-photos.component.css']
})
export class AddPhotosComponent implements AfterViewInit {
    @Output() optionChanged = new EventEmitter<number>();
  
    ngAfterViewInit(){
        console.log("emit from photos");
      this.optionChanged.emit(-1);
    }
}
