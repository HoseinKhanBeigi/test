import React from "react";
import {
    autoUpdate as floatingUiAutoUpdate,
    flip,
    shift,
    useFloating,
  } from "@floating-ui/react-dom";
  import { Calendar } from "../calender";
  import { useClickOutside } from "@mantine/hooks";
  import { format } from "date-fns-jalali";
  import moment from "moment"
  import { convertDigits } from "persian-helpers";
  import { useEffect, useState } from "react";

  

  export const DatePicker = ({
    autoUpdate,
    calendarProps,
    onChange,
    handleChange,
    defaultDate,
    dateFormat = "yyyy/MM/dd",
    date: controlledDate,
    persianDigits,
    ...props
  }) => {
    const { x, y, reference, floating, strategy } = useFloating({
      placement: "bottom-end",
      strategy: "absolute",
      middleware: [flip(), shift({ crossAxis: true })],
      whileElementsMounted: floatingUiAutoUpdate,
    });
  
    const [date, setDate] = useState(defaultDate || controlledDate);
  
    const [isOpen, setIsOpen] = useState(false);
  
    const [inputRef, setInputRef] = useState(null);
    const [calendarRef, setCalendarRef] = useState(null);
  
    useClickOutside(() => setIsOpen(false), null, [calendarRef, inputRef]);
  
    const updateDateHandler = (newDate) => {
      if (!controlledDate) setDate(newDate);
      handleChange?.(newDate);
      
      onChange?.(newDate);
    };
  
    const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => setIsMounted(true), []);
  
    useEffect(() => {
      if (!isMounted) return;
      setDate(controlledDate);
    }, [controlledDate]);
  
    return (
      <>
        {/* <div ref={setInputRef}>
          <input
            ref={reference}
            className="p-2 rounded-md border border-gray-300"
            value={
              date
                ? convertDigits(format(date, dateFormat), {
                    to: persianDigits ? "fa" : "en",
                  })
                : ""
            }
            readOnly
            onClick={(event) => {
              setIsOpen((previousIsOpen) =>
                previousIsOpen === false ? true : previousIsOpen
              );
              props.onClick?.(event);
            }}
            {...props}
          />
        </div> */}

        
    
          <Calendar
            activeDate={date}
            onChange={(newDate) =>  updateDateHandler(newDate)}
            ref={(el) => {
              floating(el);
              setCalendarRef(el);
            }}
            style={{
              //@ts-ignore
            
            }}
            showFooter
            // onConfirm={(newDate) => {
            //   updateDateHandler(newDate);
            //   setIsOpen(false);
            // }}
            // onCancel={() => setIsOpen(false)}
            {...calendarProps}
          />

      </>
    );
  };
  