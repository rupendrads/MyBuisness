export interface ITraderAboutYou {
    Id: number;
    TraderType: string;
    TradingName: string;
    RegisteredCompanyName: string; 
    CompanyRegistrationNumber: string;
    PartnersNames: string;
}
  
export class TraderAboutYou implements ITraderAboutYou {
    Id: number;
    TraderType: string; 
    TradingName: string; 
    RegisteredCompanyName: string; 
    CompanyRegistrationNumber: string;
    PartnersNames: string;
            
    constructor(id: number, traderType: string, tradingName: string,
        registeredCompanyName: string, companyRegistrationNumber: string,
        partnersNames: string) {
        this.Id = id;
        this.TraderType = traderType;
        this.TradingName = tradingName;
        this.RegisteredCompanyName = registeredCompanyName;
        this.CompanyRegistrationNumber = companyRegistrationNumber;
        this.PartnersNames = partnersNames;
    }
}