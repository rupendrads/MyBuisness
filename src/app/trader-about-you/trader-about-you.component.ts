import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from "../sign-up/services/user.service";

@Component({
    selector: 'app-trader-about-you',
    templateUrl: './trader-about-you.component.html',
    styleUrls: ['./trader-about-you.component.css']
})
export class TraderAboutYouComponent implements OnInit {
    traderType:string = 'Sole Trader';
    traderTypes:string[] = ['Sole Trader', 'Limited Company',
                             'Ordinary Partnership', 'Limited Partnership'];

    tradingname: string = '';
    registeredcompanyname: string = '';
    companyregistrationnumber: string = '';
    partnersnames: string = '';

    ngOnInit(): void {        
    }

    next(){
        
    }

    onTraderTypeChanged(type: string){
        console.log(type);
        this.traderType = type;
    }
}