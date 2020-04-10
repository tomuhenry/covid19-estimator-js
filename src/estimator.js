const covidImpact = (reportedCases, people, beds) => {
  const currentlyInfected = reportedCases * people;
  const infectionsByRequestedTime = currentlyInfected * 1024;
  const severeCasesByRequestedTime = Math.round(
    infectionsByRequestedTime * 0.15
  );
  const bedCapacity = Math.round(beds * 0.95);
  const availableBedsSevere = Math.round(bedCapacity * 0.35);

  const hospitalBedsByRequestedTime =
    availableBedsSevere - severeCasesByRequestedTime;

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
  };
};

const covid19ImpactEstimator = (data) => {
  const reportedCases = data.reportedCases;
  const beds = data.totalHospitalBeds;
  return {
    data: data,
    impact: covidImpact(reportedCases, 10, beds),
    severeImpact: covidImpact(reportedCases, 50, beds)
  };
};

export default covid19ImpactEstimator;
