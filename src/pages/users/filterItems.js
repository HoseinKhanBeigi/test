export const initialTabs = [
    {
      inputType: "TABS",
      key: "level",
      values: [
        { checked: true, name: "all", background: "#E5FFF6", color: "#017874" },
        {
          checked: false,
          name: "RM1",
          background: "#E5FFF6",
          color: "#017874",
        },
        {
          checked: false,
          name: "RM2",
          background: "#E5FFF6",
          color: "#017874",
        },
        {
          checked: false,
          name: "RM3",
          background: "#E5FFF6",
          color: "#017874",
        },
        {
          checked: false,
          name: "RM4",
          background: "#E5FFF6",
          color: "#017874",
        },
        {
          checked: false,
          name: "RM5",
          background: "#E5FFF6",
          color: "#017874",
        },
        {
          checked: false,
          name: "RM6",
          background: "#E5FFF6",
          color: "#017874",
        },
        {
          checked: false,
          name: "RM7",
          background: "#E5FFF6",
          color: "#017874",
        },
      ],
    },
  ];
 export const initialDrops = [
    {
      open: false,
      title: "userType",
      inputType: "RADIO",

      values: [
        { name: "بازاریاب", checked: false, key: "type" },
        { name: "بازاریاب ارشد", checked: false, key: "type" },
      ],
    },
    {
      open: false,
      title: "organization",
      inputType: "CHECKBOX",

      values: [
        { name: "شعبه", checked: false, key: "organizations" },
        { name: "ستاد", checked: false, key: "organizations" },
        { name: "شرکت های فرعی", checked: false, key: "organizations" },
        { name: "نمایندگی", checked: false, key: "organizations" },
        { name: "سایر", checked: false, key: "organizations" },
      ],
    },
  ];