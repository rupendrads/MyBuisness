import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import tradepersonjobData from '../../../../assets/JsonFiles/TradePersonJobs.json';
import { TradepersonJob } from '../../models/tradepersonjob.model';

@Component({
  selector: 'app-find-tradeperson',
  templateUrl: './find-tradeperson.component.html',
  styleUrls: ['./find-tradeperson.component.css']
})
export class FindTradePersonComponent implements OnInit{
  @ViewChild('myForm') form!: NgForm;
  
  tradepersons: TradepersonJob[] = [];
  filteredTradeperson: TradepersonJob[] | undefined = undefined;
  selectedTradeperson: TradepersonJob | undefined;
  selectedTradepersonId: number | any;
  jobs: TradepersonJob[] = [];
  filteredJob: TradepersonJob[] | undefined = undefined;
  selectedJob: TradepersonJob | undefined;
  selectedJobId: number | any;
  startQuestionId: number | undefined;

  constructor(private router: Router) {};

  ngOnInit() {
    this.getfilteredTradepersons();
  };

  getfilteredTradepersons() {
    this.tradepersons = tradepersonjobData;
    console.log(this.tradepersons);
    this.filteredTradeperson = this.tradepersons.filter(
      (trperson) => trperson.ParentId === null
    );
  }

  onTradepersonSelect(event: any) {
    this.selectedTradepersonId = event.value;
    console.log(this.selectedTradepersonId);
    this.getfilteredJobs();
  }

  getfilteredJobs() {
    const data = tradepersonjobData;
    console.log(this.selectedTradepersonId);
    console.log(data);    
    this.filteredJob = data.filter(tp => tp.ParentId == this.selectedTradepersonId);
    console.log(this.filteredJob);
  }

  onJobSelect(event: any) {
    console.log(event);
    this.selectedJobId = event.value;
    console.log(this.selectedJobId);

    const selectedJob = tradepersonjobData.find(tp => tp.Id == this.selectedJobId);
    if(selectedJob){
      if(selectedJob.StartQuestionId){
        this.startQuestionId = selectedJob.StartQuestionId;
        console.log(this.startQuestionId);
      }
    }
  }

  onSubmit() {
    console.log(this.selectedTradepersonId);
    console.log(this.selectedJobId);
    this.router.navigate(['/post-a-job', this.selectedTradepersonId, this.selectedJobId, this.startQuestionId]);
  }

}
