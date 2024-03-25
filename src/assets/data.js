export const namesDaysWeek = [
    {
        ru: 'Пн',
        en: 'Mon'
    },
    {
        ru: 'Вт',
        en: 'Tue'
    },
    {
        ru: 'Ср',
        en: 'Wed'
    },
    {
        ru: 'Чт',
        en: 'Thu'
    },
    {
        ru: 'Пт',
        en: 'Fri'
    },
    {
        ru: 'Сб',
        en: 'Sat'
    },
    {
        ru: 'Вс',
        en: 'Sun'
    },
];

export const namesMonths = [{
    ru: 'Янв',
    en: 'Jan'
},
{
    ru: 'Фев',
    en: 'Feb'
},
{
    ru: 'Мар',
    en: 'Mar'
},
{
    ru: 'Апр',
    en: 'Apr'
},
{
    ru: 'Май',
    en: 'May'
},
{
    ru: 'Июнь',
    en: 'Jun'
},
{
    ru: 'Июль',
    en: 'Jul'
},
{
    ru: 'Авг',
    en: 'Aug'
},
{
    ru: 'Сен',
    en: 'Sep'
},
{
    ru: 'Окт',
    en: 'Oct'
},
{
    ru: 'Нояб',
    en: 'Nov'
},
{
    ru: 'Дек',
    en: 'Dec'
},];

const today = new Date();
const todayDate = today.getDate();
const todayMonth = today.getMonth();
const todayFullYear = today.getFullYear();
export const todayFullDate = `${todayFullYear}-${todayMonth}-${todayDate}`;