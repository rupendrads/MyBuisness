export interface IJobStatic {
    Id: number;
    Title: string,
    Description: string,
    ImagePath: String;    
  }
  
  export class JobStatic implements IJobStatic {
    public Id: number;
    public Title: string;
    public Description: string;
    public ImagePath: String;    
          
    constructor(id: number, title: string, description: string, imagePath: string) {
      this.Id = id;
      this.Title = title;
      this.Description = description;
      this.ImagePath = imagePath;
    }
  }