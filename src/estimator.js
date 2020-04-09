const covidImpact = (reportedCases, people, beds) => {
  let currentlyInfected = reportedCases * people;
  let infectionsByRequestedTime = currentlyInfected * 1024;
  let severeCasesByRequestedTime = Math.round(infectionsByRequestedTime * 0.15);
  let hospitalBedsByRequestedTime = Math.floor(
    severeCasesByRequestedTime * 0.35
  );
  if (hospitalBedsByRequestedTime >= 0) {
    return hospitalBedsByRequestedTime;
  } else {
    hospitalBedsByRequestedTime = -severeCasesByRequestedTime;
  }
  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
  };
};

const covid19ImpactEstimator = (data) => {
  let reportedCases = data.reportedCases;
  let beds = data.totalHospitalBeds;
  return {
    data: data,
    impact: covidImpact(reportedCases, 10),
    severeImpact: covidImpact(reportedCases, 50)
  };
};

export default covid19ImpactEstimator;
