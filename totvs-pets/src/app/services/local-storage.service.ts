import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(key,value){
    window.localStorage[key] = value;
    return window.localStorage[key];
  }

  get(key,defaultValue=null){
    return window.localStorage[key] || defaultValue
  }

  setObject(key,value){
    window.localStorage[key] = JSON.stringify(value)
    return this;
  }

  getObject(key){
    return JSON.parse(window.localStorage.getItem(key));
  }

  remove(key){
    window.localStorage.removeItem(key)
  }
}
