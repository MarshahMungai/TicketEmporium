import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/faqs',
    name: 'faqs',
    component: () => import('../views/FaqsView.vue')
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: () => import('../views/ContactsView.vue')
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('../views/EventsView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/user-dashboard',
    name: 'userdashboard',
    component: () => import('../views/UserDashboardView.vue'),
    meta: {
      isLoggedIn: true,
    },
  },
  {
    path: '/admin-dashboard',
    name: 'admindashboard',
    component: () => import('../views/AdminDashboardView.vue'),
    meta: {
      isLoggedIn: true,
      requiredRoleIds: [1], // Specify the required role_id(s)
    },
  },
  {
    path: '/seller-dashboard',
    name: 'sellerdashboard',
    component: () => import('../views/SellerDashboardView.vue'),
    meta: {
      isLoggedIn: true,
      requiredRoleIds: [3], // Specify the required role_id(s)
    },
  },
  {
    path: '/verify-email/:token',
    name: 'verify-email',
    component: () => import('../views/VerifyEmailView.vue'),
  },
  {
    path: '/forgot-password/:token',
    name: 'forgot-password',
    component: () => import('../views/ResetPasswordView.vue'),
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
  },
  { 
    path: '/:catchAll(.*)', // Match all unmatched routes
    redirect: '/404', // Redirect to the 404 page
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

  

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some(route => route.meta.isLoggedIn)) {
    const isLoggedIn = store.state.isLoggedIn; // Check if the user is logged in

    if (!isLoggedIn) {
      // User is not logged in, redirect to the login page
      next('/login');
    } else {
      // User is logged in, check if they have the required roleIds
      const requiredRoleIds = to.meta.requiredRoleIds; // Get required roleIds from the route's meta

      if (requiredRoleIds) {
        // User roleIds are stored in localStorage as an array of roleIds
        const userRoleIds = JSON.parse(localStorage.getItem('roleIds'));

        // Check if the user has any of the required roleIds
        const hasRequiredRoleId = userRoleIds.some(roleId => requiredRoleIds.includes(roleId));

        if (hasRequiredRoleId) {
          // User has the required role, allow access to the route
          next();
        } else {
          // User does not have the required role, redirect to /404
          next('/404');
        }
      } else {
        // No specific roleIds are required, allow access to the route
        next();
      }
    }
  } else {
    // This route does not require authentication, allow access for all users
    next();
  }
});


export default router
