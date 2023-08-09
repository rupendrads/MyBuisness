import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from './job-title.component';
import { JobPostService } from '../../services/jobPost.service';

@Component({
  selector: 'app-describe',
  templateUrl: './describe.component.html',
  styleUrls: ['./describe.component.css']
})
export class DescribeComponent implements OnInit, OnDestroy, AfterViewInit{  
  @Output() optionChanged = new EventEmitter<number>();
  jobDescriptionFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  constructor(private jobPostService: JobPostService){}

  ngOnInit(){
    if(this.jobPostService.JobPost.JobStatic?.Description){
      this.jobDescriptionFormControl.setValue(this.jobPostService.JobPost.JobStatic?.Description);
    }
  }
  
  ngAfterViewInit(){
    console.log("emit from describe");
    this.optionChanged.emit(-1);
  }

  ngOnDestroy(): void {
    console.log(this.jobDescriptionFormControl.value);
    if(this.jobDescriptionFormControl.value!== null){
      this.jobPostService.setJobDescription(this.jobDescriptionFormControl.value);
    }
  }
}
