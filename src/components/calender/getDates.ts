import {
  addDays,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  isToday,
} from "date-fns-jalali";

import { format } from "date-fns-jalali";
import moment from "moment";

function getRandomInt(max: any) {
  return Math.floor(Math.random() * max);
}

export const getDates = (activeDate: Date) => {
  console.log(activeDate);

  const startOfTheSelectedMonth = startOfMonth(activeDate);
  const endOfTheSelectedMonth = endOfMonth(activeDate);
  const startDate = startOfWeek(startOfTheSelectedMonth);
  const endDate = endOfWeek(endOfTheSelectedMonth);
  const days: any = [];
  let currentDate = startDate;
  let count = 0;

  while (currentDate <= endDate) {
    count += 1;
    days.push({
      count: 0,
      day: currentDate,
      status: isToday(currentDate) ? true : false,
      id: count,
      colors: [],
    });

    currentDate = addDays(currentDate, 1);
  }

  return {
    days: days,
    startOfTheSelectedMonth: startOfTheSelectedMonth,
    endOfTheSelectedMonth: endOfTheSelectedMonth,
    startDate: startDate,
    endDate: endDate,
  };
};
