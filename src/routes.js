import React from 'react';
import TraineeRegisterEdit from './views/trainee-registers/TraineeRegisterEdit';
import TraineeRegisterCreate from './views/trainee-registers/TraineeRegisterCreate';
import TraineeRegisters from './views/trainee-registers/TraineeRegisters';
import PageBlockCreate from './views/page-blocks/PageBlockCreate';
import PageBlockEdit from './views/page-blocks/PageBlockEdit';
import Companies from './views/company/Companies';
import CompanyCreate from './views/company/CompanyCreate';
import CompanyEdit from './views/company/CompanyEdit';
import TrainingCreate from './views/training/TrainingCreate';
import TrainingEdit from './views/training/TrainingEdit';
import Trainings from './views/training/Trainings';
import PerformancePassports from './views/performance-passport/PerformancePassports';
import PerformancePassportCreate from './views/performance-passport/PerformancePassportCreate';
import PerformancePassportEdit from './views/performance-passport/PerformancePassportEdit';
import AdminRegisters from './views/admin/AdminRegisters';
import AdminRegisterCreate from './views/admin/AdminRegisterCreate';
import AdminRegisterEdit from './views/admin/AdminRegisterEdit';
import Login from './views/pages/login/Login';
import ForgetPassword from './views/pages/login/ForgetPassword';
import Profile from './views/pages/profile/Profile';
import AnswerEdit from './views/answer/AnswerEdit';
import AnswerPageList from './views/answer/AnswerPageList';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const blacklist = {
  event_producer: {
    '/admins': true,
    '/admins/create': true,
    '/admins/:id': true,
  },
  facilitator: {
    '/admins': true,
    '/admins/create': true,
    '/admins/:id': true,

    '/companies': true,
    '/companies/create': true,
    '/companies/:id': true,

    '/performance-passports/create': true,
    '/performance-passports/:id/page/create': true
  }
};

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/login', name: 'Login', component: Login, unprotected: true },
  { path: '/forget-password', name: 'Forget Password', component: ForgetPassword, unprotected: true },
  { path: '/profile', name: 'Profile', component: Profile, },
  
  { path: '/trainee-registers', exact: true,  name: 'Trainee Registers', component: TraineeRegisters},
  { path: '/trainee-registers/create', exact: true, name: 'New Trainee Register', component: TraineeRegisterCreate },
  { path: '/trainee-registers/:id', exact: true, name: 'Trainee Register Details', component: TraineeRegisterEdit },

  { path: '/admins', exact: true,  name: 'Admin Registers', component: AdminRegisters },
  { path: '/admins/create', exact: true, name: 'New Admin Register', component: AdminRegisterCreate },
  { path: '/admins/:id', exact: true, name: 'Admin Register Details', component: AdminRegisterEdit },

  { path: '/companies', exact: true,  name: 'Companies', component: Companies },
  { path: '/companies/create', exact: true, name: 'New Company', component: CompanyCreate },
  { path: '/companies/:id', exact: true, name: 'Company Details', component: CompanyEdit },

  { path: '/trainings', exact: true,  name: 'Trainings', component: Trainings },
  { path: '/trainings/create', exact: true, name: 'New Training', component: TrainingCreate },
  { path: '/trainings/:id', exact: true, name: 'Training Details', component: TrainingEdit },
  { path: '/trainings/:id/answer/:traineeid/:ppid', exact: true, name: 'Answer List', component: AnswerPageList },
  { path: '/trainings/:id/answer/:traineeid/:ppid/page/:pageid', exact: true, name: 'Answer Details', component: AnswerEdit },

  { path: '/performance-passports', exact: true,  name: 'Performance Passport', component: PerformancePassports },
  { path: '/performance-passports/create', exact: true, name: 'New Performance Passport', component: PerformancePassportCreate },
  { path: '/performance-passports/:id', exact: true, name: 'Performance Passport Details', component: PerformancePassportEdit },
  { path: '/performance-passports/:id/page/create', exact: true, name: 'New Page Blocks', component: PageBlockCreate },
  { path: '/performance-passports/:id/page/:pageid', exact: true, name: 'Page Blocks Details', component: PageBlockEdit },
];

export default routes;
export { blacklist }
