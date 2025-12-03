import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private isMenuOpenSubject = new BehaviorSubject<boolean>(false);
  isMenuOpen$ = this.isMenuOpenSubject.asObservable();

  toggleSidebar(): void {
    const currentValue = this.isMenuOpenSubject.value;
    this.isMenuOpenSubject.next(!currentValue);
  }
}
