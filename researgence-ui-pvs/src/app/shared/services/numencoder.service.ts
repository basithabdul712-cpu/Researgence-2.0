import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumencoderService {

  public chars = '';


  constructor() { }


  encodeNumber(num: number): string { 
    const randomStr = '67ad925b';
    const encodedNum = num.toString(36).padStart(8, '0'); // Base-36 encoding
  
    return randomStr + encodedNum;
  }
  
  decodeNumber(encodedStr: string): number {
    let encodedNum = encodedStr.slice(-8); // Last 6 characters contain the number
    return parseInt(encodedNum, 36); // Convert back to number
  }
}
