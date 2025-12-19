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
        path: '/signup',
        name: 'SignUp',
        component: () => import('../pages/SignUp.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
