const covidImpact = (reportedCases, people) => {
  let currentlyInfected = reportedCases * people;
  return {
    currentlyInfected: currentlyInfected,
    infectionsByRequestedTime: currentlyInfected * 1024
  };
};

const covid19ImpactEstimator = (data) => {
  let reportedCases = data.reportedCases;
  return {
    data: data,
    impact: covidImpact(reportedCases, 10),
    severeImpact: covidImpact(reportedCases, 50)
  };
};

export default covid19ImpactEstimator;
