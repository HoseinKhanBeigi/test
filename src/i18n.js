import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "partOfOrganization":"بخش سازمانی",
      "email":"ایمیل",
      "fullName":"نام / نام خانوادگی",
      "phoneNumber":"تلفن همراه",
      "insert information":"درج اطلاعات",
      "insert meeting": "درج جلسه",
      "insert call": "درج تماس",
      "enter type of data": "نوع ورود اطلاعات را انتخاب کنید",
      "insert client":"درج مشتری",
      "single":"انفرادی",
      "couple":"گروهی",
      "insert user":"درج بازاریاب",
      "position":"سمت",
      "personality code":"کد پرسنلی",
      "userPosition":"سطح کاربر",
      "directSeniorUser":"بازاریاب ارشد مستقیم",
      "insert":"ثبت",
      "remove":"حذف",
      "exelFile":"فایل اکسل مورد نظر را انتخاب کنید یا در این اینجا بارگذاری نمایید.",
      "real":"حقیقی",
      "civil":"حقوقی",
      "type of client":"نوع مشتری",
      "national_number":"کد ملی",
      "national_identifier":"کد حقوقی",
      "usersList":"لیست بازاریابان",
      "manger":"مدیر عامل هولدینگ نگاه",
      "download":"دانلود"

    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
