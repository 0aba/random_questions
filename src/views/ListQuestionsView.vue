<script setup lang="ts">
import ItemQuestionsList from "../components/ItemQuestionsList.vue";
import { useQuestionsStore } from "../store/questions/questions.ts"
import PaginationVue from "../components/PagginatorVue.vue";
import { computed, ref, nextTick } from "vue";
import { invoke } from "@tauri-apps/api/core";


const refPagination = ref<InstanceType<typeof PaginationVue> | null>(null);
const questionsStore = useQuestionsStore();

const getCurrentViewQuestion = computed(() => {
  const sliceCurrentPage = refPagination.value?.getSliceCurrentPage;

  if (sliceCurrentPage === undefined) { return []; }

  return questionsStore.getSliceElement(sliceCurrentPage[0], sliceCurrentPage[1]);
});

function addNewQuestion() {
  questionsStore.addNewQuestion("Enter the question", "Enter the answer");
  nextTick(() => {
    refPagination.value?.goToLastPage();
  });
}

async function importQuestions() {
  try {
    const jsonData: string = await invoke("import_file");
    const parsedData = JSON.parse(jsonData);

    if (questionsStore.isValidData(parsedData)) {
      questionsStore.questionsList = parsedData;
    }
  } catch (error) {
    console.error(error);
  }
}

async function exportQuestions() {
  try {
    await invoke("export_file", {jsonData: questionsStore.questionsList});
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div class="import-export-panel">
    <button class="import-export-btn" @click="importQuestions">Import question</button>
    <button class="import-export-btn" @click="exportQuestions">Export question</button>
  </div>
  <div class="list-question">
    <div class="questions">
      <span
          v-for="el of getCurrentViewQuestion"
          class="question">
        <ItemQuestionsList
            :answer="el.answer"
            :question="el.question"
            :key="el.id"
            @updateQuestion="(new_q) => questionsStore.changeQuestion(el.id, new_q, undefined)"
            @updateExclamation="(new_e) => questionsStore.changeQuestion(el.id, undefined, new_e)"
            @deleteQuestion="questionsStore.delQuestion(el.id)" />
      </span>
    </div>
    <button class="new-question-btn" @click="addNewQuestion">Add new question</button>
  </div>
  <div class="pagination-container">
      <PaginationVue :amountElements="questionsStore.getLength" :sizePage="5" ref="refPagination" />
  </div>
</template>

<style scoped>
.import-export-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 5px 5px 5px;
  height: 5%;
}

.import-export-btn {
  background: var(--elements-color);
  border-radius: 5px;
  width: 45%;
  height: 100%;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.pagination-container > div {
  width: 80%;
}

.list-question {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 70%;
}

.new-question-btn {
  width: 90%;
  height: 8%;
  background: var(--elements-color);
  border-radius: 5px;
}

.questions {
  width: 95%;
  height: 90%;
  margin: 3px 0 3px 0;
}

.question > * {
  width: 100%;
  height: 19%;
  margin: 0 0 3px 0;
}

</style>