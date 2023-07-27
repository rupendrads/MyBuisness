import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import tradepersonjobData from '../../assets/JsonFiles/TradePersonJobs.json';
import { TradepersonJob } from './models/tradepersonjob.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('myForm') form!: NgForm;

  tradepersons: TradepersonJob[] = [];
  filteredTradeperson: TradepersonJob[] | undefined = undefined;
  selectedTradeperson: TradepersonJob | undefined;
  selectedTradepersonId: number | any;
  jobs: TradepersonJob[] = [];
  filteredJob: TradepersonJob[] | undefined = undefined;
  selectedJob: TradepersonJob | undefined;
  selectedJobId: number | any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getfilteredTradepersons();
    console.log(this.filteredTradeperson);
  }

  getfilteredTradepersons() {
    this.tradepersons = tradepersonjobData;
    console.log(this.tradepersons);
    this.filteredTradeperson = this.tradepersons.filter(
      (trperson) => trperson.ParentId === null
    );
  }

  onTradepersonSelect(event: any) {
    this.selectedTradepersonId = event;
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
    this.selectedJobId = event;
    console.log(this.selectedJobId);
  }

  onSubmit() {
    console.log(this.selectedTradepersonId);
    console.log(this.selectedJobId);
    this.router.navigate(['/post-a-job', this.selectedTradepersonId, this.selectedJobId]);
  }
}
