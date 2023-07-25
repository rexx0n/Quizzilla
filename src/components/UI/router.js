import {createRouter, createWebHistory} from 'vue-router';

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
import EndRoundPage from "@/pages/EndRoundPage.vue";
import TestPage from "@/pages/TestPage.vue";


const routes = [
    {path: '/', name: 'main', component: CreateOrJoinPage},
    {path: '/join/:pin?', name: 'join', props:true, component: JoinPage},
    {path: '/username', name: 'username', component: userNickNamePage},
    {path: '/roomHost', name: 'roomHost', component: TheRoomUser},
    {
        path: '/gameHost/:numberQuestion', props: (route) => {
            return {
                ...route.params, ...{numberQuestion: Number.parseInt(route.params.numberQuestion) || undefined}
            }
        }, name: 'game', component: GamePageHost
    },
    {path: '/roomClient', name: 'roomClient', component: TheRoomUsersClient},
    {path: '/gameClient', name: 'gameClient', component: GamePageClient,},
    {path: '/scoreTable', name: 'scoreTable', component: ScoreTablePage},
    {path: '/endGame', name: 'endGame', component: EndGamePage},
    {path: '/endRound', name: 'endRound', component: EndRoundPage},
    {path: '/test', name: 'testPage', component: TestPage},
    {path: '/:pathMatch(.*)*', name: "notFount", component: notFound},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;