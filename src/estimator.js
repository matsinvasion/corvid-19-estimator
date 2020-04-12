const express = require('express');

const app = express();
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const { toXML } = require('jstoxml');
const helperFunctions = require('./helper');


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan(':method :url :status :response-time ms', { stream: accessLogStream }));
app.use(express.json());

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

app.post('/api/v1/on-covid-19/', (req, res) => {
  if (JSON.stringify(req.body) === '{}') return res.status(400).send('Bad Resquest, provide correct data object.');

  const response = covid19ImpactEstimator(req.body);
  return res.send(response);
});
//  this violates the DRY principle
app.post('/api/v1/on-covid-19/json', (req, res) => {
  if (JSON.stringify(req.body) === '{}') return res.status(400).send('Bad Resquest, provide correct data object.');

  const response = covid19ImpactEstimator(req.body);
  return res.send(response);
});
app.post('/api/v1/on-covid-19/xml', (req, res) => {
  if (JSON.stringify(req.body) === '{}') return res.status(400).send('Bad Resquest, provide correct data object.');
  const response = covid19ImpactEstimator(req.body);
  return res.send(toXML(response));
});
app.get('/api/v1/on-covid-19/log', (req, res) => {
  fs.readFile('./access.log', 'utf8', (err, data) => {
    if (err) throw err;
    // line by line
    res.format({
      'text/plain': () => {
        res.send(data);
      }
    });
  });
});
// server
const port = process.env.PORT || 3000;
// const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));
app.listen(port, () => {
});
