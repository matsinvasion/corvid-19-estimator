// const express = require('express');

// const app = express();
// const fs = require('fs');
// const morgan = require('morgan');
// const path = require('path');
// const { toXML } = require('jstoxml');
import * as helperFunctions from './helper';


// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
// app.use(morgan(':method :url :status :response-time ms', { stream: accessLogStream }));
// app.use(express.json());

const covid19ImpactEstimator = (data) => {
  //  Estimator
  const estimator = {};
  estimator.data = data;
  estimator.impact = {};
  estimator.severeImpact = {};
  estimator.impact.currentlyInfected = data.reportedCases * 10;
  estimator.impact.infectionsByRequestedTime = estimator.impact.currentlyInfected
      * helperFunctions.projectedInfections(data);
  estimator.impact.severeCasesByRequestedTime = Math.trunc(0.15 * estimator.impact
    .infectionsByRequestedTime);
  estimator.impact.hospitalBedsByRequestedTime = Math.trunc((0.35 * data.totalHospitalBeds)
        - estimator.impact.severeCasesByRequestedTime);
  estimator.impact.casesForICUByRequestedTime = Math.trunc(0.05 * estimator
    .impact
    .infectionsByRequestedTime);
  estimator.impact.casesForVentilatorsByRequestedTime = Math.trunc(0.02 * estimator.impact
    .infectionsByRequestedTime);
  estimator.impact.dollarsInFlight = Math.trunc((estimator.impact.infectionsByRequestedTime * data
    .region.avgDailyIncomePopulation * data
    .region.avgDailyIncomeInUSD) / helperFunctions.timeToElapse(data));
  estimator.severeImpact.currentlyInfected = data.reportedCases * 50;
  estimator.severeImpact.infectionsByRequestedTime = estimator.severeImpact.currentlyInfected
       * helperFunctions.projectedInfections(data);
  estimator.severeImpact.severeCasesByRequestedTime = Math.trunc(0.15 * estimator.severeImpact
    .infectionsByRequestedTime);
  estimator.severeImpact.hospitalBedsByRequestedTime = Math.trunc((0.35 * data.totalHospitalBeds)
        - estimator.severeImpact.severeCasesByRequestedTime);
  estimator.severeImpact.casesForICUByRequestedTime = Math.trunc(0.05 * estimator.severeImpact
    .infectionsByRequestedTime);
  estimator.severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(0.02 * estimator
    .severeImpact
    .infectionsByRequestedTime);
  estimator.severeImpact.dollarsInFlight = Math.trunc((estimator.severeImpact
    .infectionsByRequestedTime * data
    .region.avgDailyIncomePopulation * data
    .region.avgDailyIncomeInUSD) / helperFunctions.timeToElapse(data));
  return estimator;
};

export default covid19ImpactEstimator;
