export class DesignPatent {
  universityId?: number
  roleId?: number
  loginUserId?: number
  sortColumnName?: string
 sortType?: string
  startRow?: number
  endRow?: number
  download?:number
  filter?: number
  "searchList": [
    {
      columnName?: string
      searchType?:string
      searchId?: string
      searchValue?:string
      rangeFrom?: string
      rangeTo?: string
    }
  ]

}
