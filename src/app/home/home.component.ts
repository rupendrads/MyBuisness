import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import tradepersontypeData from '../../assets/tradepersonType.json';
import jobtypeData from '../../assets/jobType.json';
import { TradepersonType } from './models/tradetype.model';
import { JobType } from './models/jobtype.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('myForm') form!: NgForm;

  tradepersontypes: TradepersonType[] = [];
  selectedTradepersonType: TradepersonType | undefined;
  selectedTradepersonTypeId: number | any;
  jobtypes: JobType[] = [];
  filteredJob: JobType[] | undefined = undefined;
  selectedJobType: JobType | undefined;
  selectedJobTypeId: number | any;


  constructor(private router: Router) {}

  ngOnInit(): void {
    this.tradepersontypes = tradepersontypeData;
    console.log(this.tradepersontypes); 
       
  }


  onTradepersonTypeSelect(event: any) {
    console.log(event);
    this.selectedTradepersonTypeId = event;
    console.log(this.selectedTradepersonTypeId);
    this.getJobtypes();
  }

  getJobtypes() {
    this.jobtypes = jobtypeData;
    console.log(this.jobtypes);
    this.filteredJob = this.jobtypes.filter(job => job.tradepersontypeId == this.selectedTradepersonTypeId);
    console.log(this.filteredJob);
  }

  onJobTypeSelect(event: any) {
    console.log(event);
    this.selectedJobTypeId = event;
    console.log(this.selectedJobTypeId);

  }

  onSubmit() { 
    this.router.navigate(['/post-a-job']);
  }

}


