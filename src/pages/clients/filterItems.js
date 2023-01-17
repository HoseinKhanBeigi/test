export const initialTabs = [
    {
      inputType: "TABS",
      key: "user",
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
      title: "clientType",
      inputType: "RADIO",

      values: [
        { name: "حقیقی", checked: false, key: "type" },
        { name: "حقوقی", checked: false, key: "type" },
      ],
    },

    {
      open: false,
      title: "gender",
      inputType: "RADIO",

      values: [
        { name: "آقا", checked: false, key: "gender" },
        { name: "خانم", checked: false, key: "gender" },
      ],
    },
    {
      open: false,
      title: "bi_point",
      inputType: "CHECKBOX",

      values: [
        { name: 'A*', checked: false, key: "bi_point" },
        { name: 'A+', checked: false, key: "bi_point" },
        { name: 'A', checked: false, key: "bi_point" },
        { name: 'B+', checked: false, key: "bi_point" },
        { name: 'B', checked: false, key: "bi_point" },
        { name: 'C', checked: false, key: "bi_point" },
        { name: 'D', checked: false, key: "bi_point" },
        { name: 'E', checked: false, key: "bi_point" },
      ],
    },
  
  ];