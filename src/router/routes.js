
//import Landing from 'pages/Landing'
const routes = [
  {
    name: 'main',
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'home', path: '/', component: () => import('pages/Index.vue') },
      // { path: 'landing', component: Landing },
      { name: 'landing', path: 'landing', component: () => import('pages/Landing.vue') },
      { name: 'profile-summary', path: 'profile-summary', component: () => import('pages/profile/ProfileSummary.vue') },
      { name: 'profile-section', path: 'profile-section/:section', component: () => import('pages/profile/ProfileSection.vue') },
      //{ name: 'absence', path: 'absence/:section', component: () => import('pages/Absence.vue') },
      { name: 'clock-in', path: 'clock-in', component: () => import('pages/absence/ClockIn.vue') },
      { name: 'clock-out', path: 'clock-out', component: () => import('pages/absence/ClockOut.vue') },
      { name: 'create-leave', path: 'create-leave', component: () => import('pages/leave/CreateLeave.vue') },
      { name: 'maintain-leave', path: 'maintain-leave', component: () => import('pages/leave/MaintainLeave.vue') },
      //{ name: 'leave', path: 'leave', component: () => import('pages/Leave.vue') },
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('pages/Login.vue')
  },
  {
    name: 'logout',
    path: '/logout',
    component: () => import('pages/Logout.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    //component: () => import('pages/Error404.vue')
    redirect: "/main/landing"
  })
}

export default routes
