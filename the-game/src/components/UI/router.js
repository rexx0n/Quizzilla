import { createRouter, createWebHistory } from 'vue-router';

import CreateOrJoinPage from "@/pages/CreateOrJoinPage.vue";
import JoinPage from "@/pages/JoinPage.vue";
import notFound from "@/pages/NotFound.vue";
import userNickNamePage from "@/pages/UserNickNamePage.vue";
import TheRoomUser from "@/pages/TheRoomUser.vue";



const routes = [
    { path: '/', component: CreateOrJoinPage },
    {path: '/join', component: JoinPage},
    {path: '/:pathMatch(.*)*', component: notFound},
    {path: '/username', component: userNickNamePage},
    {path: '/room', component: TheRoomUser}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;