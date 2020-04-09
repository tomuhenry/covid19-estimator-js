/* eslint-disable linebreak-style */
import covidImpact from './covidImpact';

const covid19ImpactEstimator = (data) => ({
  data,
  impact: covidImpact(data, 10),
  severeImpact: covidImpact(data, 50)
});
export default covid19ImpactEstimator;
