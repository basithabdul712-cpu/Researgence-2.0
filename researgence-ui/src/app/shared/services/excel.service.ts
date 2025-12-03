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

    public exportPubMineExcel(json: any[], excelFileName: string): void {

        const MAX_EXCEL_CELL_TEXT_LENGTH = 32767;

        const trimmedJson = json.map(row =>
            Object.entries(row).reduce((acc, [key, value]) => {
                let processedValue = value;

                // Trim long strings
                if (typeof processedValue === "string" && processedValue.length > MAX_EXCEL_CELL_TEXT_LENGTH) {
                    processedValue = processedValue.substring(0, MAX_EXCEL_CELL_TEXT_LENGTH);
                }

                // if (["SCS", "WOS", "SCI", "PM", "IEEE", "GS", "SNIP", "SJR", "IF", "CITE SCORE"].includes(key) && processedValue !== null && processedValue !== undefined) {
                //     if (typeof processedValue === "string" || typeof processedValue === "number") {
                //         const numericValue = Number(processedValue);
                //         processedValue = !isNaN(numericValue) ? numericValue : null;
                //     } else {
                //         processedValue = null; // Set to null if not convertible
                //     }
                // }
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
                    } else if (colNumber >= 43 && colNumber <= 47) {
                        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
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
            { range: [41, 42], width: 26 },
            { range: [43, 47], width: 30 },
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

    public exportAsExcelMutipleSheetFile(
        sheets: {
            sheetName: string;
            reportName: string;
            sheetData: any[];
            columnWidth?: Record<string, number>;
            columnStyle?: Record<
                string,
                {
                    font?: Partial<ExcelJS.Font>;
                    alignment?: Partial<ExcelJS.Alignment>;
                    fill?: ExcelJS.Fill;
                }
            >;
        }[],
        excelFileName: string
    ): void {
        const workbook = new ExcelJS.Workbook();

        sheets.forEach(sheet => {
            const worksheet = workbook.addWorksheet(sheet.sheetName);
            const data = sheet.sheetData;

            if (!data || !data.length) return;

            const dataKeys = Object.keys(data[0]);

            // ---- Title Row ----
            worksheet.mergeCells(1, 1, 1, dataKeys.length);
            const titleCell = worksheet.getCell('A1');
            titleCell.value = sheet.reportName;
            titleCell.font = { name: 'Calibri Light', bold: true, size: 12, color: { argb: 'FF262626' } };
            titleCell.alignment = { horizontal: 'left', vertical: 'middle' };
            titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F6F95D' } };
            titleCell.border = {
                top: { style: 'thin', color: { argb: 'BFBFBF' } },
                bottom: { style: 'thin', color: { argb: 'BFBFBF' } }
            };

            // ---- Header Row ----
            const headerRow = worksheet.addRow(dataKeys);
            headerRow.height = 45;
            headerRow.eachCell((cell) => {
                cell.font = { name: 'Aptos', bold: true, size: 11, color: { argb: 'FFFFFFFF' } };
                cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0755B9' } };
                cell.border = {
                    top: { style: 'thin', color: { argb: 'FFFFFF' } },
                    bottom: { style: 'thin', color: { argb: 'FFFFFF' } },
                    left: { style: 'thin', color: { argb: 'FFFFFF' } },
                    right: { style: 'thin', color: { argb: 'FFFFFF' } }
                };
            });

            // ---- Data Rows ----
            data.forEach(item => {
                // 👇 Build row values with type conversion
                const rowValues = dataKeys.map(key => {
                    const value = item[key];

                    // Convert numeric strings to numbers to avoid Excel "number stored as text" warning
                    if (typeof value === 'string' && value.trim() !== '' && !isNaN(Number(value))) {
                        // If value starts with '0', keep it as text to preserve leading zeros
                        if (value.startsWith('0') && value.length > 1) {
                            return value;
                        }
                        return Number(value);
                    }

                    return value;
                });

                // 👇 Add row with the converted values
                const row = worksheet.addRow(rowValues);

                // 👇 Apply styles
                row.eachCell((cell, colNumber) => {
                    const key = dataKeys[colNumber - 1];

                    const defaultAlignment: Partial<ExcelJS.Alignment> = {
                        horizontal: 'left',
                        vertical: 'top',
                        wrapText: true
                    };

                    let style: any = {
                        font: { name: 'Calibri', size: 10.5, color: { argb: 'FF262626' } },
                        alignment: defaultAlignment,
                        border: {
                            top: { style: 'thin', color: { argb: 'BFBFBF' } },
                            bottom: { style: 'thin', color: { argb: 'BFBFBF' } },
                            left: { style: 'thin', color: { argb: 'BFBFBF' } },
                            right: { style: 'thin', color: { argb: 'BFBFBF' } }
                        }
                    };

                    const styleFromAPI = sheet.columnStyle?.[key];
                    if (styleFromAPI) {
                        if (styleFromAPI.font) style.font = styleFromAPI.font;
                        if (styleFromAPI.alignment) {
                            style.alignment = {
                                ...style.alignment,
                                ...styleFromAPI.alignment
                            };
                        }
                        if (styleFromAPI.fill) style.fill = styleFromAPI.fill;
                    }

                    cell.font = style.font;
                    cell.alignment = style.alignment;
                    cell.border = style.border;
                    if (style.fill) {
                        cell.fill = style.fill;
                    }
                });
            });

            // ---- Row Heights ----
            worksheet.getRow(1).height = 21;
            worksheet.getRow(2).height = 45;
            for (let i = 3; i <= worksheet.rowCount; i++) {
                worksheet.getRow(i).height = 45;
            }

            // ---- Column Widths ----
            worksheet.columns = dataKeys.map(key => ({
                key,
                width: sheet.columnWidth?.[key] ?? 20
            }));

            // ---- Freeze Rows ----
            worksheet.views = [{ state: 'frozen', ySplit: 2 }];
        });

        workbook.xlsx.writeBuffer().then(buffer => {
            const blob = new Blob([buffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            FileSaver.saveAs(blob, `${excelFileName}.xlsx`);
        });
    }

  // private saveAsExcelMuttipleFile(buffer: any, fileName: string): void {
    //     const data: Blob = new Blob([buffer], {
    //         type: EXCEL_TYPE
    //     });
    //     FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    // }
 

    public exportPubMineExcelSupport(json: any[], excelFileName: string): void {

        const MAX_EXCEL_CELL_TEXT_LENGTH = 32767;

        const trimmedJson = json.map(row =>
            Object.entries(row).reduce((acc, [key, value]) => {
                let processedValue = value;

                // Trim long strings
                if (typeof processedValue === "string" && processedValue.length > MAX_EXCEL_CELL_TEXT_LENGTH) {
                    processedValue = processedValue.substring(0, MAX_EXCEL_CELL_TEXT_LENGTH);
                }

                // if (["SCS", "WOS", "SCI", "PM", "IEEE", "GS", "SNIP", "SJR", "IF", "CITE SCORE"].includes(key) && processedValue !== null && processedValue !== undefined) {
                //     if (typeof processedValue === "string" || typeof processedValue === "number") {
                //         const numericValue = Number(processedValue);
                //         processedValue = !isNaN(numericValue) ? numericValue : null;
                //     } else {
                //         processedValue = null; // Set to null if not convertible
                //     }
                // }
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
                    } else if (colNumber >= 39 && colNumber <= 47) {
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
            { range: [41, 47], width: 26 }
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


// Excel logic for scorebook

public exportScorebookViewExcel(json: any[], excelFileName: string): void {

    const MAX_EXCEL_CELL_TEXT_LENGTH = 32767;

    const trimmedJson = json.map(row =>
        Object.entries(row).reduce((acc, [key, value]) => {
            let processedValue = value;

            // Trim long strings
            if (typeof processedValue === "string" && processedValue.length > MAX_EXCEL_CELL_TEXT_LENGTH) {
                processedValue = processedValue.substring(0, MAX_EXCEL_CELL_TEXT_LENGTH);
            }

            acc[key] = processedValue;
            return acc;
        }, {})
    );


    const row = trimmedJson.length
    if (row <= 50000) {
        this.createAndDownloadChunkScorebookView(trimmedJson, excelFileName + '_export' + new Date().getTime() + EXCEL_EXTENSION)
    } else {
        const chunkSize = 50000;
        const chunks = [];
        for (let i = 0; i < trimmedJson.length; i += chunkSize) {
            chunks.push(trimmedJson.slice(i, i + chunkSize));
        }
        this.processChunksSequentiallyScorebookView(chunks);
    }

}

private async processChunksSequentiallyScorebookView(chunks: any[][]) {
    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        await this.createAndDownloadChunk(chunk, `Scorebook_view_Part${i + 1}` + '_export' + new Date().getTime() + EXCEL_EXTENSION);
    }
}

private async createAndDownloadChunkScorebookView(data: any[], excelFileName) {

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
                if (colNumber >= 1 && colNumber <=20) {
                    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
                }
            }
            // else if (isHeader) {
            //     if (colNumber >= 7 && colNumber <= 15) {
            //         cell.fill = {
            //             type: 'pattern',
            //             pattern: 'solid',
            //             fgColor: { argb: '97B242' }
            //         };
            //     }
            //     else if (colNumber >= 19 && colNumber <= 20) {
            //         cell.fill = {
            //             type: 'pattern',
            //             pattern: 'solid',
            //             fgColor: { argb: '97B242' }
            //         };
            //     }
            //     else if (colNumber >= 30 && colNumber <= 35) {
            //         cell.fill = {
            //             type: 'pattern',
            //             pattern: 'solid',
            //             fgColor: { argb: '97B242' }
            //         };
            //     }
            // }
        });
    });


    const columnWidths = [
        { range: [0, 0], width: 14 },
        { range: [1, 2], width: 26 },
        { range: [3, 4], width: 14 },
        { range: [5, 6], width: 26 },
        { range: [7, 13], width: 18 },
        { range: [14, 14], width: 50 },
        { range: [15, 19], width: 24 }
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

public exportAsExcelFileTimeline(json: any[], excelFileName: string): void {
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

        if (cell.r == 1) {
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


}
