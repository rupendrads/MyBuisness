import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popular-jobs',
  templateUrl: './popular-jobs.component.html',
  styleUrls: ['./popular-jobs.component.css']
})
export class PopularJobsComponent {

  selectedTradepersonId: number | any;
  selectedJobId: number | any;
  startQuestionId: number | undefined;


  constructor(private router: Router) {} 

  onCardClick() {
    this.router.navigate(['/post-a-job', 2, 4, 1]);
  }
}
