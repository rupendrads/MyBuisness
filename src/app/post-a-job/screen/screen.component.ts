import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Options } from '../models/options.model';

@Component({
    selector: 'app-screen',
    templateUrl: './screen.component.html',
    styleUrls: ['./screen.component.css']
  })
  export class ScreenComponent implements OnInit{
    @Input() questionTitle = '';
    @Input() options: Options[] = [];
    selectedOptionId: number = -1;
    @Output() optionChanged = new EventEmitter<number>();
    
    ngOnInit(): void {    
    }

    changeOption(event: any){
        console.log("selected option: " + this.selectedOptionId);
        this.optionChanged.emit(this.selectedOptionId);
    }    
  }