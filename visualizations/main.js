// Load the datasets and call the functions to make the visualizations

Promise.all([
  d3.json('./visualizations/countries.json'),
  d3.csv('./processed_data/country_responses.csv', d3.autoType)
]).then(([geoJSON, data]) => {
  countryLevelMap(geoJSON, data, d3.select('#vis1'));
});

Promise.all([
  d3.json('./visualizations/states.json'),
  d3.csv('./processed_data/state_date_index_merged.csv', d3.autoType)
]).then(([geoJSON, data]) => {
  stateLevelMap(geoJSON, data, d3.select('#vis2'))
})

// d3.json('./visualizations/states.json'),
// d3.csv('./data/country_meta.csv'),
// d3.csv('./processed_data/country_indicators.csv'),

// stateLevelMap(stateGeoJson, data, d3.select('#vis2'))
