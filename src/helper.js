const projectedInfections = (data) => {
  if (data.periodType === 'days') return 2 ** Math.trunc(data.timeToElapse / 3);
  if (data.periodType === 'weeks') return 2 ** Math.trunc((data.timeToElapse * 7) / 3);
  if (data.periodType === 'months') return 2 ** Math.trunc((data.timeToElapse * 30) / 3);
  return 0;
};

export default projectedInfections;
