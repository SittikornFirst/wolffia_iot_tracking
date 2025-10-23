// router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: '/dashboard'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Auth/LoginView.vue'),
        meta: {
            requiresAuth: false,
            layout: 'auth'
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Auth/RegisterView.vue'),
        meta: {
            requiresAuth: false,
            layout: 'auth'
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/DashboardView.vue'),
        meta: {
            requiresAuth: false,
            title: 'Dashboard'
        }
    },
    {
        path: '/devices',
        name: 'Devices',
        component: () => import('@/views/DevicesView.vue'),
        meta: {
            requiresAuth: false,
            title: 'Device Management'
        }
    },
    {
        path: '/devices/:id',
        name: 'DeviceDetails',
        component: () => import('@/views/DeviceDetailsView.vue'),
        meta: {
            requiresAuth: false,
            title: 'Device Details'
        }
    },
    {
        path: '/alerts',
        name: 'Alerts',
        component: () => import('@/views/AlertsView.vue'),
        meta: {
            requiresAuth: false,
            title: 'Alerts & Notifications'
        }
    },
    {
        path: '/analytics',
        name: 'Analytics',
        component: () => import('@/views/AnalyticsView.vue'),
        meta: {
            requiresAuth: false,
            title: 'Analytics'
        }
    },
    {
        path: '/farms',
        name: 'Farms',
        component: () => import('@/views/FarmsView.vue'),
        meta: {
            requiresAuth: false,
            title: 'Farm Management'
        }
    },
    {
        path: '/farms/:id',
        name: 'FarmDetails',
        component: () => import('@/views/FarmDetailsView.vue'),
        meta: {
            requiresAuth: false,
            title: 'Farm Details'
        }
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('@/views/SettingsView.vue'),
        meta: {
            requiresAuth: false,
            title: 'Settings'
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/ProfileView.vue'),
        meta: {
            requiresAuth: false,
            title: 'Profile'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFoundView.vue'),
        meta: {
            title: '404 - Not Found'
        }
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    }
});

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('auth_token');
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    // Set page title
    if (to.meta.title) {
        document.title = `${to.meta.title} | Wolffia Monitoring`;
    } else {
        document.title = 'Wolffia Monitoring System';
    }

    // Check authentication
    if (requiresAuth && !token) {
        next({
            name: 'Login',
            query: { redirect: to.fullPath }
        });
    } else if (!requiresAuth && token && (to.name === 'Login' || to.name === 'Register')) {
        next({ name: 'Dashboard' });
    } else {
        next();
    }
});

// Navigation guard for error handling
router.onError((error) => {
    console.error('Router error:', error);
});

export default router;