import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import tradepersonjobData from '../../assets/JsonFiles/TradePersonJobs.json';
import { TradepersonJob } from '../home/models/tradepersonjob.model';
import { UserService } from "../sign-up/services/user.service";
import { TraderService } from "./models/TraderService.model";

@Component({
    selector: 'app-trader-services',
    templateUrl: './trader-services.component.html',
    styleUrls: ['./trader-services.component.css']
})
export class TraderServicesComponent implements OnInit {
    selectedService:any;
    selectedServices:TradepersonJob[] = [];

    tradepersons: TradepersonJob[] = [];
    filteredTradeperson: TradepersonJob[] | undefined = undefined;

    constructor(private router: Router, private userService: UserService){}
    
    ngOnInit(): void {    
        this.getfilteredTradepersons();
    }

    getfilteredTradepersons() {
        this.tradepersons = tradepersonjobData;
        this.filteredTradeperson = this.tradepersons.filter(
            (trperson) => trperson.ParentId === null
        );
    }

    addService(){
        if(this.selectedService!== undefined && !this.selectedServices.includes(this.selectedService)){
            this.selectedServices.push(this.selectedService);
        }
        console.log(this.selectedServices);
    }

    next(){
        let traderServices:TraderService[] = [];
        this.selectedServices.forEach((service:TradepersonJob) => {
            traderServices.push(new TraderService(-1, -1, service.Id));
        });
        this.userService.setTraderServices(traderServices);
        
        this.router.navigate(['/traderlocation']);
    }
}