import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit, AfterViewInit{    
    @Output() optionChanged = new EventEmitter<number>();
  
    ngOnInit(): void {        
    }

    ngAfterViewInit(): void {
      this.optionChanged.emit(-1); 
    }
}
