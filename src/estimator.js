const covid19ImpactEstimator = (data) => {
  var reportedCases = data.reportedCases;
  return {
    data: data,
    impact: covidImpact(reportedCases, 10),
    severeImpact: covidImpact(reportedCases, 50)
  };
};

const covidImpact = (reportedCases, people) => {
  var currentlyInfected = reportedCases * people;
  return {
    currentlyInfected: currentlyInfected,
    infectionsByRequestedTime: currentlyInfected * 1024
  };
};

export default covid19ImpactEstimator;
