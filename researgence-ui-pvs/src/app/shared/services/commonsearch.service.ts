import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CommonsearchService {

  constructor() { }
  private searchQuery = new BehaviorSubject<string>('');
  
  setSearchQuery(query: string): void {
    this.searchQuery.next(query);
  }
  
  getSearchQuery(): Observable<string> {
    return this.searchQuery.asObservable();
  }

}
