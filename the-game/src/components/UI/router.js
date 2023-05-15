import { createRouter, createWebHistory } from 'vue-router';

import JoinPage from "@/pages/JoinPage.vue";


const routes = [
    { path: '/', component: JoinPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;