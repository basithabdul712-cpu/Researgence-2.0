export class DfsPatent{

    patentId: Number;
    applicationNumber: string| null =null; 
    patentNumber: string| null =null; 
    patentTitle: string| null =null; 
    inventors: string| null =null; 
    applicants: string| null =null; 
    filingDate: string| null =null; 
    publishedDate: string| null =null; 
    examinationDate: string| null =null; 
    ferIssuedDate: string| null =null; 
    ferReplyDate: string| null =null; 
    hearingNoticeDate: string| null =null; 
    grantDate: string| null =null;
    patentStageId: Number;
    patentStageName: string| null =null;
    patentStatusId: Number; 
    patentStatusName: string| null =null; 
    patentOfficeId: Number; 
    patentOfficeName: string| null =null; 
    patentCountryId: Number;
    correspondance: string| null =null;
    domain: string| null =null;
    abstract: string| null =null; 
    srcUniversityId: Number; 
    patentDomainId: Number;
    patentDomainName: string| null =null; 

}

