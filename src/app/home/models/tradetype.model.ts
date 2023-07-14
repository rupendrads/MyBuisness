export interface TradepersonType {
    tradepersontypeId: number,
    tradepersonName: string
  }

  export class TradepersonType {
    public tradepersontypeId: number;
    public tradepersonName: string;

    constructor(
        tradepersontypeId: number,
        tradepersonName: string
    ) {
        this.tradepersontypeId = tradepersontypeId;
        this.tradepersonName = tradepersonName;
    }
  }