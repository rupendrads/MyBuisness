import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-trader-services',
    templateUrl: './trader-services.component.html',
    styleUrls: ['./trader-services.component.css']
})
export class TraderServicesComponent implements OnInit {
    selectedService:any;
    selectedServices:any[] = [];

    constructor(private router: Router){}
    
    ngOnInit(): void {    
        
    }

    addService(){
        if(this.selectedService!== undefined && !this.selectedServices.includes(this.selectedService)){
            this.selectedServices.push(this.selectedService);
        }
        console.log(this.selectedServices);
    }

    next(){
        this.router.navigate(['/traderlocation']);
    }
}