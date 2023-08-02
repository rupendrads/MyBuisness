import { Component, OnInit } from '@angular/core';
import { Options } from './models/options.model';
import { ActivatedRoute } from '@angular/router';
import { QuestionOptionsService } from './services/questionOptions.service';
import { QuestionsService } from './services/questions.service';
import { OptionsService } from './services/options.service';
import { QuestionOptions } from './models/questionoptions.model';

@Component({
  selector: 'app-job',
  templateUrl: './post-a-job.component.html',
  styleUrls: ['./post-a-job.component.css']
})
export class PostJobComponent implements OnInit{
  selectedTradepersonId: number| undefined;
  selectedJobId: number | undefined;
  questionIndex: number = 0;  
  questionId: number | undefined;
  questionTitle: string = "";
  options: Options[] = []; 
  questionOptions: QuestionOptions[]=[]; 
  selectedOptionId: number = -1;

  questionIds: number[]=[];
  selectedOptionIds: number[]=[];

  constructor(private route: ActivatedRoute, 
    private questionOptionsService: QuestionOptionsService,
    private questionsService: QuestionsService,
    private optionsService: OptionsService) {}

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

        const startQuestionId = this.route.snapshot.paramMap.get('startQuestionId');
        if(startQuestionId !== null){
            this.questionId = +startQuestionId;
            console.log(this.questionId);
        }

        this.questionOptionsService.questionOptions.subscribe(data => {
          console.log(data);
          this.questionOptions = data;
          console.log(this.questionId);
          if(this.questionId){
            this.SetQuestionIds();
            this.setQuestionTitle(this.questionId);
            this.setQuestionOptions(this.questionId);
          }
        });

        if(this.selectedTradepersonId)
        {
          this.questionOptionsService.setQuestionOptions(this.selectedTradepersonId);
        }
  }

  optionChanged(event: any){
    console.log(event);
    const optionId = event;
    if(optionId){
      this.selectedOptionId = optionId;                  
      this.SetQuestionIds();
      this.setSelectedOptionIds(optionId);
      console.log(this.questionIds);
      console.log(this.selectedOptionIds);      
    }
  }

  SetQuestionIds(){
    console.log(this.questionId);
    if(this.questionId){      
      const questionIdIndex = this.questionIds.findIndex(element => element ==this.questionId);
      console.log(this.questionIds);
      console.log(questionIdIndex);
      if(questionIdIndex == -1){
        this.questionIds.push(this.questionId);
      }
    }
  }

  setSelectedOptionIds(optionId: number){
    const questionIdIndex = this.questionIds.findIndex(element => element ==this.questionId);
    console.log(questionIdIndex);
    if(questionIdIndex > -1){
      this.selectedOptionIds[questionIdIndex] = optionId;
    }
    console.log(this.selectedOptionIds);
  }

  goToNextQuestion() {
    if(this.selectedOptionId){      
      const selectedQuestionOption = this.questionOptions.find(qo => qo.TradePersonJobId == this.selectedJobId && qo.OptionId == this.selectedOptionId);
      console.log(selectedQuestionOption);
      if(selectedQuestionOption){
        console.log(selectedQuestionOption);
        if(selectedQuestionOption.NextQuestionId){          
          this.questionId = selectedQuestionOption.NextQuestionId;
          if(this.questionId){
            this.setQuestionTitle(this.questionId);
            this.setQuestionOptions(this.questionId);
            this.selectedOptionId = this.getPrevNextSelectedOptionId(this.questionId);
          }
        }
      }
    }
  }

  goToPreviousQuestion() {
    if(this.questionId){
      const previousQuestionId = this.getPreviousQuestionId(this.questionId);
      this.selectedOptionId = this.getPrevNextSelectedOptionId(previousQuestionId);
      if(previousQuestionId !== -1){
        this.questionId = previousQuestionId;
        if(this.questionId){
          this.setQuestionTitle(this.questionId);
          this.setQuestionOptions(this.questionId);           
          console.log(this.selectedOptionId);         
        }
      }
    }
  }

  setQuestionTitle(questionId: number){
    const question = this.questionsService.getQuestionTitle(questionId);
    if(question){
      this.questionTitle = question;
      this.questionTitle;
    }            
  }

  setQuestionOptions(questionId: number){
    const questionOptions = this.questionOptionsService.getQuestionOptions(questionId);
    console.log(questionOptions);
    this.options = [];
    questionOptions.forEach(qo => {
      const option = this.optionsService.getOption(qo.OptionId);
      if(option){
        this.options.push(option);
      }              
    });
  }

  getPreviousQuestionId(questionId: number){
    let previousQuestionId = -1;
    const questionIdIndex = this.questionIds.findIndex(element => element ==questionId);
    if(questionIdIndex > 0){
      previousQuestionId = this.questionIds[questionIdIndex -1];
    }
    return previousQuestionId;
  }

  getPrevNextSelectedOptionId(questionId: number){
    let prevNextSelectedOptionId = -1;
    const questionIdIndex = this.questionIds.findIndex(element => element ==questionId);
    console.log(questionIdIndex);
    if(questionIdIndex > -1){
      console.log(this.selectedOptionIds);
      prevNextSelectedOptionId = this.selectedOptionIds[questionIdIndex];
    }
    return prevNextSelectedOptionId;
  }

  closeQuiz() {
  }
}
