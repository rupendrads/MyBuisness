import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import tradepersontypeData from '../../assets/tradepersonType.json';
import { TradepersonType } from './models/tradetype.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('myForm') form!: NgForm;

  tradepersontypes: TradepersonType[] = [];

  constructor() {}

  ngOnInit(): void {
    this.tradepersontypes = tradepersontypeData;
    console.log(this.tradepersontypes);
  }



  selectedTradepersonType: TradepersonType[] | undefined = undefined;
  selectedJob: string | undefined = undefined;

  onTradepersonTypeChange(event: any) {
    this.selectedJob = '';
  }
}
