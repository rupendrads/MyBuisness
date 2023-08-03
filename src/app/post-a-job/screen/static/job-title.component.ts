import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.css']
})
export class JobtitleComponent implements OnInit, AfterViewInit{    
    @Output() optionChanged = new EventEmitter<number>();
  
    ngOnInit(): void {        
    }

    ngAfterViewInit(): void {
      this.optionChanged.emit(-1); 
    }
}
