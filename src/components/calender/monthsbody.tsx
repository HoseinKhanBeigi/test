import { getMonth } from "date-fns-jalali";
import React from "react";

interface IMonthsBodyProps {
  onChangeMonth: (month: number) => void;
  months: string[];
  selectedDate: Date;
}
const MonthsBody = ({
  onChangeMonth,
  months,
  selectedDate,
}: IMonthsBodyProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {months.map((month, index) => (
        <button
          onClick={() => onChangeMonth(index)}
          key={month}
        //   style={{
        //     backgroundColor:
        //       index === getMonth(selectedDate)
        //         ? themeClasses.daysSelectedBackgroundColor
        //         : themeClasses.daysBackgroundColor,
        //     color:
        //       index === getMonth(selectedDate)
        //         ? themeClasses.daysSelectedColor
        //         : themeClasses.daysColor,
        //   }}
        >
          {month}
        </button>
      ))}
    </div>
  );
};

export default MonthsBody;
