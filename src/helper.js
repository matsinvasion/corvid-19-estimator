const projectedInfections = (data) => {
  if (data.periodType === 'days') return 2 ** Math.trunc(data.timeToElapse / 3);
  if (data.periodType === 'weeks') return 2 ** Math.trunc((data.timeToElapse * 7) / 3);
  if (data.periodType === 'months') return 2 ** Math.trunc((data.timeToElapse * 30) / 3);
  return 0;
};

const timeToElapse = (data) => {
  if (data.periodType === 'days') return data.timeToElapse;
  if (data.periodType === 'weeks') return data.timeToElapse * 7;
  if (data.periodType === 'Months') return data.timeToElapse * 30;
  return 0;
};

export { projectedInfections, timeToElapse };
