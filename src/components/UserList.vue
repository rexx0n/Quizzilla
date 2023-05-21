<template>
    <div class="users" v-for="user in users" :key="user.id">
        <p>{{user.name}} {{user.score}}</p>
    </div>
</template>

<script>
import {reactive} from "vue";
export default {
    name: "UserList",
    setup() {
        let users = reactive([
            {
                id:1,
                name:'rexxon',
                score:100,
            },
            {
                id:2,
                name:'kalex',
                score:100,
            },
            {
                id:3,
                name:'dethrone',
                score:100,
            },
        ])

        // виділення стану до шаблону
        return {
            users
        }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.users {
    max-width: 500px;
    margin: auto;
    padding-left: 10px;
    display: flex;
    border: 1px solid white;
    border-radius: 5px;
    margin-bottom: 10px;
}
p {
    color: white;
}
</style>
