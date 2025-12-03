import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx-js-style';
import * as ExcelJS from 'exceljs';
const EXCEL_EXTENSION = '.xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';


@Injectable()
export class ExcelExportService {
    constructor() { }
    public exportAsExcelFile(json: any[], excelFileName: string): void {
        const MAX_EXCEL_CELL_TEXT_LENGTH = 32767;

        const trimmedJson = json.map(row => {
            const trimmedRow = {};
            for (const key in row) {
                if (row[key] && row[key].length > MAX_EXCEL_CELL_TEXT_LENGTH) {
                    trimmedRow[key] = row[key].substring(0, MAX_EXCEL_CELL_TEXT_LENGTH);
                } else {
                    trimmedRow[key] = row[key];
                }
            }
            return trimmedRow;
        });

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(trimmedJson);
        for (const i in worksheet) {
            if (typeof worksheet[i] != 'object') continue;
            let cell = XLSX.utils.decode_cell(i);

            worksheet[i].s = {
                // styling for all cells
                font: {
                    name: 'Calibri',
                    sz: "10.5",
                },
                border: {
                    right: {
                        style: 'thin',
                        color: '000000',
                    },
                    left: {
                        style: 'thin',
                        color: '000000',
                    },
                    bottom: {
                        style: 'thin',
                        color: '000000',
                    },
                    top: {
                        style: 'thin',
                        color: '000000',
                    }
                }, alignment: {
                    wrapText: true
                }
            };

            if (worksheet[i].t == "z") {
                // first row
                worksheet[i].t = "s";
                worksheet[i].v = "";
                worksheet[i].s = {
                    // bottom border
                    border: {
                        right: {
                            style: 'thin',
                            color: '000000',
                        },
                        left: {
                            style: 'thin',
                            color: '000000',
                        },
                        bottom: {
                            style: 'thin',
                            color: '0000',
                        },
                        top: {
                            style: 'thin',
                            color: '0000',
                        }
                    }
                };
            }

            if (cell.r == 0) {
                // first row
                worksheet[i].s = {
                    // bottom border
                    font: {
                        bold: true,
                        sz: "10.5",
                    },
                    border: {
                        right: {
                            style: 'thin',
                            color: '000000',
                        },
                        left: {
                            style: 'thin',
                            color: '000000',
                        },
                        bottom: {
                            style: 'thin',
                            color: '000000',
                        },
                        top: {
                            style: 'thin',
                            color: '000000',
                        }
                    }
                };
            }
        }

        const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };

        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    //   public exportPubMineExcel(json: any[], excelFileName: string): void {
    //     const MAX_EXCEL_CELL_TEXT_LENGTH = 32767;

    //     const trimmedJson = json.map(row => {
    //         const trimmedRow = {};
    //         for (const key in row) {
    //             if (row[key] && row[key].length > MAX_EXCEL_CELL_TEXT_LENGTH) {
    //                 trimmedRow[key] = row[key].substring(0, MAX_EXCEL_CELL_TEXT_LENGTH);
    //             } else {
    //                 trimmedRow[key] = row[key];
    //             }
    //         }
    //         return trimmedRow;
    //     });

    //     const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(trimmedJson);
    //     for (const i in worksheet) {
    //         if (typeof worksheet[i] != 'object') continue;
    //         let cell = XLSX.utils.decode_cell(i);

    //         worksheet[i].s = {
    //             // styling for all cells
    //             font: {
    //                 name: 'Calibri',
    //                 sz: "10.5",
    //             },
    //             border: {
    //                 right: {
    //                     style: 'thin',
    //                     color: '000000',
    //                 },
    //                 left: {
    //                     style: 'thin',
    //                     color: '000000',
    //                 },
    //                 bottom: {
    //                     style: 'thin',
    //                     color: '000000',
    //                 },
    //                 top: {
    //                     style: 'thin',
    //                     color: '000000',
    //                 }
    //             },
    //             alignment: {
    //                 wrapText: true
    //             }
    //         };

