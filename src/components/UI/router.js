import { createRouter, createWebHistory } from 'vue-router';

import CreateOrJoinPage from "@/pages/CreateOrJoinPage.vue";
import JoinPage from "@/pages/JoinPage.vue";
import notFound from "@/pages/NotFound.vue";
import userNickNamePage from "@/pages/UserNickNamePage.vue";
import TheRoomUser from "@/pages/TheRoomUsersHost.vue";
import GamePage from "@/pages/GamePageHost.vue";
import TheRoomUsersClient from "@/pages/TheRoomUsersClient.vue";
import GamePageClient from "@/pages/GamePageClient.vue";
import ScoreTablePage from "@/pages/ScoreTablePage.vue";



const routes = [
    { path: '/', component: CreateOrJoinPage },
    {path: '/join',name:'join', component: JoinPage},
    {path: '/:pathMatch(.*)*', component: notFound},
    {path: '/username', component: userNickNamePage},
    {path: '/roomHost',name:'roomHost', component: TheRoomUser},
    {path: '/gameHost', name:'game', component: GamePage},
    {path: '/roomClient', name:'roomClient', component: TheRoomUsersClient},
    {path: '/gameClient', name:'gameClient', component: GamePageClient,},
    {path: '/scoreTable', name:'scoreTable', component: ScoreTablePage}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;