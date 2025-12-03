export class ProjectBasicDetail {
    projectId: number = 0;
    projectTitle: string = '';
    projectDescription: string = '';
    projectFundingTypeId: number = 0;
    projectFundingTypeName: string = '';
    projectFundingAgencyId: number = 0;
    projectFundingAgencyName: string = '';
    projectFundingAgencyTypeId: number = 0;
    projectFundingAgencyTypeName: string = '';
    projectTechnologyAreas: string = '';
    projectSanctionedAmount: number = 0;
    projectSanctionedAmountInWords: string = '';
    projectStartDate: string = '';
    projectEndDate: string = '';
    projectDurationInYears: number = 0;
    projectStatusId: number = 0;
    projectStatusName: string = '';
    projectCompletionDate: string = '';
    projectSanctionedDocPath: string = '';
    projectURL: string = '';
    isOutcomeAvailable: boolean = false;
    sourceUniversityId: number = 0;
    isReadyForReview: boolean = false;
}


export interface ProjectDetails {
    projectBasicDetail: ProjectBasicDetail;
    projectGrantDisbursement: any[]; 
    projectInvestigators: any[];    
    projectOutcome: any[]; 
}