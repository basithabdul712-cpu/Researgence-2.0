export class Publications{

authorAffiliation: string;
authors:string; 
citation: string;
citationCnt: string;
conferenceName: string;
hIndex: string;
isbn: string;
levelName: string;
link:string;
pdfLink: string;
pissn: string;
pubYear: string;
publicationId: string;
publicationSourceName: string;
publicationSourceName_Book_BookChapter: string;
publicationSourceName_Conference: string;
publicationTitle: string;
publicationType:string;
publisherName:string;
reportId:string;
reportName:string;
reportSheetName:string;
reportSheetNumber:string;
reportVersion:string;
scopusCitation:string;
slNo:string;
ugcLink:string;
uniqueIdLegacy:string;
wosCitation:string;
}

export class  SheetData {
    sheetName: string;
    sheetData: Publications[];
  }

  export class Report {
    reportId: string;
    reportName: string;
    reportVersion: string;
    reportSheetNumber: string;
    reportSheetName: string;
    reportSheetTitle: string;
    reportColumnName: string;
    reportDisplayColumnName: string;
    reportColumnOrder: string;
    columnWidth?:string;
    cellStyle?:string;
    [key: string]: any;
  }

  export class SheetHeader {
    sheetName: string;
    sheetHeader: { [key: string]: string }[];
    sheetHeaderdata:any;
    columnWidth: Record<string, number>;
    columnStyle: Record<string, string>;
  }


  