    //         if (worksheet[i].t == "z") {
    //             // first row
    //             worksheet[i].t = "s";
    //             worksheet[i].v = "";
    //             worksheet[i].s = {
    //                 // bottom border
    //                 border: {
    //                     right: {
    //                         style: 'thin',
    //                         color: '000000',
    //                     },
    //                     left: {
    //                         style: 'thin',
    //                         color: '000000',
    //                     },
    //                     bottom: {
    //                         style: 'thin',
    //                         color: '0000',
    //                     },
    //                     top: {
    //                         style: 'thin',
    //                         color: '0000',
    //                     }
    //                 }
    //             };
    //         }

    //         if (cell.r == 0) {
    //             // first row
    //             worksheet[i].s = {
    //                 // bottom border
    //                 font: {
    //                     name:'Cambria',
    //                     bold: true,
    //                     sz: "12",
    //                     color: { rgb: "FFFFFF" }
    //                 },
    //                 border: {
    //                     right: {
    //                         style: 'thin',
    //                         color: { rgb: "FFFFFF" },
    //                     },
    //                     left: {
    //                         style: 'thin',
    //                         color: { rgb: "FFFFFF" },
    //                     },
    //                     bottom: {
    //                         style: 'thin',
    //                         color: { rgb: "FFFFFF" },
    //                     },
    //                     top: {
    //                         style: 'thin',
    //                         color: { rgb: "FFFFFF" },
    //                     }
    //                 },
    //                 fill: {
    //                     // Add background color
    //                     fgColor: { rgb: "0755B9" }
    //                 },
    //                 alignment: {
    //                     horizontal: "center",
    //                     vertical: "center",
    //                     wrapText: true
    //                 }
    //             };
    //             const startColIndex = XLSX.utils.decode_col('D');  
    //             const endColIndex = XLSX.utils.decode_col('L');  

    //             if (cell.c >= startColIndex && cell.c <= endColIndex) {
    //                 worksheet[i].s.fill.fgColor = { rgb: "97B242" };
    //             }

    //             const startColIndex1 = XLSX.utils.decode_col('P');
    //             const endColIndex1 = XLSX.utils.decode_col('Q');   

    //             if (cell.c >= startColIndex1 && cell.c <= endColIndex1) {
    //                 worksheet[i].s.fill.fgColor = { rgb: "97B242" };
    //             }

    //             const startColIndex2 = XLSX.utils.decode_col('AD'); 
    //             const endColIndex2 = XLSX.utils.decode_col('AI');   

    //             if (cell.c >= startColIndex2 && cell.c <= endColIndex2) {
    //                 worksheet[i].s.fill.fgColor = { rgb: "97B242" };
    //             }
    //         }
    //         if (cell.c == 0 && cell.r > 0) {
    //             worksheet[i].s.alignment = {
    //                 horizontal: "center",
    //                 vertical: "center",
    //                 wrapText: true
    //             };
    //         }
    //         if (cell.r> 0 && (cell.c >= 1 && cell.c <= 2)) {
    //             worksheet[i].s.alignment = {
    //                 horizontal: "left",
    //                 vertical: "top",
    //                 wrapText: true
    //             };
    //         }
    //         if (cell.r > 0 && (cell.c >= 3 && cell.c <= 17)) {
    //             worksheet[i].s.alignment = {
    //                 horizontal: "center",
    //                 vertical: "center",
    //                 wrapText: true
    //             };
    //         }
    //         if (cell.r >0 && (cell.c >= 18 && cell.c <= 23)) {
    //             worksheet[i].s.alignment = {
    //                 horizontal: "left",
    //                 vertical: "top",
    //                 wrapText: true
    //             };
    //         }

    //         if (cell.r >0 && (cell.c >= 24 && cell.c <= 37)) {
    //             worksheet[i].s.alignment = {
    //                 horizontal: "center",
    //                 vertical: "center",
    //                 wrapText: true
    //             };
    //         }
    //         if (cell.r > 0 && (cell.c >= 38 && cell.c <= 42)) {
    //             worksheet[i].s.alignment = {
    //                 horizontal: "left",
    //                 vertical: "top",
    //                 wrapText: true
    //             };
    //         }
    //     }
    //         // Set the row height to 1 cm (approximately 28.35 points)
    //         const rowHeightInPoints = 45;
    //         worksheet['!rows'] = [];
    //         for (let rowIndex = 0; rowIndex < trimmedJson.length + 1; rowIndex++) {
    //             worksheet['!rows'][rowIndex] = { hpt: rowHeightInPoints };
    //         }

