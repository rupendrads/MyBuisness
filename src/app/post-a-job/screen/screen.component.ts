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
    @Input() selectedOptionId: number = -1;
    @Input() screenType= '';
    @Output() optionChanged = new EventEmitter<number>();
    
    ngOnInit(): void {    
    }

    changeOption(event: any){
        this.selectedOptionId = event;
        this.optionChanged.emit(this.selectedOptionId);
    }    
  }