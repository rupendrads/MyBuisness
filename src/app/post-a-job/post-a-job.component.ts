import { Component, OnInit } from '@angular/core';
import { Options } from './models/options.model';
import { ActivatedRoute } from '@angular/router';
import { QuestionOptionsService } from './services/questionOptions.service';
import { QuestionsService } from './services/questions.service';
import { OptionsService } from './services/options.service';
import { QuestionOption } from './models/questionoption.model';
import { JobPostService } from './services/jobPost.service';
import { JobPostQuestionOption } from './models/jobPostQuestionOption.model';

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
  questionOptions: QuestionOption[]=[]; 
  selectedOptionId: number = -1;
  
  questionIds: number[]=[];
  selectedOptionIds: number[]=[];

  screenType="dynamic";

  constructor(private route: ActivatedRoute, 
    private questionOptionsService: QuestionOptionsService,
    private questionsService: QuestionsService,
    private optionsService: OptionsService,
    private jobPostService: JobPostService) {}

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

        this.jobPostService.setJobPostUser(100);
  }

  optionChanged(event: any){
    console.log(event);
    const optionId = event;
    if(optionId){
      this.selectedOptionId = optionId; 
      console.log("In option changed");
      this.SetQuestionIds();
      console.log(this.questionIds);
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
      this.setQuestionIndex(); 
      console.log(this.questionIds);
      console.log(this.questionIndex);
    }
  }

  setQuestionIndex(){
    const questionIdIndex = this.getQuestionIndex();
    if(questionIdIndex == -1){
      this.questionIndex = this.questionIds.length -1;
    } else {
      this.questionIndex =questionIdIndex;
    }
  }

  getQuestionIndex(){
    return this.questionIds.findIndex(element => element ==this.questionId);
  }

  setSelectedOptionIds(optionId: number){
    const questionIdIndex = this.getQuestionIndex();
    console.log(questionIdIndex);
    if(questionIdIndex > -1){
      this.selectedOptionIds[questionIdIndex] = optionId;
    }
    console.log(this.selectedOptionIds);
  }

  setScreenType(){
    if(this.questionId == 4){
      this.screenType = "jobtitle";
    } else if (this.questionId == 5){
      this.screenType = "describe";
    } else if (this.questionId == 6){
      this.screenType = "addphotos";
    } else if (this.questionId == 6){
      this.screenType = "budget";
    } else {
      this.screenType = "dynamic";
    }
  }

  updateJobPost(selectedQuestionOption: QuestionOption){
    this.jobPostService.updateQuestionOption(new JobPostQuestionOption(-1, -1, selectedQuestionOption.Id, selectedQuestionOption));
  }

  goToNextQuestion() {
    if(this.selectedOptionId){      
      const selectedQuestionOption = this.questionOptions.find(qo => qo.TradePersonJobId == this.selectedJobId && qo.OptionId == this.selectedOptionId && qo.QuestionId == this.questionId);

      console.log(selectedQuestionOption);
      if(selectedQuestionOption){
        console.log(selectedQuestionOption);
        if(selectedQuestionOption.OptionId !== -1){
          this.updateJobPost(selectedQuestionOption);
        }
        if(selectedQuestionOption.NextQuestionId){          
          this.questionId = selectedQuestionOption.NextQuestionId;
          if(this.questionId){
            this.setQuestionTitle(this.questionId);
            this.setQuestionOptions(this.questionId);

            this.setScreenType();            
            console.log(this.screenType);
            this.setQuestionIndex();
            this.selectedOptionId = this.getPrevNextSelectedOptionId(this.questionId);            
          }
        }
      }
    }
    console.log(this.jobPostService.JobPost);
  }

  getPreviousQuestionId(questionId: number){
    let previousQuestionId = -1;
    console.log(this.questionIds);
    const questionIdIndex = this.getQuestionIndex();
    if(questionIdIndex > 0){
      previousQuestionId = this.questionIds[questionIdIndex -1];
    }
    return previousQuestionId;
  }

  goToPreviousQuestion() {
    console.log(this.questionId);
    if(this.questionId){
      const previousQuestionId = this.getPreviousQuestionId(this.questionId);
      this.selectedOptionId = this.getPrevNextSelectedOptionId(previousQuestionId);
      console.log(previousQuestionId);
      if(previousQuestionId !== -1){
        this.questionId = previousQuestionId;
        if(this.questionId){
          this.setQuestionTitle(this.questionId);
          this.setQuestionOptions(this.questionId);
          this.setScreenType();
          this.setQuestionIndex();           
          console.log(this.selectedOptionId);         
        }
      }
    }
    console.log(this.jobPostService.JobPost);
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
