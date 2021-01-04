import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import UserProfile from '../views/UserProfile.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin
    },
    {
        path: '/user/:userId',
        name: 'UserProfile',
        component: UserProfile
    },

]
const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router