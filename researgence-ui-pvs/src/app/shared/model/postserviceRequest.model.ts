export class PostServiceRequest{
    serviceRequestId: number|null=null;
    universityId: number;
    requestDescription: string;
    raisedBy: number;
    serviceTypeId: number;
    categoryId: number;
    workFlowStatusId: number;
    assignedBy: string|null=null;
   assignedTo: string|null=null;
   priorityId: number;
   serviceRequestSourceId: number;
   contactEmailId: string;
   contactPhoneNo: string;
  resolvedBy: string|null=null;
  remark: string|null=null;
}