import { formatRelative as format } from "date-fns";
import { uk } from "date-fns/esm/locale";

const formatToRelative = (date: Date, currentDate: Date): string => {
  const formatRelativeLocale = {
    lastWeek: "P",
    yesterday: "P",
    today: "p",
    tomorrow: "P",
    nextWeek: "P",
    other: "P",
  };

  const locale = {
    ...uk,
    formatRelative: (token: keyof typeof formatRelativeLocale) =>
      formatRelativeLocale[token],
  };

  return format(date, currentDate, { locale });
};

export default formatToRelative;
