import { AdminGuard } from './../guard/admin.guard';
import { Routes } from '@angular/router';

export const content: Routes = [
  
  {
    path: 'Home',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
    // canActivate:[AdminGuard],
    data: {
      breadcrumb: "Home"
    }
  },
  {
    path: 'Dashboard',
    loadChildren: () => import('../../components/dashboard-detail/dashboard-detail.module').then(m => m.DashboarddetailModule),
    // canActivate:[AdminGuard],
    data: {
      breadcrumb: "Dashboard"
    }
  },
  {
    path: 'Publications/Dashboard',
    loadChildren: () => import('../../components/publication/publication-dashboard.module').then(m => m.PublicationDashboardModule),
    // canActivate:[AdminGuard],
    data: {
      breadcrumb: "Publication"
    }
  },
  // {
  //   path: 'Landing',
  //   loadChildren: () => import('../../auth/loginmain/roles/roles.module').then(m => m.RolesModule),
  //   data: {
  //     breadcrumb: "Roles"
  //   }
  // },
  {
    path: 'facultyProfiles',
    loadChildren: () => import('../../components/faculties/faculties.module').then(m => m.FacultiesModule),
    // canActivate:[AdminGuard],
    data: {
      breadcrumb: "My Profile"
    }
  },
  {path: 'Dashboard/Compare', redirectTo: '/facultyProfiles/compare/dashboard', canActivate:[AdminGuard],data:{breadcrumb:"My profile"}},
  {
    path: 'scholar',
    loadChildren: () => import('../../components/scholar/scholar.module').then(m => m.ScholarModule),
    // canActivate:[AdminGuard],
    data: {
      breadcrumb: "My Profile"
    }
  },
  {
    path: 'scorebook',
    loadChildren: () => import('../../components/scorebook/scorebook.module').then(m => m.ScorebookModule),
    // canActivate:[AdminGuard],
    data: {
      breadcrumb: "Score Book"
    }
  },
  // {
  //   path: 'turnkey',
  //   loadChildren: () => import('../../components/R+Subscription/R+Subscription.module').then(m => m.RSubscriptionModule),
  //   canActivate:[AdminGuard],
  //   data: {
  //     breadcrumb: "Subscription"
  //   }
  // },
  // {
  //   path: 'newrequest',
  //   loadChildren: () => import('../../components/Newrequest/Newrequest.module').then(m => m.NewrequestModule),
  //   canActivate:[AdminGuard],
  //   data: {
  //     breadcrumb: "newrequest"
  //   }
  // },
  {
    path: 'Patent',
    loadChildren: () => import('../../components/Pantent/pantent.module').then(m => m.PantentModule),
    // canActivate:[AdminGuard],
    data: {
      breadcrumb: "Pantent"
    }
  },
  // {
  //   path: 'clientadmin',
  //   loadChildren: () => import('../../components/adminclient/adminclient.module').then(m => m.AdminclientModule),
  //   data: {
  //     breadcrumb: "Admin client"
  //   }
  // },
  // {
  //   path: 'clientlibrarian',
  //   loadChildren: () => import('../../components/clientlibrarian/clientlibrarian.module').then(m => m.ClientlibrarianModule),
  //   canActivate:[AdminGuard],
  //   data: {
  //     breadcrumb: "Client librarian"
  //   }
  // },
  // {
  //   path: 'cisupportadmin',
  //   loadChildren: () => import('../../components/clsupportadmin/clsupportadmin.module').then(m => m.ClsupportadminModule),
  //   data: {
  //     breadcrumb: "CI support admin"
  //   }
  // },
  // {
  //   path: 'superadmin',
  //   loadChildren: () => import('../../components/cisuperadmin/cisuperadmin.module').then(m => m.CisuperadminModule),
  //   data: {
  //     breadcrumb: "CI super admin"
  //   }
  // },
  {
    path: 'outcome',
    loadChildren: () => import('../../components/researchoutcomes/researchoutcome.module').then(m =>m.ResearchoutcomeModule),
    data: {
      breadcrumb: "My Research Outcomes"
    }
  }

];