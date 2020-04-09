const projectedInfections = (data) => {
  if (data.periodType === 'days') return Math.trunc(data.timeToElapse / 3);
  if (data.periodType === 'weeks') return Math.trunc((data.timeToElapse * 7) / 3);
  if (data.periodType === 'months') return Math.trunc((data.timeToElapse * 30) / 3);
  return 0;
};

export default projectedInfections;
