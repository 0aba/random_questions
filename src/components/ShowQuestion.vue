<script setup lang="ts">
import exclamationMark from "../assets/images/exclamation-mark.svg";
import formAnswerMark from "../assets/images/form-answer-mark.svg";
import questionMark from "../assets/images/question-mark.svg";
import {ref} from "vue";


const props = defineProps({
  question: { type: String, required: true },
  userExclamation: { type: String, required: true },
  exclamation: { type: String, required: true }
});
const emit = defineEmits<{
  updateUserExclamation: [string]
}>();

const answerIsView = ref(false);

function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  const newValue = target.value;
  emit("updateUserExclamation", newValue);
}

</script>

<template>
  <div class="container">
    <div class="question-block">
      <img :src="questionMark" alt="Question" class="img-svg" />
      <textarea :value="question" readonly />
    </div>

    <div class="answer-block">
      <img :src="formAnswerMark" alt="Answer user" class="img-svg" />
      <textarea :value="props.userExclamation" @input="onInput" />
    </div>

    <div class="correct-answer-block">
      <img :src="exclamationMark" alt="Correct answer" class="img-svg" />
      <textarea
          :value="answerIsView ? props.exclamation : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
                                                     'Morbi purus dui, gravida ac purus accumsan, varius tempor lorem. ' +
                                                     'Nullam fringilla dignissim velit, nec posuere nibh luctus sit amet.'"
          @click="answerIsView = !answerIsView"
          @mouseleave="answerIsView = false"
          :class="{ 'blurred': !answerIsView }"
          readonly />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: var(--elements-color);
  border: 1px solid;
  border-radius: 5px;
}

.question-block,
.answer-block,
.correct-answer-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 30%;
}

.question-block > textarea,
.correct-answer-block > textarea {
  cursor: default;
}

textarea {
  flex-grow: 1;
  width: 100%;
  height: 90%;
  resize: none;
  overflow: auto;
  border: none;
  box-sizing: border-box;
  border-radius: 5px;
}

.img-svg {
  height: 20%;
}

.blurred {
  filter: blur(5px);
  transition: filter 0.3s;
}

textarea {
  transition: filter 0.3s;
}


</style>