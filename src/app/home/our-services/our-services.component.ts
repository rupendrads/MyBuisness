import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TradepersonJob } from '../models/tradepersonjob.model';
import  tradepersonjobData from '../../../assets/JsonFiles/TradePersonJobs.json';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css']
})
export class OurServicesComponent implements OnInit {  
  tradepersons: TradepersonJob[] = [];
  filteredTradeperson: TradepersonJob[] | undefined = undefined;
  selectedTradepersonId: number | any;

  constructor(private router: Router) {} 

    ngOnInit() {
        this.getfilteredTradepersons();
    }

  getfilteredTradepersons() {
    this.tradepersons = tradepersonjobData;
    this.filteredTradeperson = this.tradepersons.filter(
      (trperson) => trperson.ParentId === null
    );
  }

  onClick() {
     this.router.navigate(['/plumber']);
     
  }
}
