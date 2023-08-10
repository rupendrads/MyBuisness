import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MyErrorStateMatcher } from './job-title.component';
import { JobPostService } from '../../services/jobPost.service';

@Component({
  selector: 'app-jobplace',
  templateUrl: './jobplace.component.html',
  styleUrls: ['./jobplace.component.css']
})
export class JobplaceComponent implements OnInit, AfterViewInit, OnDestroy {
    @Output() optionChanged = new EventEmitter<number>();
    jobPlaceFormControl = new FormControl('', [Validators.required]);
    matcher = new MyErrorStateMatcher();

    constructor(private jobPostService: JobPostService){}

    ngOnInit(): void {        
      if(this.jobPostService.JobPost.JobStatic?.PostCode){
        this.jobPlaceFormControl.setValue(this.jobPostService.JobPost.JobStatic?.PostCode);
      }
    }
  
    ngAfterViewInit(){
        console.log("emit from jobplace");
      this.optionChanged.emit(-1);
    }

    ngOnDestroy(): void {
      console.log(this.jobPlaceFormControl.value);
      if(this.jobPlaceFormControl.value!== null){
        this.jobPostService.setJobPostCode(this.jobPlaceFormControl.value);
      }
    } 
}
