import { createRouter, createWebHistory } from 'vue-router';
import ChatView from '../components/ChatView.vue';
import LoginView from '../components/LoginView.vue';
import RegisterView from '../components/RegisterView.vue';
import ProfileView from '../components/ProfileView.vue';

import HomeView from '../views/HomeView.vue';
import TestForm from '../components/TestForm.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },

    {
        path: '/login',
        name: 'login',
        component: LoginView
    },

    {
        path: '/register',
        name: 'register',
        component: RegisterView
    },

    {
        path: '/chat-box',
        name: 'chat-box',
        component: ChatView,
    },

    {
        path: '/profile',
        name: 'profile',
        component: ProfileView
    },
    {
        path: '/test',
        name: 'test',
        component: TestForm
    },
];


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;