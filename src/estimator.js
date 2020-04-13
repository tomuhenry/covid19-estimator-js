/* eslint-disable linebreak-style */

const covidImpact = (data, people) => {
  const {
    reportedCases,
    periodType,
    totalHospitalBeds,
    region: { avgDailyIncomeInUSD, avgDailyIncomePopulation } = {}
  } = data;
  let { timeToElapse } = data;
  const currentlyInfected = reportedCases * people;

  if (periodType === 'days') {
    timeToElapse *= 1;
  } else if (periodType === 'weeks') {
    timeToElapse *= 7;
  } else if (periodType === 'months') {
    timeToElapse *= 30;
  }
  const factor = Math.trunc(timeToElapse / 3);
  const infectionsByRequestedTime = currentlyInfected * 2 ** factor;
  const severeCasesByRequestedTime = Math.trunc(
    infectionsByRequestedTime * 0.15
  );

  const availableBeds = totalHospitalBeds * 0.35;

  const hospitalBedsByRequestedTime = Math.trunc(
    availableBeds - severeCasesByRequestedTime
  );

  const casesForICUByRequestedTime = Math.trunc(
    infectionsByRequestedTime * 0.05
  );

  const casesForVentilatorsByRequestedTime = Math.trunc(
    infectionsByRequestedTime * 0.02
  );

  const dollarsInFlight = Math.trunc(
    (infectionsByRequestedTime
      * avgDailyIncomePopulation
      * avgDailyIncomeInUSD)
      / timeToElapse
  );

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

const covid19ImpactEstimator = (data) => ({
  data,
  impact: covidImpact(data, 10),
  severeImpact: covidImpact(data, 50)
});
export default covid19ImpactEstimator;
