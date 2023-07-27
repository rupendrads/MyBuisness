import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Questions } from '../models/questions.model';
import { Options } from '../models/options.model';
import { QuestionOptions } from '../models/questionoptions.model';


@Injectable({
  	providedIn: 'root',
})
export class QuestionsService implements OnInit {

    options: Options[] = [];
    selectedOption: Options | undefined = undefined;
    questions: Questions[] = [];
    filteredQuestion: Questions[] | undefined = undefined;
    private questionsUrl = '../../assets/JsonFiles/Questions.json';

  	constructor(private http: HttpClient) {}

  	ngOnInit(): void {}

 	getQuestion() {
        return this.http.get<any>(this.questionsUrl);     
    }
}
