export class FacultyTimelineData {
    universityId: number;
    roleId: number;
    loginUserId: number;
    publicationDBId:number|null;
    articleTypeId:number|null;
    locationId: number| null;
    schoolId:number|null;
    instituteId: number|null;
    departmentId: number|null;
    departmentGroupId: number|null;
    sortColumnName: string | null;
    sortType: string | null;
    fromMonthYear: Date | null;
    toMonthYear: Date | null;
    startRow: number;
    endRow: number;
    download: number;
    filter: number;
  
    constructor() {
      this.universityId = 0;
      this.roleId = 0;
      this.loginUserId = 0;
      this.publicationDBId=null;
      this.articleTypeId=null;
      this.locationId = null;
      this.schoolId=null;
      this.instituteId = null;
      this.departmentId = null;
      this.departmentGroupId = null;
      this.sortColumnName = null;
      this.sortType = null;
      this.fromMonthYear = null;
      this.toMonthYear = null;
      this.startRow = 0;
      this.endRow = 0;
      this.download = 0;
      this.filter = 0;
    }
  }
   