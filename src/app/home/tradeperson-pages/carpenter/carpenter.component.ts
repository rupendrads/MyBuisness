import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carpenter',
  templateUrl: './carpenter.component.html',
  styleUrls: ['./carpenter.component.css']
})
export class CarpenterComponent implements OnInit{
  selectedTrade = 'Builder';
  selectedJob = 'Just Me';

  ngOnInit() {};

  constructor() {};

}