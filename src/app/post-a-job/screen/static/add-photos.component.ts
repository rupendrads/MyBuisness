import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-photos',
  templateUrl: './add-photos.component.html',
  styleUrls: ['./add-photos.component.css']
})
export class AddPhotosComponent implements AfterViewInit {
    @Output() optionChanged = new EventEmitter<number>();
    files: File[] = [];
    fileUrls: any = [];
  
    ngAfterViewInit(){
        console.log("emit from photos");
      this.optionChanged.emit(-1);
    }

    onFileSelection(file: any){
      console.log(file);
      var reader = new FileReader();	  
			reader.readAsDataURL(file);	  
			reader.onload = (event) => { 
			  const url = event.target?.result;
        this.fileUrls.push(url);
        console.log(this.fileUrls);
			}
    }
}
