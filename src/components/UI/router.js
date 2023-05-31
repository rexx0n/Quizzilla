import { createRouter, createWebHistory } from 'vue-router';

import CreateOrJoinPage from "@/pages/CreateOrJoinPage.vue";
import JoinPage from "@/pages/JoinPage.vue";
import notFound from "@/pages/NotFound.vue";
import userNickNamePage from "@/pages/UserNickNamePage.vue";
import TheRoomUser from "@/pages/TheRoomUsersHost.vue";
import GamePageHost from "@/pages/GamePageHost.vue";
import TheRoomUsersClient from "@/pages/TheRoomUsersClient.vue";
import GamePageClient from "@/pages/GamePageClient.vue";
import ScoreTablePage from "@/pages/ScoreTablePage.vue";
import EndGamePage from "@/pages/EndGamePage.vue";



const routes = [
    { path: '/', name:'main', component: CreateOrJoinPage },
    {path: '/join',name:'join', component: JoinPage},
    {path: '/:pathMatch(.*)*', name:"notFount", component: notFound},
    {path: '/username',name:'username', component: userNickNamePage},
    {path: '/roomHost',name:'roomHost', component: TheRoomUser},
    {path: '/gameHost/:numberQuestion', props:true, name:'game', component: GamePageHost},
    {path: '/roomClient', name:'roomClient', component: TheRoomUsersClient},
    {path: '/gameClient', name:'gameClient', component: GamePageClient,},
    {path: '/scoreTable', name:'scoreTable', component: ScoreTablePage},
    {path: '/endGame', name: 'endGame', component: EndGamePage}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;