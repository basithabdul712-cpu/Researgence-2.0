import { Injectable, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	onClick?: string;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false
	public fullScreen = false;

	constructor(private router:Router) {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = false
		}

	}

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	// MENUITEMS: Menu[] = []
	// 	{
	// 		path: '/Home', title: 'Home', icon: 'home', type: 'link' ,onClick: 'openCard'
	// 	},
	// 	{
	// 		path: '', title: 'My Profile', icon: 'user', type: 'link' ,onClick: 'openCard'
	// 	},
	// 	{
	// 		title: 'Research Outputs', icon: 'award', type: 'sub', active: false, children: []
	// 	},
	// 	{
	// 		title: 'Expert Profiles', icon: 'user', type: 'sub', active: false, children: []
	// 	},
	// 	{
	// 		title: 'R+ Subscriptions', icon: 'check-square', type: 'sub', active: false, children: [
	// 			{
	// 				path: '/journal-search',title: "Journalopedia",type: "link",icon: "airplay",onClick: "openCard"
	// 			},
	// 			{
	// 				path: '/turnkey',title: "Turnkey Reports",type: "link",icon: "airplay",onClick: "openCard"
	// 			},
	// 			{
	// 				path: '/scorebook', title: 'Score Book', icon: 'airplay', type: 'link',onClick: "openCard"
	// 			},
	// 			{
	// 				path: '/facultyProfiles/compare/fac',title: "Performance Analysis",type: "link",icon: "airplay",onClick: "openCard"
	// 			},
	// 			{
	// 				path: '/Home',title: "Public Visibility",type: "link",icon: "airplay",onClick: "openCard"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		title: 'Support', icon: 'settings', type: 'sub', active: false, children: [
	// 			{
	// 				path: '/facultyProfiles/Support/MyAdditions',title: "My Additions",type: "link",icon: "airplay",onClick: "openCard"
	// 			},
	// 			{
	// 				path: '/facultyProfiles/Support/MyRequests',title: "My Requests",type: "link",icon: "airplay",onClick: "openCard"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		path: '/clientadmin/user/screen', title: 'User Management', icon: 'users', type: 'link' 
	// 	},
	// 	// {
	// 	// 	path: '/clientadmin', title: 'User Statistics', icon: 'activity', type: 'link' 
	// 	// },
	// 	// {
	// 	// 	path: '/clientadmin', title: 'Admin Feeder System', icon: 'file-plus', type: 'link' 
	// 	// },
	// 	// {
	// 	// 	path: '/clientadmin', title: 'Bulk Upload', icon: 'upload', type: 'link' 
	// 	// },
	// 	// {
	// 	// 	path: '/clientadmin', title: 'User Data Validation', icon: 'user-check', type: 'link' 
	// 	// },
	// 	// {
	// 	// 	path: '/cisupportadmin', title: 'Support Executive', icon: 'trello', type: 'link' 
	// 	// },
	// 	// {
	// 	// 	path: '/cisupportadmin', title: 'Support Executive Stats', icon: 'file-text', type: 'link' 
	// 	// },
	// 	// {
	// 	// 	path: '/cisupportadmin', title: 'Client Support', icon: 'help-circle', type: 'link' 
	// 	// },
	// 	// {
	// 	// 	path: '/cisupportadmin', title: 'Support Data Evaluation', icon: 'edit', type: 'link' 
	// 	// },
	// 	{
	// 		path: '/clientadmin/main/report', title: 'Client Usage Report', icon: 'help-circle', type: 'link' 
	// 	},
	// 	{
	// 		path: '/clientadmin/main/ACSR/report', title: 'ACSR Report', icon: 'file-plus', type: 'link' 
	// 	},
	// 	{
	// 		path: '/clientadmin/report/clientusage', title: 'Client Usage Report', icon: 'help-circle', type: 'link' 
	// 	},
	// 	{
	// 		path: '/clientadmin/DFS/SUPPORT/REQUEST', title: 'DFS Source Request', icon: 'align-justify', type: 'link' 
	// 	},
	// 	{
	// 		path: '/clientadmin/universitySelect/DFS/add/addnew', title: 'Add DFS', icon: 'paperclip', type: 'link' 
	// 	},
	// 	{
	// 		path: '/clientadmin/universitySelect/DFS/viewDfs/university', title: 'DFS/RFS Quality Check', icon: 'book-open', type: 'link' 
	// 	},
	// 	{
	// 		path: '/clientadmin/universitySelect/RFS/view/univ', title: 'RFS Support', icon: 'slack', type: 'link' 
	// 	},
	// 	{
	// 		path: '/clientadmin/admin-service-request', title: 'Service Request', icon: 'user-plus', type: 'link' 
	// 	},
	// 	{
	// 		path: '/scorebook/Publications/InsightReports',title: 'Insight Reports',icon:'airplay',type:'link'
	// 	}
	// ]
	MENUITEMS: Menu[] = [
		{
			path: '/Home/:data', title: 'Home', icon: 'home', type: 'link' ,onClick: 'openCard'
		},
		{
			path: '/facultyProfiles',title: 'Faculty', active: false, icon:'user',type:'link'
		},
		{
			path: '/scorebook/Publications/InsightReports',title: 'Insight Reports',active: false, icon:'airplay',type:'link'
		},
		{
			path: '/scorebook/Publications/Mine',title: 'Publication Mine', active: false, icon:'file-plus',type:'link'
		},
		,
		// {
		// 	path: '/Patent/minedb',title: 'Patent Mine', active: false, icon:'file-plus',type:'link'
		// }
	]

	
	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
	openCard(event: MouseEvent) {
		event.preventDefault();
		const target = event.target as HTMLElement;
		const path = target.getAttribute('href');
		const cardId = path.substring(path.indexOf("#") + 1);
		console.log(cardId);
	
		const cards = document.getElementsByClassName("card");
		console.log(cards);
	
		if (path === '/dashboard') {
		  this.router.navigate(['/Home']);
		}
	
		for (let i = 0; i < cards.length; i++) {
		  const card = cards[i] as HTMLElement;
		  card.classList.remove("open");
		}
	
		const card = document.getElementById(cardId);
		console.log(card);
	
		if (card) {
		  card.classList.add('open');
		}
	  }
	
	  // Other methods...
	}
	
	


  
  
