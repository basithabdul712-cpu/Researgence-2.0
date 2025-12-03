import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniversityidService {

  constructor() { }

  private selectedIdSource = new BehaviorSubject<number | null>(null); // Default: null
  selectedId$ = this.selectedIdSource.asObservable(); // Observable to track ID changes

  // Update the selected ID
  setSelectedId(id: number) {
    this.selectedIdSource.next(id);
  }

  // Get current selected ID synchronously
  getSelectedId(): number | null {
    return this.selectedIdSource.value;
  }

}
