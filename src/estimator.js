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
  estimator.impact.severeCasesByRequestedTime = Math.trunc(0.15 * estimator.impact
    .infectionsByRequestedTime);
  estimator.impact.hospitalBedsByRequestedTime = Math.trunc((0.35 * data.totalHospitalBeds)
    - estimator.impact.severeCasesByRequestedTime);
  estimator.impact.casesForICUByRequestedTime = Math.trunc(0.05 * estimator
    .impact
    .infectionsByRequestedTime);
  estimator.impact.casesForVentilatorsByRequestedTime = Math.trunc(0.02 * estimator.impact
    .infectionsByRequestedTime);
  estimator.impact.dollarsInFlight = estimator.impact.infectionsByRequestedTime * data
    .region.avgDailyIncomePopulation * data
    .region.avgDailyIncomeInUSD * data.timeToElapse;
  estimator.severeImpact.currentlyInfected = data.reportedCases * 50;
  estimator.severeImpact.infectionsByRequestedTime = estimator.severeImpact.currentlyInfected
   * projectedInfections(data);
  estimator.severeImpact.severeCasesByRequestedTime = Math.trunc(0.15 * estimator.severeImpact
    .infectionsByRequestedTime);
  estimator.severeImpact.hospitalBedsByRequestedTime = Math.trunc((0.35 * data.totalHospitalBeds)
    - estimator.severeImpact.severeCasesByRequestedTime);
  estimator.severeImpact.casesForICUByRequestedTime = Math.trunc(0.05 * estimator.severeImpact
    .infectionsByRequestedTime);
  estimator.severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(0.02 * estimator
    .severeImpact
    .infectionsByRequestedTime);
  estimator.severeImpact.dollarsInFlight = estimator.severeImpact.infectionsByRequestedTime * data
    .region.avgDailyIncomePopulation * data
    .region.avgDailyIncomeInUSD * data.timeToElapse;
  return estimator;
};

export default covid19ImpactEstimator;
