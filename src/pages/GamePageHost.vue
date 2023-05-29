<template>
  <div>
      <div>
          <div class="progress">
              <div class="progress--green">

              </div>
          </div>
      </div>
      <div>
          <h1>Вопрос</h1>
          <h1>{{$route.params.numberQuestion}}</h1>
          <AnswerButtons/>
          <MyButton>Следующий вопрос</MyButton>
      </div>

  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
const router = useRouter()
import {useQuizHost} from "@/composible/useQuizHost";
const {startRound} = useQuizHost()
const props = defineProps(['param'])
onMounted(()=> {
    startRound(props.num)
})
</script>

<style scoped>
progress {

}
.progress {
    background: gray;
    height: 5px;
    width: 500px;
    margin: auto;
}
.progress--green {
    height: 5px;
    transition:  all 6s ease-out;
    background: green;
}
</style>