import { Component, OnInit } from "@angular/core";
import { UserService } from "../sign-up/services/user.service";

@Component({
    selector: 'app-trader-location',
    templateUrl: './trader-location.component.html',
    styleUrls: ['./trader-location.component.css']
})
export class TraderLocationComponent implements OnInit {
    selectedMile = "1";
    zipcode:string = "";

    constructor(private userService: UserService){}

    ngOnInit(): void {    
        
    }

    next(){
        console.log(`Selected Mile: ${this.selectedMile}`);
        console.log(`Zip code: ${this.zipcode}`);
        this.userService.setTraderLocation(+this.selectedMile, this.zipcode);
    }
}