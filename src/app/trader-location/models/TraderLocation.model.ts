export interface ITraderLocation {
    Id: number;
    Mile: number;
    Zipcode: string;   
  }
  
  export class TraderLocation implements ITraderLocation {
    Id: number;
    Mile: number;
    Zipcode: string;   
          
    constructor(id: number, mile: number, zipCode: string) {
      this.Id = id;
      this.Mile = mile;
      this.Zipcode = zipCode;
    }
  }