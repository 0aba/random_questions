<script setup lang="ts">
import exclamationMark from "../assets/images/exclamation-mark.svg";
import questionMark from "../assets/images/question-mark.svg";
import deleteMark from "../assets/images/trash-mark.svg";
import { ref } from "vue";

const props = defineProps({
  question: { type: String, required: true },
  exclamation: { type: String, required: true }
});
const emit = defineEmits<{
  updateQuestion: [string],
  updateExclamation: [string],
  deleteQuestion: []
}>();

const question = ref(props.question);
const exclamation = ref(props.exclamation);
</script>

<template>
  <div class="item">
    <div class="item-questions">
      <div class="question-container">
        <img :src="questionMark" alt="Question Mark" class="img-svg" />
        <input
            type="text"
            v-model="question"
            @input="emit('updateQuestion', question)"
        />
      </div>
      <div class="answer-container">
        <img :src="exclamationMark" alt="Exclamation Mark" class="img-svg" />
        <input
            type="text"
            v-model="exclamation"
            @input="emit('updateExclamation', exclamation)"
        />
      </div>
    </div>
    <button class="delete-btn" @click="emit('deleteQuestion')">
      <img :src="deleteMark" alt="Delete" class="img-svg" />
    </button>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}

.item-questions {
  display: flex;
  flex-direction: column;
  background: var(--elements-color);
  border: 1px solid;
  border-radius: 5px;
  height: 100%;
  width: 90%;
}

.delete-btn {
  height: 100%;
  width: 8%;
  background: var(--elements-color);
  border-radius: 5px;
  margin: 0 0 0 3px;
}


.delete-btn > img {
  height: 100%;
  width: 100%;
}

.question-container,
.answer-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50%;
  padding: 5px;
  box-sizing: border-box;
}

.question-container {
  border-bottom: 1px solid;
}

.img-svg {
  width: 8%;
  height: auto;
  margin-right: 5%;
}

input {
  width: 90%;
  height: 50%;
  padding: 5px;
  box-sizing: border-box;
}
</style>