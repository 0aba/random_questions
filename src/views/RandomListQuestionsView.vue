<script setup lang="ts">
import { useQuestionsStore } from "../store/questions/questions.ts";
import PaginationVue from "../components/PagginatorVue.vue";
import ShowQuestion from "../components/ShowQuestion.vue";
import { computed, nextTick, onMounted, ref } from "vue";

const refPagination = ref<InstanceType<typeof PaginationVue> | null>(null);
const questionsStore = useQuestionsStore();

interface IShowQuestion {
  id: string,
  userAnswer: string
}

const randomListQuestion = ref<Array<IShowQuestion>>([]);

const getCurrentViewQuestion = computed(() => {
  const indexCurrentElement = refPagination.value?.getCurrentPage;
  return indexCurrentElement === undefined ? -1 : indexCurrentElement - 1;
});

function shuffleArray(array: Array<any>) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function randomizeQuestion() {
  shuffleArray(randomListQuestion.value);
  nextTick(() => {
    refPagination.value?.goToFirstPage();
  });
}

onMounted(() => {
  questionsStore.questionsList.forEach(el => {
    randomListQuestion.value.push({id: el.id, userAnswer: ""});
  });
  shuffleArray(randomListQuestion.value);
});
</script>

<template>
  <div class="panel">
    <button class="panel-btn" @click="randomizeQuestion">Randomize the list</button>
  </div>

  <div class="show-question-container">
    <span v-if="getCurrentViewQuestion !== -1 && getCurrentViewQuestion >= 0 && getCurrentViewQuestion < randomListQuestion.length && randomListQuestion.length > 0">
      <ShowQuestion :question="questionsStore.getElementById(randomListQuestion[getCurrentViewQuestion].id).question"
                    :userExclamation="randomListQuestion[getCurrentViewQuestion].userAnswer"
                    :exclamation="questionsStore.getElementById(randomListQuestion[getCurrentViewQuestion].id).answer"
                    @updateUserExclamation="(newUserExclamation) => randomListQuestion[getCurrentViewQuestion].userAnswer = newUserExclamation"
      />
    </span>
  </div>
  <div class="pagination-container">
    <PaginationVue :amountElements="questionsStore.getLength"
                   :sizePage="1"
                   ref="refPagination"/>
  </div>
</template>

<style scoped>
.panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 5px 5px 5px;
  height: 5%;
}

.panel-btn {
  background: var(--elements-color);
  border-radius: 5px;
  width: 100%;
  height: 100%;
}

.show-question-container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 75%;
  padding: 3px 0 3px 0;
}

.show-question-container > span {
  width: 90%;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.pagination-container > * {
  width: 80%;
}
</style>