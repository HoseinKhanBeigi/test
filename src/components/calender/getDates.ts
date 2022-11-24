import {
  addDays,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns-jalali";

function getRandomInt(max:any) {
  return Math.floor(Math.random() * max);
}

export const getDates = (activeDate: Date) => {
  const startOfTheSelectedMonth = startOfMonth(activeDate);
  const endOfTheSelectedMonth = endOfMonth(activeDate);
  const startDate = startOfWeek(startOfTheSelectedMonth);
  const endDate = endOfWeek(endOfTheSelectedMonth);

  let currentDate = startDate;

  const days: any = [];

  while (currentDate <= endDate) {
    days.push({count:getRandomInt(3),day:currentDate});
    currentDate = addDays(currentDate, 1);
  }

  return days;
};
