import { createRouter, createWebHistory } from 'vue-router';
import LogtoClient from '@logto/browser';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';

const logtoClient = new LogtoClient({
    endpoint: 'https://hrtcsm.logto.app/',
    appId: 'yx5wx1egjifrv0gj5x4qb',
});

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const isAuthenticated = await logtoClient.isAuthenticated();

    if (to.name !== 'Login' && !isAuthenticated) {
        next({ name: 'Login' });
    } else {
        next();
    }
});

export default router;