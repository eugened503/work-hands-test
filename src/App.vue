<template>
  <div class="calendar-wrapper">
    <CustomCalendar @get-current-date="getCurrentDate" date="2024-01-10" :locale="locale" />
    <div class="control">
      <p class="control__date">{{ correctionDate }}</p>
      <div class="control__buttons">
        <button type="button" class="control__button" @click="localeRu">RU</button>
        <button type="button" class="control__button" @click="localeEn">EN</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import CustomCalendar from './components/CustomCalendar.vue';
import { namesMonths } from './assets/data.js';
import { splitDate } from './helpers/helpers.js';

const selectDate = ref('');
const correctionDate = ref('');
const locale = ref('en');

const getCurrentDate = (date) => {
  selectDate.value = date;
  getCorrectionDate();
};

const getCorrectionDate = () => {
  const [year, month, day] = splitDate(selectDate.value);
  const dateStr = `${Number(day)} ${namesMonths[Number(month)][locale.value]} ${year}`;
  correctionDate.value = dateStr;
};

const localeEn = () => {
  locale.value = 'en';
};

const localeRu = () => {
  locale.value = 'ru';
};

watch(locale, (newLocale) => {
  if (newLocale) {
    getCorrectionDate();
  }
});
</script>

<style scoped>
.calendar-wrapper {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  padding: 10px;
  width: 100%;
}

.control {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 350px;
  width: calc(50% - 10px);
}

.control__date {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 25px;
  border: 1px solid gray;
}

.control__buttons {
  display: flex;
  gap: 10px;
}

.control__button {
  padding: 5px;
}
</style>