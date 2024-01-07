export const isLastMessage = (date1: Date, date2: Date): boolean => {
  const newDate1 = new Date(date1);
  const newDate2 = new Date(date2);
  const time1 =
    newDate1.getHours() + newDate1.getMinutes() + newDate1.getSeconds();
  const time2 =
    newDate2.getHours() + newDate2.getMinutes() + newDate2.getSeconds();

  return Math.abs(time1 - time2) <= 2;
};
