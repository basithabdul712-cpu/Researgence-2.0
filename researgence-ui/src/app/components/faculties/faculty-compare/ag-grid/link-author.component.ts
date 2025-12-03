import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';

@Component({
  selector: 'app-author-link-renderer',
  template:`
  <ng-container *ngIf="userId && role !== '12'; else noLink">
    <a [routerLink]="['/facultyProfiles', userId]" class="link-style">{{ authorName }}</a>
  </ng-container>
  <ng-template #noLink>{{ authorName }}</ng-template> <!-- Show plain text if role == 12 -->
`,
  styles: [`
    .link-style {
      color: #0288d1;
      /* text-decoration: underline; */
      cursor: pointer;
    }
    .link-style:hover{
      text-decoration: underline;
    }
  `]
})
export class AuthorLinkRendererComponent implements ICellRendererAngularComp {
  public authorName!: string;
  public userId!: number;
  public role!: string | null;

  constructor(private router: Router,private authservice: AuthService) {}

  agInit(params: any): void {
    this.authorName = params.value;
    this.userId = params.data?.userId;
    this.role = this.authservice.getProfileObs(); 
  }

  refresh(): boolean {
    return false; // No refresh needed
  }
}
