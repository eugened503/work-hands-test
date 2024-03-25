<template>
    <div class="calendar">
        <div class="calendar__header">
            <button type="button" class="calendar__header-button rotate-left" @click="prevMonth">
                <TriangleSvg />
            </button>
            <p><span>{{ namesMonths[currentMonth][locale] }}</span> <span>{{ currentYear }}</span></p>
            <button type="button" class="calendar__header-button rotate-right" @click="nextMonth">
                <TriangleSvg />
            </button>
        </div>
        <div class="calendar__body">
            <div class="calendar__weel">
                <div class="calendar__weel-day" v-for="weelDay in namesDaysWeek">
                    {{ weelDay[locale] }}
                </div>
            </div>
            <div class="calendar__month">
                <button type="button" class="calendar__month-day"
                    :class="{ 'select': getSelectDate(monthDay), 'not-current-month': monthDay.month !== currentMonth }"
                    v-for="monthDay in currentGridRef" @click="getCurrentDate(monthDay)">
                    {{ monthDay.day }}
                </button>
            </div>
        </div>
    </div>
</template>


<script setup>
import TriangleSvg from './TriangleSvg.vue';
import { ref, toRef, reactive, onMounted, watch } from 'vue';
import { namesDaysWeek, namesMonths, todayFullDate } from '../assets/data.js';
import { splitDate } from '../helpers/helpers.js';

const props = defineProps({
    date: String,
    locale: String,
});
const emit = defineEmits(['getCurrentDate']);

// данные
const numberCells = 42;
const [year, month, day] = splitDate(props.date) || splitDate(todayFullDate);
const currentDate = reactive({ day: Number(day), month: Number(month), year: Number(year) });
const currentDateRef = toRef(currentDate);
const currentMonth = ref(currentDateRef.value.month);
const currentYear = ref(currentDateRef.value.year);
const currentGrid = reactive([]);
const currentGridRef = toRef(currentGrid);

// методы
const nextMonth = () => {
    if (currentMonth.value === 11) {
        currentMonth.value = 0;
        currentYear.value = currentYear.value + 1;
    } else {
        currentMonth.value = currentMonth.value + 1;
    }
};

const prevMonth = () => {
    if (currentMonth.value === 0) {
        currentMonth.value = 11;
        currentYear.value = currentYear.value - 1;
    } else {
        currentMonth.value = currentMonth.value - 1;
    }
};

const createDaysArray = (firstDay, lastDay, month, year) => {
    const week = [];

    for (firstDay; firstDay <= lastDay; firstDay++) {
        const element = {
            day: firstDay,
            month,
            year,
        };

        week.push(element);
    }

    return week;
};

const getSelectDate = (date) => {
    return JSON.stringify(currentDateRef.value) === JSON.stringify(date);
};

const drawMonth = (year, month) => {
    // прошлый год
    const lastYear = month === 0 ? year - 1 : year;
    // прошлый месяц
    const lastMonth = month === 0 ? 11 : month - 1;
    // будущий год
    const newYear = month === 11 ? year + 1 : year;
    // будущий месяц
    const newMonth = month === 11 ? 0 : month + 1;

    // первый день недели тек. месяца
    const firstDayCurrentMonth = new Date(year, month, 7).getDay();
    // посл. день тек. месяца
    const lastDayCurrentMonth = new Date(year, month + 1, 0).getDate();
    // посл. день прошлого месяца
    const lastDayLastMonth = month === 0 ? 31 : new Date(year, month, 0).getDate();

    // текущая неделя
    const currentWeek = createDaysArray(1, lastDayCurrentMonth, month, year);
    // прошлая неделя
    const diffLastWeek = lastDayLastMonth - firstDayCurrentMonth + 1;
    const lastWeek = createDaysArray(diffLastWeek, lastDayLastMonth, lastMonth, lastYear);
    // будущая неделя
    const diffNewWeek = numberCells - (currentWeek.length + lastWeek.length);
    const newWeek = createDaysArray(1, diffNewWeek, newMonth, newYear);

    currentGridRef.value = [...lastWeek, ...currentWeek, ...newWeek];
};

const getCurrentDate = (date) => {
    const dateStr = `${date.year}-${date.month}-${date.day}`;
    currentDateRef.value = date;
    emit('getCurrentDate', dateStr);
};

// хуки
onMounted(() => {
    drawMonth(currentYear.value, currentMonth.value);
    getCurrentDate(currentDateRef.value);
});

// наблюдатели
watch([currentYear, currentMonth], ([newCurrentYear, newCurrentMonth]) => {
    drawMonth(newCurrentYear, newCurrentMonth);
});
</script>

<style scoped>
.calendar {
    max-width: 316px;
    border: 1px solid gray;
    padding: 12px;
}

.calendar__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.calendar__header-button {
    border: none;
    background-color: transparent;
    width: 10px;
    height: 10px;
}

.calendar__body {
    margin: 30px 0 0;
}

.calendar__weel {
    display: flex;
    justify-content: space-between;
}

.calendar__month {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(5, 1fr);
}

.calendar__month-day {
    border: none;
    background-color: transparent;
    padding: 13px;
    border: 1px transparent solid;
}

.rotate-left {
    transform: rotate(-90deg);
}

.rotate-right {
    transform: rotate(90deg);
}

.select {
    border: 1px #44bbdd solid;
}

.not-current-month {
    opacity: 0.5;
}
</style>