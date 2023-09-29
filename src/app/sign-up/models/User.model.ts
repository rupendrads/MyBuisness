import { TraderLocation } from "../../trader-location/models/TraderLocation.model";
import { TraderService } from "../../trader-services/models/TraderService.model";

export interface IUser {
    Id: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Mobile: string; 
    TraderLocation: TraderLocation| undefined;
    TraderServices: TraderService[];   
  }
  
  export class User implements IUser {
    Id: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Mobile: string;  
    TraderLocation: TraderLocation| undefined; 
    TraderServices: TraderService[] = [];  
          
    constructor(id: number, firstName: string, lastName: string, email: string, mobile: string) {
      this.Id = id;
      this.FirstName = firstName;
      this.LastName = lastName;
      this.Email = email;
      this.Mobile = mobile;
    }
  }