<script setup lang="ts">
import { ref, computed, watch } from "vue";

const props = defineProps({
  sizePage: { type: Number, required: true },
  amountElements: { type: Number, required: true }
});
const emit = defineEmits<{
  changePage: []
}>();

const currentPage = ref(1);

const totalPages = computed((): number => {
  return Math.ceil(props.amountElements / props.sizePage);
});

const pagesToShow = computed((): ReadonlyArray<number> => {
  const pages = [];
  const startPage = Math.max(1, currentPage.value - 2);
  const endPage = Math.min(totalPages.value, currentPage.value + 2);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (pages.length === 0) { pages.push(1); }

  return pages;
});

function goToPage(page: number): void {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    emit("changePage");
  }
}

const goToFirstPage = (): void => {
  currentPage.value = 1;
  emit("changePage");
};

const goToLastPage = (): void => {
  currentPage.value = totalPages.value;
  emit("changePage");
};

const getCurrentPage = computed((): number => currentPage.value);
const getSliceCurrentPage = computed((): readonly [number, number]  => {
  return [(currentPage.value - 1) * props.sizePage, Math.min(props.amountElements, currentPage.value * props.sizePage)];
});

watch(() => props.amountElements, (newValue) => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
  if (newValue === 0) {
    currentPage.value = 1;
  }
});

defineExpose({
  getCurrentPage,
  getSliceCurrentPage,
  goToFirstPage,
  goToLastPage
});
</script>

<template>
  <div class="paginator">
    <button @click="goToFirstPage"
            :disabled="currentPage === 1"><<</button>
    <span v-for="page in pagesToShow" :key="page" class="page-number">
      <button
          :class="{ active: page === currentPage }"
          @click="goToPage(page)">
        <span v-if="page === currentPage">X</span>
        <span v-else>{{ page }}</span>
      </button>
    </span>
    <button @click="goToLastPage"
            :disabled="currentPage === totalPages || totalPages === 0">>></button>
  </div>
</template>

<style scoped>

.paginator {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.paginator > * {
  flex: 1;
}

.page-number {
  margin: 0 5px;
}

button {
  cursor: pointer;
  background: var(--elements-color);
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.active {
  cursor: not-allowed;
  font-weight: bold;
  color: rgb(72, 72, 72);
}
</style>