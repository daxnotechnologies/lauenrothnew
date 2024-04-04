const navConfig = [
  {
    title: 'Home',
    path: '/dashboard/app',
    icon: 'ic:round-home',
    supervisor: true,
    superuser: true,
    admin: true,
    contentadmin: true,
  },

  {
    title: 'Courses',
    path: '/dashboard/courses',
    icon: 'zondicons:play-outline',
    supervisor: true,
    superuser: false,
    admin: false,
    contentadmin: false,
  },
  {
    title: 'Plans',
    path: '/dashboard/plans',
    icon: 'pepicons-pop:file',
    supervisor: true,
    superuser: false,
    admin: false,
    contentadmin: false,
  },
  {
    title: 'Billing',
    path: '/dashboard/billings',
    icon: 'majesticons:coins',
    supervisor: true,
    superuser: false,
    admin: false,
    contentadmin: false,
  },

  // {
  //   title: 'Roles Access',
  //   path: '/dashboard/role_permissions',
  //   icon: 'eos-icons:role-binding-outlined',
  // },
  // {
  //   title: 'feedbacks',
  //   path: '/dashboard/feedbacks',
  //   icon: 'iconamoon:comment',
  // },

  {
    title: 'Accounts',
    path: '/dashboard/company/companies',
    icon: 'material-symbols:person-outline',
    supervisor: true,
    superuser: true,
    admin: false,
    contentadmin: false,
  },
];

export default navConfig;
