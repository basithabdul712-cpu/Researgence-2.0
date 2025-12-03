import { Injectable } from '@angular/core';
@Injectable()
export class NumberToWordsService {
    private a = [
        '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven',
        'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen',
        'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
      ];
      private b = [
        '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty',
        'Sixty', 'Seventy', 'Eighty', 'Ninety'
      ];
    
      private numToWords(num: number): string {
        if ((num = num || 0) === 0) return 'Zero';
        if (num < 0) return 'Minus ' + this.numToWords(Math.abs(num));
    
        let str = '';
    
        const crore = Math.floor(num / 10000000);
        num %= 10000000;
        const lakh = Math.floor(num / 100000);
        num %= 100000;
        const thousand = Math.floor(num / 1000);
        num %= 1000;
        const hundred = Math.floor(num / 100);
        num %= 100;
    
        if (crore) str += this.numToWords(crore) + ' Crore ';
        if (lakh) str += this.numToWords(lakh) + ' Lakh ';
        if (thousand) str += this.numToWords(thousand) + ' Thousand ';
        if (hundred) str += this.numToWords(hundred) + ' Hundred ';
    
        if (num) {
          if (str != '') str += 'and ';
          if (num < 20) str += this.a[num];
          else {
            str += this.b[Math.floor(num / 10)];
            if (num % 10) str += '-' + this.a[num % 10];
          }
        }
        return str.trim();
      }
    
      convertToRupeesWords(amount: number): string {
        const rupees = Math.floor(amount);
        const paise = Math.round((amount - rupees) * 100);
    
        let words = '';
        if (rupees) {
          words += this.numToWords(rupees);
        }
        if (paise) {
          words += this.numToWords(paise);
        }
        return words ;
      }
      
    }