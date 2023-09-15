import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-trader-services',
    templateUrl: './trader-services.component.html',
    styleUrls: ['./trader-services.component.css']
})
export class TraderServicesComponent implements OnInit {
    selectedService:any;
    selectedServices:any[] = [];
    
    ngOnInit(): void {    
        
    }

    addService(){
        if(this.selectedService!== undefined && !this.selectedServices.includes(this.selectedService)){
            this.selectedServices.push(this.selectedService);
        }
        console.log(this.selectedServices);
    }
}