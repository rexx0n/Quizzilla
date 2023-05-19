import { createRouter, createWebHistory } from 'vue-router';

import CreateOrJoinPage from "@/pages/CreateOrJoinPage.vue";
import JoinPage from "@/pages/JoinPage.vue";
import notFound from "@/pages/NotFound.vue";
import userNickNamePage from "@/pages/UserNickNamePage.vue";
import TheRoomUser from "@/pages/TheRoomUsersHost.vue";
import GamePage from "@/pages/GamePage.vue";
import TheRoomUsersClient from "@/pages/TheRoomUsersClient.vue";



const routes = [
    { path: '/', component: CreateOrJoinPage },
    {path: '/join',name:'join', component: JoinPage},
    {path: '/:pathMatch(.*)*', component: notFound},
    {path: '/username', component: userNickNamePage},
    {path: '/roomHost',name:'roomHost', component: TheRoomUser},
    {path: '/game', name:'game', component: GamePage},
    {path: '/roomClient', name:'roomClient', component: TheRoomUsersClient}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;