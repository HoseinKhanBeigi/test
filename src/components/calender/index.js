import { IconChevronLeft, IconChevronRight } from "@tabler/icons";

import {
  addMonths,
  format,
  getMonth,
  setMonth,
  setYear,
  subMonths,
} from "date-fns-jalali";
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { convertDigits } from "persian-helpers";
import React from "react";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { useReducer } from "react";
import Footer from "./footer";
import Header from "./header";
import MainBody from "./mainbody";
import MonthsBody from "./monthsbody";
import { getDates } from "./getDates";
import YearsBody from "./yearsbody";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { interactions } from "../../actions/interactions";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { OptionIcone } from "../icons";

const FadeTransition = ({ children, bodyTransition, ...rest }) => (
  <Transition {...rest}></Transition>
);

const getInitialDate = (defaultActiveDate, propActiveDate, minDate) => {
  if (defaultActiveDate) return defaultActiveDate;
  if (propActiveDate) return propActiveDate;
  if (minDate) {
    let clonedMin = new Date(minDate);
    while (clonedMin <= minDate) {
      clonedMin.setDate(clonedMin.getDate() + 1);
    }
    return clonedMin;
  }
  return new Date();
};

export const Calendar = forwardRef(
  (
    {
      highlightToday = true,
      onChange,
      handleGetMeeting,
      activeDate: propActiveDate,
      theme = "light",
      showGoToToday = true,
      defaultActiveDate,
      entitiesDashboard,
      minDate,
      maxDate,
      showFooter = false,
      disabledDates,
      disableTransitions,
      bodyTransition = "zoomIn",
      style,
      showFridaysAsRed = true,
      months = [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند",
      ],
      onCancel,
      onConfirm,
    },
    ref
  ) => {
    const [activeDate, setActiveDate] = useState(
      getInitialDate(defaultActiveDate, propActiveDate, minDate)
    );
    const [selectedDate, setSelectedDate] = useState(activeDate);
    const [activeBody, setActiveBody] = useState("main");

    const [choseDate, setDate] = useState(false);

    useEffect(() => {
      if (propActiveDate) setActiveDate(activeDate);
    }, [propActiveDate]);

    const goToTodayHandler = () => {
      setActiveDate(new Date());
    };

    const activeDayChangeHandler = (day) => {
      setActiveDate(day);
      setDate(true);
    };

    const nextMonthHandler = (date) => {
      setSelectedDate((previousDate) => addMonths(previousDate, 1));
      dispatchAction({ type: "ALL" });
      dispatchAction({ type: "COUNT" });
    };

    const previousMonthHandler = (date) => {
      setSelectedDate((previousDate) => subMonths(previousDate, 1));
      dispatchAction({ type: "ALL" });
      dispatchAction({ type: "COUNT" });
    };

    const monthChangeHandler = (month) => {
      setSelectedDate((previousDate) => setMonth(previousDate, month));
    };

    const yearChangeHandler = (year) => {
      setSelectedDate((previousDate) => setYear(previousDate, year));
    };

    const cycleThroughBodies = () => {
      if (activeBody === "main") return setActiveBody("months");
      if (activeBody === "months") return setActiveBody("years");
      return setActiveBody("main");
    };

    const goToPreviousBody = () => {
      if (activeBody === "years") return setActiveBody("months");
      setActiveBody("main");
    };

    useEffect(() => {
      setSelectedDate(activeDate);
      onChange?.(activeDate);
    }, [activeDate]);

    useEffect(() => {
      goToPreviousBody();
    }, [selectedDate]);

    const compareMinDate = () => {
      if (!minDate) return false;
      const minDateClone = new Date(minDate);
      const now = new Date();
      minDateClone.setHours(0, 0, 0);
      now.setHours(0, 0, 0);
      return now > minDate;
    };

    const selectedDateDays = useMemo(
      () => getDates(selectedDate),
      [selectedDate]
    );

    const { status, entities, error } = useSelector(
      (state) => state.interactionSlice
    );

    const colors = ["#F6541E", "#2563EB", "#FF2020", "#000000", "#5041BC"];

    const reducer = (state, action) => {
      switch (action.type) {
        case "DAYS":
          return state.map((item) => {
            if (item.id === action.status.id) {
              return { ...item, status: !item.status };
            } else {
              return { ...item, status: false };
            }
          });
        case "COUNT":
          return state.map((item) => {
            const colorsCount = [];

            const find =
              status === "succeeded" &&
              entities?.data?.calendar?.find((e) => {
                if (
                  moment(item.day).locale("en").format("YYYY-MM-DD") ===
                  moment(e.date).locale("en").format("YYYY-MM-DD")
                ) {
                  return e.count;
                } else {
                  return 0;
                }
              });

            // if (status === "succeeded" && find) {
            //   for (let i = 0; i < find.count; i++) {
            //     colorsCount.push(colors[Math.floor(Math.random() * 5)]);
            //   }
            // }

            return {
              ...item,
              count: find ? find : 0,
              // colors: find ? colorsCount : [],
            };
          });

        case "ALL":
          return (state = selectedDateDays.days).map((item) => {
            const colorsCount = [];

            const find =
              status === "succeeded" &&
              entities?.data?.calendar?.find((e) => {
                if (
                  moment(item.day).locale("en").format("YYYY-MM-DD") ===
                  moment(e.date).locale("en").format("YYYY-MM-DD")
                ) {
                  return e.count;
                } else {
                  return 0;
                }
              });

            if (status === "succeeded" && find) {
              for (let i = 0; i < find.count; i++) {
                colorsCount.push(colors[Math.floor(Math.random() * 5)]);
              }
            }

            return {
              ...item,
              count: find ? find : 0,
              colors: find ? colorsCount : [],
            };
          });
        default:
          return state;
      }
    };

    const [items, dispatchAction] = useReducer(reducer, selectedDateDays.days);

    const dispatch = useDispatch();

    useEffect(() => {
      const lastDayOfCalendar = moment(selectedDateDays.endDate)
        .locale("en")
        .format("YYYY-MM-DD");
      const result = {
        calendar_start_date: lastDayOfCalendar,
      };
      const permissionInterAction =
        entitiesDashboard?.data?.user.permissions.some(
          (e) => e.name === "interaction"
        );
      if (permissionInterAction) {
        dispatch(interactions(result)).then((e) => {
          dispatchAction({ type: "COUNT" });
          dispatchAction({ type: "ALL" });
        });
      }
    }, [selectedDateDays.endDate]);

    useEffect(() => {
      if (months.length !== 12)
        throw new Error("طول آرایه ماه های وارد شده، می بایست 12 باشد.");
    }, [months]);

    const handlePre = () => {
      previousMonthHandler(selectedDateDays.endDate);
    };

    const Body = useMemo(() => {
      return activeBody === "main" ? (
        <MainBody
          activeDate={activeDate}
          disabledDates={disabledDates}
          highlightToday={highlightToday}
          maxDate={maxDate}
          minDate={minDate}
          items={items}
          status={status}
          entities={entities?.data?.calendar}
          dispatchAction={dispatchAction}
          onActiveDayChange={activeDayChangeHandler}
          handleGetMeeting={handleGetMeeting}
          choseDate={choseDate}
          selectedDate={selectedDate}
          showFridaysAsRed={showFridaysAsRed}
        />
      ) : activeBody === "months" ? (
        <MonthsBody
          onChangeMonth={monthChangeHandler}
          selectedDate={selectedDate}
          months={months}
        />
      ) : (
        <YearsBody
          onChangeYear={yearChangeHandler}
          activeDate={activeDate}
          selectedDate={selectedDate}
        />
      );
    }, [
      activeBody,
      activeDate,
      disabledDates,
      highlightToday,
      maxDate,
      minDate,
      activeDayChangeHandler,
      selectedDate,
    ]);
    return (
      <div
        ref={ref}
        style={style}
        className="flex flex-col rounded-md shadow-lg font-vazirmatn max-w-[22rem] overflow-hidden"
        dir="rtl"
      >
        {/* <Header
          activeDate={activeDate}
          selectedDate={selectedDate}
          onGoToToday={goToTodayHandler}
          showGoToToday={minDate ? compareMinDate() : showGoToToday}
          months={months}
          
        /> */}
        <Grid container justifyContent={"space-between"} alignItems="center" mb={2}>
          <Typography color={"gray"}>{"تقویم"}</Typography>
          <IconButton
            aria-label="menu"
            // onClick={(e) => handleFilterMenu(e, row.id)}
          >
            <OptionIcone />
          </IconButton>
        </Grid>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom:"16px"
            }}
          >
            <button
              onClick={handlePre}
              style={{
                display: "flex",
                background: "rgb(255, 255, 255)",
                border: "0.5px dashed rgb(255, 255, 255)",
              }}
            >
              <IconChevronRight className="w-4 h-4" color="gray" />
            </button>
            <button
              className="text-base"
              onClick={cycleThroughBodies}
              style={{
                color: "#F6541E",
                background: "rgb(255, 255, 255)",
                border: "0.5px dashed rgb(255, 255, 255)",
            
              }}
            >
              {activeBody === "main" && months[getMonth(selectedDate)]}{" "}
              {convertDigits(format(selectedDate, "yyyy"))}
            </button>
            <button
              onClick={() => nextMonthHandler(selectedDateDays.endDate)}
              style={{
                display: "flex",
                background: "rgb(255, 255, 255)",
                border: "0.5px dashed rgb(255, 255, 255)",
              }}
            >
              <IconChevronLeft className="w-4 h-4" color="gray" />
            </button>
          </div>

          <div className="relative">{Body}</div>
        </div>
      </div>
    );
  }
);
