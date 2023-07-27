import { Component, OnInit } from '@angular/core';
import { Questions } from './models/questions.model';
import { Options } from './models/options.model';
import { QuestionOptions } from './models/questionoptions.model';
// import { QuestionsService } from './services/questions.service'; 
// import { OptionsService } from './services/options.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job',
  templateUrl: './post-a-job.component.html',
  styleUrls: ['./post-a-job.component.css']
})
export class PostJobComponent implements OnInit{
  selectedTradepersonId: number| undefined;
  selectedJobId: number | undefined;
  currentQuestionIndex: number = 0;
  questions: Questions[] = [];
  filteredQuestion: Questions[] | undefined = undefined; 
  options: Options[] = [];
  selectedOption: Options | undefined = undefined;

  //private questionsService: QuestionsService
  //private optionsService: OptionsService
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {    
        const tpId = this.route.snapshot.paramMap.get('selectedTradepersonId');
        if(tpId !== null){
            this.selectedTradepersonId = +tpId;
            console.log(this.selectedTradepersonId);
        }

        const jobId = this.route.snapshot.paramMap.get('selectedJobId');
        if(jobId !== null){
            this.selectedJobId = +jobId;
            console.log(this.selectedJobId);
        }

    // this.questionsService.getQuestion().subscribe(data => {
    //   this.questions = data.questions;
    // });

    // this.optionsService.getOptions().subscribe(data => {
    //     this.options = data.options;
    //   });
  }

  goToNextQuestion() {
    
  }

  goToPreviousQuestion() {
    
  }

  closeQuiz() {
  }
}
