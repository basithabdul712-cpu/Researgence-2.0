import { Injectable } from '@angular/core';
import * as CryptoJs from 'crypto-js'

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  constructor() { }

  private secretkey = "bXnZfKp4$2e7qLs9@JhGzYtRcVpXwA8k!3DfMg%5Nd6#TfGh";
  
  encryptData(data:any):string{
    try{
      return CryptoJs.AES.encrypt(JSON.stringify(data),this.secretkey).toString();
    }catch(e){
      console.error('Encryption error:',e);
      return ''
    }
  }

  decryptData(data:string):any{
    try{
      const bytes = CryptoJs.AES.decrypt(data,this.secretkey);
      if(bytes.toString()){
        return JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
      }
      return null
    }catch(e){
      console.error('Decryption error:',e)
      return null
    }
  }


  setItem(key:string,value:any):void{
    const encryptedData = this.encryptData(value);
    localStorage.setItem(key,encryptedData);
  }

  getItem(key:string):any{
    const data = localStorage.getItem(key);
    if(data){
      return this.decryptData(data);
    }
    return null
  }

  removeItem(key:string):void{
    localStorage.removeItem(key)
  }

}


