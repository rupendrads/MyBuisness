import { Injectable, OnInit } from "@angular/core";
import { User } from "../models/User.model";
import { TraderLocation } from "../../trader-location/models/TraderLocation.model";
import { TraderService } from "../../trader-services/models/TraderService.model";
import { TraderAboutYou } from "src/app/trader-about-you/models/TraderAboutYou.model";

@Injectable({
    providedIn: 'root',
})
export class UserService implements OnInit {
    user: User;

    constructor(){
        this.user = new User(-1, "", "", "", "");
        this.user.TraderLocation = new TraderLocation(-1, -1, "");
        this.user.TraderAboutYou = new TraderAboutYou(-1, "", "", "", "", "");
    }

    ngOnInit(): void {    

    }

    setTraderAboutYou(traderType: string, 
                    tradingName: string,
                    registeredCompanyName: string,
                    companyRegistrationNumber: string,
                    partnersNames: string){
        if(this.user.TraderAboutYou) {
            this.user.TraderAboutYou.TraderType = traderType;
            this.user.TraderAboutYou.TradingName = tradingName;
            this.user.TraderAboutYou.RegisteredCompanyName = registeredCompanyName;
            this.user.TraderAboutYou.CompanyRegistrationNumber = companyRegistrationNumber;
            this.user.TraderAboutYou.PartnersNames = partnersNames;
        }
        console.log(this.user);
    }

    setTraderLocation(mile: number, zipCode: string){
        if(this.user.TraderLocation){
            this.user.TraderLocation.Mile = mile;
            this.user.TraderLocation.Zipcode = zipCode;
        }
        console.log(this.user);
    }

    setTraderServices(traderServices: TraderService[]){
        this.user.TraderServices = [];
        traderServices.forEach(service => {
            this.user.TraderServices.push(service);    
        });        
        console.log(this.user);
    }

    setUser(user: User){
        this.user.FirstName = user.FirstName;
        this.user.LastName = user.LastName;
        this.user.Email = user.Email;
        this.user.Mobile = user.Mobile;
        console.log(this.user);
    }

}