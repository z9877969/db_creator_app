const getMonthBreakPoints = (date) => {
  // date -> "YYYY-MM-DD"
  const [year, month] = date
    .split("-")
    .splice(0, 2)
    .map((el, idx) => (idx === 1 ? Number(el) - 1 : Number(el)));
  const prev = new Date(Date.UTC(year, month, 1, 0, 0, 0, -1));
  const next = new Date(Date.UTC(year, month + 1, 1, 0, 0, 0, 0));
  return { prev, next };
};

const monthBreakPoints = {
  getSome: getMonthBreakPoints,
  getCurrent: () => {
    // const date =
    const [year, month] = date
      .split("-")
      .splice(0, 2)
      .map((el, idx) => (idx === 1 ? Number(el) - 1 : Number(el)));
    const prev = new Date(Date.UTC(year, month, 1, 0, 0, 0, -1));
    const next = new Date(Date.UTC(year, month + 1, 1, 0, 0, 0, 0));
    return { prev, next };
  },
};

const date = new Date();

// console.log(date.toISOString());
// console.log(Date.UTC());
// console.log(date.getTimezoneOffset());

module.exports = monthBreakPoints;