    //          // Set the column width 
    //     const colWidthInCharacters = 12;
    //     worksheet['!cols'] = [];
    //     const keys = Object.keys(trimmedJson[0]);
    //     for (let colIndex = 0; colIndex < keys.length; colIndex++) {
    //         worksheet['!cols'][colIndex] = { wch: colWidthInCharacters };
    //     }

    //     worksheet['!cols'][1] = { wch: 25 };
    //     worksheet['!cols'][2] = { wch: 50 };
    //    for(let hedIndex=3;hedIndex<=11;hedIndex++){
    //     worksheet['!cols'][hedIndex]={wch: 15}
    //    }
    //     worksheet['!cols'][12] = { wch: 50 };
    //     worksheet['!cols'][13] = { wch: 18 };
    //     worksheet['!cols'][14] = { wch: 20 };
    //     worksheet['!cols'][15] = { wch: 15 };
    //     worksheet['!cols'][16] = { wch: 15 };
    //     worksheet['!cols'][17] = { wch: 20 };
    //     worksheet['!cols'][18] = { wch: 20 };
    //     worksheet['!cols'][19] = { wch: 50 };
    //     worksheet['!cols'][20] = { wch: 25 };
    //     worksheet['!cols'][21] = { wch: 25 };
    //     worksheet['!cols'][22] = { wch: 25 };
    //     worksheet['!cols'][23] = { wch: 35 };
    //     worksheet['!cols'][24] = { wch: 35 };
    //     worksheet['!cols'][32] = { wch: 18 };
    //     worksheet['!cols'][33] = { wch: 18 };
    //     worksheet['!cols'][34] = { wch: 18 };
    //     worksheet['!cols'][35] = { wch: 13 };
    //     worksheet['!cols'][36] = { wch: 13 };
    //     worksheet['!cols'][37] = { wch: 21 };
    //     worksheet['!cols'][38] = { wch: 21 };
    //     worksheet['!cols'][39] = { wch: 45 };
    //     worksheet['!cols'][40] = { wch: 45 };
    //     worksheet['!cols'][41] = { wch: 25 };
    //     worksheet['!cols'][42] = { wch: 25 };

    //     const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };

    //     const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //     this.saveAsExcelFile(excelBuffer, excelFileName);
    // }

    public exportPubMineExcel(json: any[], excelFileName: string): void {

        const MAX_EXCEL_CELL_TEXT_LENGTH = 32767;

        const trimmedJson = json.map(row =>
            Object.entries(row).reduce((acc, [key, value]) => {
                let processedValue = value;

                // Trim long strings
                if (typeof processedValue === "string" && processedValue.length > MAX_EXCEL_CELL_TEXT_LENGTH) {
                    processedValue = processedValue.substring(0, MAX_EXCEL_CELL_TEXT_LENGTH);
                }

                if (["SCS", "WOS", "SCI", "PM", "IEEE", "GS", "SNIP", "SJR", "IF", "CITE SCORE"].includes(key) && processedValue !== null && processedValue !== undefined) {
                    if (typeof processedValue === "string" || typeof processedValue === "number") {
                        const numericValue = Number(processedValue);
                        processedValue = !isNaN(numericValue) ? numericValue : null;
                    } else {
                        processedValue = null; // Set to null if not convertible
                    }
                }
                acc[key] = processedValue;
                return acc;
            }, {})
        );


        const row = trimmedJson.length
        if (row <= 50000) {
            this.createAndDownloadChunk(trimmedJson, excelFileName + '_export' + new Date().getTime() + EXCEL_EXTENSION)
        } else {
            const chunkSize = 50000;
            const chunks = [];
            for (let i = 0; i < trimmedJson.length; i += chunkSize) {
                chunks.push(trimmedJson.slice(i, i + chunkSize));
            }
            this.processChunksSequentially(chunks);
        }

    }

