const LOCALE = "en-US";

function getDateString(date) {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString(LOCALE, { month: "long" });
  const year = dateObj.getFullYear();

  return `${day} ${month} ${year}`;
}

function getDateStringWithWeekday(date) {
  const dateObj = new Date(date);
  const weekday = dateObj.toLocaleString(LOCALE, { weekday: "long" });
  const monthday = dateObj.getDate();
  const month = dateObj.toLocaleString(LOCALE, { month: "long" });
  const year = dateObj.getFullYear();

  return `${weekday}, ${monthday} ${month} ${year}`;
}

function getISODateString(date) {
  return date.toISOString().slice(0, 10);
}

export { getDateString, getDateStringWithWeekday, getISODateString };
