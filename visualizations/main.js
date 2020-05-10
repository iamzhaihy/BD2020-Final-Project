// Load the datasets and call the functions to make the visualizations

Promise.all([
  d3.csv('./processed_data/country_responses.csv', d3.autoType),
  d3.json('./visualizations/countries.json')
]).then(([data, geoJson]) => {
  countryLevelMap(geoJson, data, d3.select('#vis1'))
});
