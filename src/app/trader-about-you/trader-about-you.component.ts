import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from "../sign-up/services/user.service";
import { TraderAboutYou } from "./models/TraderAboutYou.model";
import { Router } from "@angular/router";

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

    constructor(private router: Router, private userService: UserService){}

    ngOnInit(): void {        
    }

    next(){
        this.userService.setTraderAboutYou(this.traderType, this.tradingname,
            this.registeredcompanyname, this.companyregistrationnumber,
            this.partnersnames);
        this.router.navigate(['/traderservices']);
    }

    onTraderTypeChanged(type: string){
        console.log(type);
        this.traderType = type;
        this.resetData();
    }

    resetData(){
        this.registeredcompanyname = "";
        this.companyregistrationnumber = "";
        this.partnersnames = "";
    }
}