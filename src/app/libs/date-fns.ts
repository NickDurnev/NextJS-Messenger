import { formatRelative as format, formatDistance } from "date-fns";
import { uk, enUS } from "date-fns/esm/locale";

export const formatToRelative = (date: Date, currentDate: Date): string => {
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

export const formatToDistance = (date: Date, currentDate: Date): string => {
  return formatDistance(date, currentDate, { locale: enUS, addSuffix: true });
};
