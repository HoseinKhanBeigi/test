import { count } from "console";
import {
  getDate,
  isFriday,
  isSameDay,
  isSameMonth,
  isToday,
} from "date-fns-jalali";
import { PointCount } from "../icons";
import { convertDigits } from "persian-helpers";
import React from "react";
import { useMemo } from "react";
import { getDates } from "./getDates";

interface IMainBodyProps {
  minDate?: Date;
  maxDate?: Date;
  onActiveDayChange: (newDay: Date) => void;
  selectedDate: Date;
  activeDate: Date;
  disabledDates?: Date[];
  highlightToday?: boolean;
  showFridaysAsRed?: boolean;
}

const circle = (count: any) => {
  if (count !== 0) {
    for (let i = 0; i < count; i++) {
     return <PointCount />;
    }
  }
};


const daysOfTheWeek = [
  "شنبه",
  "یک‌شنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهار‌شنبه",
  "پنج‌شنبه",
  "جمعه",
];


const MainBody = ({
  maxDate,
  minDate,
  onActiveDayChange,
  highlightToday,
  disabledDates,
  activeDate,
  selectedDate,
  showFridaysAsRed,
}: IMainBodyProps) => {
  const selectedDateDays = useMemo(
    () => getDates(selectedDate),
    [selectedDate]
  );

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-around",background:"#EFF3F3" }}>
        {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((day, index) => (
          <h2
            key={day}
            aria-label={daysOfTheWeek[index]}
            title={daysOfTheWeek[index]}
          >
            {day}
          </h2>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto auto auto",
          justifyContent: "space-around",
          
        }}
      >
        {selectedDateDays.map((day: any, index: any) => {
          const isDateInvalid =
            (minDate && day < minDate) ||
            (maxDate && day > maxDate) ||
            disabledDates?.includes(day);

          return (
            <button
              disabled={isDateInvalid}
              onClick={onActiveDayChange.bind(this, day.day)}
              key={day.day.toString()}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "8px 0px",
                width: "38px",
                height: "52px",
                background: "#ffffff",
                border: "0.5px dashed #ffffff",
                borderRadius: "4px",
                flexFlow: "column wrap",
              }}
            >
              <span>{getDate(day.day)}</span>
              <div style={{display:"flex", width:"100%", gap:"2px", justifyContent:"center"}}>
              {day.count !== 0 && new Array(day.count).fill(1).map((_,i)=>{
                return <PointCount key={i}/>
              })}
              </div>

            </button>
          );
        })}
      </div>
    </>
  );
};

export default MainBody;