    private async processChunksSequentially(chunks: any[][]) {
        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            await this.createAndDownloadChunk(chunk, `Pub_Mine_Part${i + 1}` + '_export' + new Date().getTime() + EXCEL_EXTENSION);
        }
    }

    private async createAndDownloadChunk(data: any[], excelFileName) {

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        // Headers
        const headers = Object.keys(data[0]);
        worksheet.addRow(headers);

        // Add data
        worksheet.addRows(data.map(Object.values));

        // Freeze header row
        worksheet.views = [{ state: 'frozen', ySplit: 1 }];
        const rowHeightInPoints = 45;
        const headerFont = { name: 'Cambria', bold: true, size: 12, color: { argb: 'FFFFFF' } };

        worksheet.getRow(1).eachCell(cell => {
            cell.font = headerFont;
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0755B9' } };
            cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
            cell.border = {
                top: { style: 'thin', color: { argb: 'FFFFFF' } },
                left: { style: 'thin', color: { argb: 'FFFFFF' } },
                bottom: { style: 'thin', color: { argb: 'FFFFFF' } },
                right: { style: 'thin', color: { argb: 'FFFFFF' } },
            };

        });

        // Data rows styling
        worksheet.eachRow((row, rowNumber) => {
            row.height = rowHeightInPoints;

            row.eachCell((cell, colNumber) => {
                const isHeader = rowNumber === 1;
                if (!isHeader) {
                    // Apply data row font, alignment, and borders
                    cell.font = { name: 'Calibri', size: 10.5 };
                    cell.border = {
                        top: { style: 'thin', color: { argb: 'D3D3D3' } },
                        left: { style: 'thin', color: { argb: 'D3D3D3' } },
                        bottom: { style: 'thin', color: { argb: 'D3D3D3' } },
                        right: { style: 'thin', color: { argb: 'D3D3D3' } },
                    };
                    // Alignment based on column ranges
                    if (colNumber === 1) {
                        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
                    } else if (colNumber >= 2 && colNumber <= 6) {
                        cell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
                    } else if (colNumber >= 7 && colNumber <= 21) {
                        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
                    } else if (colNumber >= 22 && colNumber <= 24) {
                        cell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
                    } else if (colNumber >= 25 && colNumber <= 38) {
                        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
                    } else if (colNumber >= 39 && colNumber <= 43) {
                        cell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
                    }
                }
                else if (isHeader) {
                    if (colNumber >= 7 && colNumber <= 15) {
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: '97B242' }
                        };
                    }
                    else if (colNumber >= 19 && colNumber <= 20) {
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: '97B242' }
                        };
                    }
                    else if (colNumber >= 30 && colNumber <= 35) {
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: '97B242' }
                        };
                    }
                }
            });
        });


        const columnWidths = [
            { range: [0, 0], width: 14 },
            { range: [1, 1], width: 26 },
            { range: [2, 4], width: 26 },
            { range: [5, 5], width: 51 },
            { range: [6, 14], width: 16 },
            { range: [15, 15], width: 50 },
            { range: [16, 16], width: 18 },
            { range: [17, 17], width: 20 },
            { range: [18, 21], width: 16 },
            { range: [22, 22], width: 50 },
            { range: [23, 24], width: 26 },
            { range: [25, 31], width: 14 },
            { range: [32, 34], width: 19 },
            { range: [35, 36], width: 14 },
            { range: [37, 38], width: 22 },
            { range: [39, 40], width: 46 },
            { range: [41, 42], width: 26 }
        ]

        columnWidths.forEach(({ range, width }) => {
            const [start, end] = range;
            for (let index = start; index <= end; index++) {
                const column = worksheet.getColumn(index + 1);
                if (column) {
                    column.width = width
                }
            }

        })

        // Save workbook to buffer
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        FileSaver.saveAs(blob, excelFileName);

    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }


    public exportAsExcelMutipleSheetFile(json: { sheetName: string, sheetData: any[], reportName: string }[], excelFileName: string): void {
        const workbook: XLSX.WorkBook = { Sheets: {}, SheetNames: [] };

        json.forEach(sheet => {
            const worksheet: XLSX.WorkSheet = {};

            // Get the keys from the first object in the sheet data to use as column headers
            const dataKeys = Object.keys(sheet.sheetData[0]);

            // Add the sheet name as the first row, starting at cell 'A1'
            worksheet['A1'] = { v: sheet.reportName, t: 's', s: { font: { bold: true, sz: "12", color: { rgb: "FF0000" } }, alignment: { horizontal: "center" } } };

            // Merge cells in the first row
            worksheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 20 } }];

            // Add the data keys as the second row
            dataKeys.forEach((key, index) => {
                const cellAddress = XLSX.utils.encode_cell({ c: index, r: 1 });
                worksheet[cellAddress] = { v: key, t: 's', s: { font: { bold: true, sz: "10.5" } } };
            });

            // Add the data starting from the third row
            sheet.sheetData.forEach((row, rowIndex) => {
                dataKeys.forEach((key, colIndex) => {
                    const cellAddress = XLSX.utils.encode_cell({ c: colIndex, r: rowIndex + 2 });
                    worksheet[cellAddress] = { v: row[key], t: typeof row[key] === 'number' ? 'n' : 's', s: { alignment: { wrapText: true } } };
                });
            });

            // Calculate the range of the worksheet
            const range = { s: { c: 0, r: 0 }, e: { c: dataKeys.length - 1, r: sheet.sheetData.length + 2 } };
            worksheet['!ref'] = XLSX.utils.encode_range(range);

            // Apply styles to all cells
            for (const cellAddress in worksheet) {
                if (worksheet.hasOwnProperty(cellAddress) && typeof worksheet[cellAddress] === 'object') {
                    worksheet[cellAddress].s = worksheet[cellAddress].s || {};
                    worksheet[cellAddress].s.border = {
                        right: { style: 'thin', color: { rgb: '000000' } },
                        left: { style: 'thin', color: { rgb: '000000' } },
                        bottom: { style: 'thin', color: { rgb: '000000' } },
                        top: { style: 'thin', color: { rgb: '000000' } }
                    };
                }
            }

            // Add the worksheet to the workbook
            workbook.Sheets[sheet.sheetName] = worksheet;
            workbook.SheetNames.push(sheet.sheetName);
        });

        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelMuttipleFile(excelBuffer, excelFileName);
    }

    private saveAsExcelMuttipleFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    }

    public exportPubMineExcelSupport(json: any[], excelFileName: string): void {

        const MAX_EXCEL_CELL_TEXT_LENGTH = 32767;

        const trimmedJson = json.map(row =>
            Object.entries(row).reduce((acc, [key, value]) => {
                let processedValue = value;

                // Trim long strings
                if (typeof processedValue === "string" && processedValue.length > MAX_EXCEL_CELL_TEXT_LENGTH) {
                    processedValue = processedValue.substring(0, MAX_EXCEL_CELL_TEXT_LENGTH);
                }

                if (["SCS", "WOS", "SCI", "PM", "IEEE", "GS", "SNIP", "SJR", "IF", "CITE SCORE"].includes(key) && processedValue !== null && processedValue !== undefined) {
                    if (typeof processedValue === "string" || typeof processedValue === "number") {
                        const numericValue = Number(processedValue);
                        processedValue = !isNaN(numericValue) ? numericValue : null;
                    } else {
                        processedValue = null; // Set to null if not convertible
                    }
                }
                acc[key] = processedValue;
                return acc;
            }, {})
        );


        const row = trimmedJson.length
        if (row <= 50000) {
            this.createAndDownloadChunkSupport(trimmedJson, excelFileName + '_export' + new Date().getTime() + EXCEL_EXTENSION)
        } else {
            const chunkSize = 50000;
            const chunks = [];
            for (let i = 0; i < trimmedJson.length; i += chunkSize) {
                chunks.push(trimmedJson.slice(i, i + chunkSize));
            }
            this.processChunksSequentiallySupport(chunks);
        }

    }

    private async processChunksSequentiallySupport(chunks: any[][]) {
        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            await this.createAndDownloadChunkSupport(chunk, `Pub_Mine_Part${i + 1}` + '_export' + new Date().getTime() + EXCEL_EXTENSION);
        }
    }

    private async createAndDownloadChunkSupport(data: any[], excelFileName) {

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        // Headers
        const headers = Object.keys(data[0]);
        worksheet.addRow(headers);

        // Add data
        worksheet.addRows(data.map(Object.values));

        // Freeze header row
        worksheet.views = [{ state: 'frozen', ySplit: 1 }];
        const rowHeightInPoints = 45;
        const headerFont = { name: 'Cambria', bold: true, size: 12, color: { argb: 'FFFFFF' } };

        worksheet.getRow(1).eachCell(cell => {
            cell.font = headerFont;
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0755B9' } };
            cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
            cell.border = {
                top: { style: 'thin', color: { argb: 'FFFFFF' } },
                left: { style: 'thin', color: { argb: 'FFFFFF' } },
                bottom: { style: 'thin', color: { argb: 'FFFFFF' } },
                right: { style: 'thin', color: { argb: 'FFFFFF' } },
            };

        });

        // Data rows styling
        worksheet.eachRow((row, rowNumber) => {
            row.height = rowHeightInPoints;

            row.eachCell((cell, colNumber) => {
                const isHeader = rowNumber === 1;
                if (!isHeader) {
                    // Apply data row font, alignment, and borders
                    cell.font = { name: 'Calibri', size: 10.5 };
                    cell.border = {
                        top: { style: 'thin', color: { argb: 'D3D3D3' } },
                        left: { style: 'thin', color: { argb: 'D3D3D3' } },
                        bottom: { style: 'thin', color: { argb: 'D3D3D3' } },
                        right: { style: 'thin', color: { argb: 'D3D3D3' } },
                    };
                    // Alignment based on column ranges
                    if (colNumber === 1) {
                        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
                    } else if (colNumber >= 2 && colNumber <= 6) {
                        cell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
                    } else if (colNumber >= 7 && colNumber <= 21) {
                        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
                    } else if (colNumber >= 22 && colNumber <= 24) {
                        cell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
                    } else if (colNumber >= 25 && colNumber <= 38) {
                        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
                    } else if (colNumber >= 39 && colNumber <= 46) {
                        cell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
                    }
                }
                else if (isHeader) {
                    if (colNumber >= 7 && colNumber <= 15) {
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: '97B242' }
                        };
                    }
                    else if (colNumber >= 19 && colNumber <= 20) {
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: '97B242' }
                        };
                    }
                    else if (colNumber >= 30 && colNumber <= 35) {
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: '97B242' }
                        };
                    }
                }
            });
        });


        const columnWidths = [
            { range: [0, 0], width: 14 },
            { range: [1, 1], width: 26 },
            { range: [2, 4], width: 26 },
            { range: [5, 5], width: 51 },
            { range: [6, 14], width: 16 },
            { range: [15, 15], width: 50 },
            { range: [16, 16], width: 18 },
            { range: [17, 17], width: 20 },
            { range: [18, 21], width: 16 },
            { range: [22, 22], width: 50 },
            { range: [23, 24], width: 26 },
            { range: [25, 31], width: 14 },
            { range: [32, 34], width: 19 },
            { range: [35, 36], width: 14 },
            { range: [37, 38], width: 22 },
            { range: [39, 40], width: 46 },
            { range: [41, 46], width: 26 }
        ]

        columnWidths.forEach(({ range, width }) => {
            const [start, end] = range;
            for (let index = start; index <= end; index++) {
                const column = worksheet.getColumn(index + 1);
                if (column) {
                    column.width = width
                }
            }

        })

        // Save workbook to buffer
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        FileSaver.saveAs(blob, excelFileName);

    }

}