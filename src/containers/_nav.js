import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Trainee Registers',
    to: '/trainee-registers',
    icon: 'cil-people',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Companies',
    to: '/companies',
    icon: 'cil-people',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Trainings',
    to: '/trainings',
    icon: 'cil-people',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Performance Passport',
    to: '/performance-passports',
    icon: 'cil-people',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Admin',
    to: '/admins',
    icon: 'cil-people',
  },
]

export default _nav
