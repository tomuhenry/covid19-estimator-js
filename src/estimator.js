const covidImpact = (reportedCases, people, beds) => {
  const currentlyInfected = reportedCases * people;
  const infectionsByRequestedTime = currentlyInfected * 1024; // considering 30 days
  const severeCasesByRequestedTime = Math.floor(
    infectionsByRequestedTime * 0.15
  );
  const bedCapacity = Math.floor(beds * 0.95);
  const availableBedsSevere = Math.floor(bedCapacity * 0.35);

  const bedsByTime = availableBedsSevere - severeCasesByRequestedTime;

  const casesForICUByRequestedTime = Math.floor(
    infectionsByRequestedTime * 0.05
  );
  const casesForVentilatorsByRequestedTime = Math.floor(
    infectionsByRequestedTime * 0.02
  );
  const dollarsInFlight = Math.floor(
    (infectionsByRequestedTime * 0.65 * 1.5) / 30 // $$ spent daily by majority 65%
  );

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime: bedsByTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

const covid19ImpactEstimator = (data) => {
  const reportedCases = data.reportedCases;
  const beds = data.totalHospitalBeds;
  return {
    data,
    impact: covidImpact(reportedCases, 10, beds),
    severeImpact: covidImpact(reportedCases, 50, beds)
  };
};

export default covid19ImpactEstimator;
