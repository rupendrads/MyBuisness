import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plumber',
  templateUrl: './plumber.component.html',
  styleUrls: ['./plumber.component.css']
})
export class PlumberComponent implements OnInit{
  selectedTrade = 'Builder';
  selectedEmpno = 'Just Me';

  ngOnInit() {};

  constructor() {};

}
