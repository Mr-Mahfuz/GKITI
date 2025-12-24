import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/About.vue')
  },
  {
    path: '/courses',
    name: 'Courses',
    component: () => import('../pages/Courses.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../pages/Contact.vue')
  },
  {
    path: '/enroll',
    name: 'Enroll',
    component: () => import('../pages/Enroll.vue')
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: () => import('../pages/Blogs.vue')
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: () => import('../pages/FAQ.vue')
  },
  {
    path: '/login',
    name: 'SignIn',
    component: () => import('../pages/SignIn.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../pages/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../pages/SignUp.vue')
  },
  {
    path: '/verify-otp',
    name: 'VerifyOtp',
    component: () => import('../pages/VerifyOtp.vue')
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('../pages/admin/Dashboard.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/courses',
    name: 'AdminCourses',
    component: () => import('../pages/admin/Courses.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

import { useAuthStore } from '../stores/auth'

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Wait for auth init if no user is present to prevent premature redirect
  if (!authStore.user) {
    await authStore.init()
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)
  const user = authStore.user

  if (requiresAuth && !user) {
    next('/login')
  } else if (requiresAdmin && !authStore.isAdmin) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
