<template>
    <div>
        <h1>Победители</h1>
        <div class="leaders">
            <span class="leader first">1 место username</span>
            <div>
                <span class="leader second">2 место username</span>
                <span class="leader third">3 место username</span>
            </div>
        </div>
        <h1>Лузеры</h1>
        <UserList></UserList>
        <MyButton @click="toStart">
            Начать заново
        </MyButton>
    </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter()


function toStart() {
    router.push({
        name:'roomHost'
    })
}
</script>

<style scoped>
.leaders {
    gap: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.leaders > div {
    display: flex;
    gap: 40px;
}
.leader {
    padding: 15px 20px;
}
.first {
    background: #e6c619f2;
}
.second {
    background: silver;
}
.third {
    background: #cd7f32;
}
span {
    color: white;
    font-size: 20px;
}
</style>