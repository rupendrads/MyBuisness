import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-describe',
  templateUrl: './describe.component.html',
  styleUrls: ['./describe.component.css']
})
export class DescribeComponent implements AfterViewInit{
  @Output() optionChanged = new EventEmitter<number>();
  
  ngAfterViewInit(){
    this.optionChanged.emit(-1);
  }
}
