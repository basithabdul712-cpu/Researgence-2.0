import { AdminGuard } from './../guard/admin.guard';
import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'Home',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate:[AdminGuard],
    data: {
      preload: true,
      breadcrumb: "Home"
    }
  },
  {
    path: 'Dashboard',
    loadChildren: () => import('../../components/dashboard-detail/dashboard-detail.module').then(m => m.DashboarddetailModule),
    canActivate:[AdminGuard],
    data: {
      preload: true,
      breadcrumb: "Dashboard"
    }
  },
  {
    path: 'Publications/Dashboard',
    loadChildren: () => import('../../components/publication/publication-dashboard.module').then(m => m.PublicationDashboardModule),
    canActivate:[AdminGuard],
    data: {
      preload: false,
      breadcrumb: "Publication"
    }
  },
  {
    path: 'Landing',
    loadChildren: () => import('../../auth/loginmain/roles/roles.module').then(m => m.RolesModule),
    data: {
      preload: true,
      breadcrumb: "Roles"
    }
  },
  {
    path: 'facultyProfiles',
    loadChildren: () => import('../../components/faculties/faculties.module').then(m => m.FacultiesModule),
    canActivate:[AdminGuard],
    data: {
      preload: false,
      breadcrumb: "My Profile"
    }
  },
  {path: 'Dashboard/Compare', redirectTo: '/facultyProfiles/compare/dashboard', canActivate:[AdminGuard],data:{breadcrumb:"My profile"}},
  {
    path: 'Staff',
    loadChildren: () => import('../../components/staff/staff.module').then(m => m.StaffModule),
    canActivate:[AdminGuard],
    data: {
      preload: false,
      breadcrumb: "My Profile"
    }
  },
  {
    path: 'Student',
    loadChildren: () => import('../../components/student/student.module').then(m => m.StudentModule),
    canActivate:[AdminGuard],
    data: {
      preload: false,
      breadcrumb: "My Profile"
    }
  },
  {
    path: 'scholar',
    loadChildren: () => import('../../components/scholar/scholar.module').then(m => m.ScholarModule),
    canActivate:[AdminGuard],
    data: {
      preload: false,
      breadcrumb: "My Profile"
    }
  },
  {
    path: 'scorebook',
    loadChildren: () => import('../../components/scorebook/scorebook.module').then(m => m.ScorebookModule),
    canActivate:[AdminGuard],
    data: {
      preload: false,
      breadcrumb: "Score Book"
    }
  },
  {
    path: 'turnkey',
    loadChildren: () => import('../../components/R+Subscription/R+Subscription.module').then(m => m.RSubscriptionModule),
    canActivate:[AdminGuard],
    data: {
      preload: false,
      breadcrumb: "Subscription"
    }
  },
  {
    path: 'performance-analysis-dashboard',
    loadChildren: () => import('../../components/performance-analysis/performance-analysis.module').then(m => m.PerformanceAnalysisModule),
    canActivate:[AdminGuard],
    data: {
      preload: false,
      breadcrumb: "performance"
    }
  },
  {
    path: 'newrequest',
    loadChildren: () => import('../../components/Newrequest/Newrequest.module').then(m => m.NewrequestModule),
    canActivate:[AdminGuard],
    data: {
      preload: false,
      breadcrumb: "newrequest"
    }
  },
  {
    path: 'Patent',
    loadChildren: () => import('../../components/Patent/patent.module').then(m => m.PatentModule),
    canActivate:[AdminGuard],
    data: {
      preload: false,
      breadcrumb: "Patent"
    }
  },
  {
    path: 'Project',
    loadChildren: () => import('../../components/project/project-profile.module').then(m => m.ProjectProfileModule),
    canActivate:[AdminGuard],
    data: {
      preload: false,
      breadcrumb: "Patent"
    }
  },
  {
    path: 'Copyrights',
    loadChildren: () => import('../../components/copyright/copyright.module').then(m => m.CopyrightModule),
    canActivate:[AdminGuard],
    data: {
      preload: false,
      breadcrumb: "Patent"
    }
  },
  {
    path: 'Trademark',
    loadChildren: () => import('../../components/trademark/trademark.module').then(m => m.TrademarkModule),
    canActivate:[AdminGuard],
    data: {
      preload: false,
      breadcrumb: "Trademark"
    }
  },
  {
    path: 'clientadmin',
    loadChildren: () => import('../../components/adminclient/adminclient.module').then(m => m.AdminclientModule),
    data: {
      preload: false,
      breadcrumb: "Admin client"
    }
  },
  {
    path: 'clientlibrarian',
    loadChildren: () => import('../../components/clientlibrarian/clientlibrarian.module').then(m => m.ClientlibrarianModule),
    canActivate:[AdminGuard],
    data: {
      breadcrumb: "Client librarian"
    }
  },
  {
    path: 'cisupportadmin',
    loadChildren: () => import('../../components/clsupportadmin/clsupportadmin.module').then(m => m.ClsupportadminModule),
    data: {
      preload: true,
      breadcrumb: "CI support admin"
    }
  },
  {
    path: 'superadmin',
    loadChildren: () => import('../../components/cisuperadmin/cisuperadmin.module').then(m => m.CisuperadminModule),
    data: {
      preload: true,
      breadcrumb: "CI super admin"
    }
  },
  {
    path: 'outcome',
    loadChildren: () => import('../../components/researchoutcomes/researchoutcome.module').then(m =>m.ResearchoutcomeModule),
    data: {
      breadcrumb: "My Research Outcomes"
    }
  }

];