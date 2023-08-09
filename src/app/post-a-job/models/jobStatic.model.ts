export interface IJobStatic {
    Id: number;
    Title: string,
    Description: string,
    ImagePath: String;
    Budget: string;    
  }
  
  export class JobStatic implements IJobStatic {
    public Id: number;
    public Title: string;
    public Description: string;
    public ImagePath: String;  
    public Budget: string;  
          
    constructor(id: number, title: string, description: string, imagePath: string, budget:string) {
      this.Id = id;
      this.Title = title;
      this.Description = description;
      this.ImagePath = imagePath;
      this.Budget = budget;
    }
  }