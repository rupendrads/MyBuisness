export interface ITraderService {
    Id: number;
    UserId: number;
    TradepersonJobId: number;   
  }
  
  export class TraderService implements ITraderService {
    Id: number;
    UserId: number;
    TradepersonJobId: number;  
          
    constructor(id: number, userId: number, tradepersonJobId: number) {
      this.Id = id;
      this.UserId = userId;
      this.TradepersonJobId = tradepersonJobId;
    }
  }