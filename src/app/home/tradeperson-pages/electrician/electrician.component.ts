import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-electrician',
  templateUrl: './electrician.component.html',
  styleUrls: ['./electrician.component.css']
})
export class ElectricianComponent implements OnInit{
  selectedTrade = 'Builder';
  selectedJob = 'Just Me';

  ngOnInit() {};

  constructor() {};

}
