import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FileUploadService } from '../../services/fileUpload.service';

@Component({
  selector: 'app-add-photos',
  templateUrl: './add-photos.component.html',
  styleUrls: ['./add-photos.component.css']
})
export class AddPhotosComponent implements OnInit, AfterViewInit, OnDestroy {
    @Output() optionChanged = new EventEmitter<number>();
    files: File[] = [];
    fileUrls: any = [];

    constructor(private fileUploadService: FileUploadService){      
    }

    ngOnInit(){
      this.fileUrls =[...this.fileUploadService.fileUrls];
    }
  
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

    ngOnDestroy(){
      this.fileUploadService.setFileUrls(this.fileUrls);
    }
}
