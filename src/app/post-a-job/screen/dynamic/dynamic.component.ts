import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Options } from '../../models/options.model';

@Component({
    selector: 'app-dynamic',
    templateUrl: './dynamic.component.html',
    styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit{    
    @Input() options: Options[] = [];
    @Input() selectedOptionId: number = -1;
    @Output() optionChanged = new EventEmitter<number>();
    
    ngOnInit(): void {        
    }

    changeOption(){
        console.log("selected option: " + this.selectedOptionId);
        this.optionChanged.emit(this.selectedOptionId);
    }

}
