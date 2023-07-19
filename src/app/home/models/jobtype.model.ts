export interface JobType {
    tradepersontypeId: number,
    jobId: number,
    jobName: string
  }

  export class JobType {
    public tradepersontypeId: number;
    public jobId: number;
    public jobName: string;

    constructor(
        tradepersontypeId: number,
        jobId: number,
        jobName: string
    ) {
        this.tradepersontypeId = tradepersontypeId;
        this.jobId = jobId;
        this.jobName = jobName;
    }
  }