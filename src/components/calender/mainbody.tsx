import { count } from "console";
import {
  getDate,
  isFriday,
  isSameDay,
  isSameMonth,
  isToday,
} from "date-fns-jalali";
import { format } from "date-fns-jalali";
import { useEffect, useReducer } from "react";
import { PointCount } from "../icons";
import { convertDigits } from "persian-helpers";
import React, { useState } from "react";
import { useMemo } from "react";
import { getDates } from "./getDates";

interface IMainBodyProps {
  minDate?: Date;
  maxDate?: Date;
  items: any;
  dispatchAction: any;
  onActiveDayChange: (newDay: Date) => void;
  previousMonthHandler: () => void;
  entities: any;
  selectedDate: Date;
  choseDate: boolean;
  status: string;
  activeDate: Date;
  disabledDates?: Date[];
  handleGetMeeting?: any;
  highlightToday?: boolean;
  showFridaysAsRed?: boolean;
}

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
  items,
  onActiveDayChange,
  dispatchAction,
  handleGetMeeting,
  selectedDate,
  status,
}: IMainBodyProps) => {
  const selectedDateDays = useMemo(
    () => getDates(selectedDate),
    [selectedDate]
  );

  const handleClick = (day: any) => {
    handleGetMeeting(day);
    onActiveDayChange.bind(this, day.day);
    dispatchAction({ type: "DAYS", status: day });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          background: "#EFF3F3",
          color: "#017874",
          padding: "6px",
        }}
      >
        {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((day, index) => (
          <h4
            key={day}
            aria-label={daysOfTheWeek[index]}
            title={daysOfTheWeek[index]}
          >
            {day}
          </h4>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
          justifyContent: "space-around",
          gridTemplateRows: "1fr 1fr 1fr 1fr 1fr",
          justifyItems: "center",
          padding: "6px",
        }}
      >
        {items.map((day: any, index: any) => {
          console.log(day.colors.length > 0 && day.colors);
          return (
            <button
              // disabled={isDateInvalid}
              onClick={() => handleClick(day)}
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "8px 0px",
                width: "38px",
                height: "52px",
                background: !day.status ? "#ffffff" : "#FDF2F8",
                border: `0.5px dashed ${!day.status ? "#ffffff" : "#DB2777"} `,
                borderRadius: "4px",
                flexFlow: "column wrap",
              }}
            >
              <span
                style={{
                  color:
                    format(
                      new Date(selectedDateDays.startOfTheSelectedMonth),
                      "yyyy/MM/dd"
                    ) <= format(new Date(day.day), "yyyy/MM/dd") &&
                    format(
                      new Date(selectedDateDays.endOfTheSelectedMonth),
                      "yyyy/MM/dd"
                    ) >= format(new Date(day.day), "yyyy/MM/dd")
                      ? "black"
                      : "silver",
                }}
              >
                {convertDigits(getDate(day.day))}
              </span>

              <div
                style={{
                  display: "flex",
                  width: "100%",
                  gap: "2px",
                  justifyContent: "center",
                  paddingBottom:
                    day.count !== 0 && day?.colors.length > 0 ? 0 : "6px",
                }}
              >
                {day.count !== 0 &&
                  day?.colors.length > 0 &&
                  day.colors?.map((e: any, i: any) => {
                    return (
                      <PointCount
                        fill={
                          format(
                            new Date(selectedDateDays.startOfTheSelectedMonth),
                            "yyyy/MM/dd"
                          ) <= format(new Date(day.day), "yyyy/MM/dd") &&
                          format(
                            new Date(selectedDateDays.endOfTheSelectedMonth),
                            "yyyy/MM/dd"
                          ) >= format(new Date(day.day), "yyyy/MM/dd")
                            ? e
                            : "silver"
                        }
                        key={i}
                      />
                    );
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
