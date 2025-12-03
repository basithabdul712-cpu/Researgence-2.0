
export class Facultylist {
    universityId: number;
    roleId: number;
    loginUserId: number;
    locationId: number;
    schoolId:number;
    instituteId: number;
    departmentId: number;
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
      this.locationId = 0;
      this.instituteId = 0;
      this.departmentId = 0;
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