import projectedInfections from './helper';


const covid19ImpactEstimator = (data) => {
//  Estimator
  const estimator = {};
  estimator.data = data;
  estimator.impact = {};
  estimator.severeImpact = {};
  estimator.impact.currentlyInfected = data.reportedCases * 10;
  estimator.impact.infectionsByRequestedTime = estimator.impact.currentlyInfected
  * projectedInfections(data);
  estimator.impact.severeCasesByRequestedTime = estimator.impact.currentlyInfected
  * projectedInfections(data) * (15 / 100);
  estimator.impact.hospitalBedsByRequestedTime = estimator.impact.currentlyInfected
  * projectedInfections(data) * (15 / 100)
    - ((35 / 100) * data.totalHospitalBeds);
  estimator.impact.casesForICUByRequestedTime = (5 / 100) * estimator
    .impact
    .infectionsByRequestedTime;
  estimator.severeImpact.casesForICUByRequestedTime = (5 / 100) * estimator
    .impact
    .infectionsByRequestedTime;
  estimator.impact.casesForVentilatorsByRequestedTime = (2 / 100) * estimator.impact;
  estimator.impact.dollarsInFlight = estimator.impact.infectionsByRequestedTime * data
    .region.avgDailyIncomePopulation * data
    .region.avgDailyIncomeInUSD * data.timeToElapse;
  estimator.severeImpact.currentlyInfected = data.reportedCases * 50;
  estimator.severeImpact.infectionsByRequestedTime = estimator.severeImpact.currentlyInfected
   * projectedInfections(data);
  estimator.impact.severeCasesByRequestedTime = estimator.impact.currentlyInfected
  * projectedInfections(data) * (15 / 100);
  estimator.severeImpact.hospitalBedsByRequestedTime = estimator.impact.currentlyInfected
  * projectedInfections(data) * (15 / 100)
    - ((35 / 100) * data.totalHospitalBeds);
  estimator.severeImpact.casesForICUByRequestedTime = (5 / 100) * estimator.severeImpact
    .infectionsByRequestedTime;
  estimator.severeImpact.casesForVentilatorsByRequestedTime = (2 / 100) * estimator
    .severeImpact
    .infectionsByRequestedTime;

  estimator.severeImpact.dollarsInFlight = estimator.severeImpact.infectionsByRequestedTime * data
    .region.avgDailyIncomePopulation * data
    .region.avgDailyIncomeInUSD * data.timeToElapse;
  estimator.severeImpact.dollarsInFlight = 0;
  return estimator;
};

export default covid19ImpactEstimator;
