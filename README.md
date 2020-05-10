# BD2020-Final-Project

Group Name: Immortals

Project Participants:
- Hongyu Zhai (`hz2162`)
- Yuhan Chen (`yc4184`)
- Sifan Chen (`sc7782`)

## Project Description

Analysis of the relationship between medical resource distribution, policy and mortality rate (by country, by state, by county).

We are trying to answer the following questions:
- Which countries/regions are slow/fast to take actions?
- Are there any country/region that is ignoring the rising numbers?
- Are there any country/region being extra cautious?
- What patterns can we find when examining the data?
- Do countries/regions with low medical resources tend to take more stringent actions?
- Do countries/regions with high population density tend to take more stringent actions?
- Do countries/regions with higher percentage of elder people tend to take more stringent actions?
- What about states? Can we find similar patterns in the state level?

## Approach Overview

The project is roughly divided into three parts:

- Collecting data
    - policy information from various regions
    - medical resources (test number, hospital capacity, number of beds and ICU beds) of various regions
    - local virus outbreak curves, mortality rate, cure rate, bed utilization rate, etc. 
- Prepare the datasets
    - cleaning unnecessary fields
    - integrating datasets by performing joins.
- Explore and visualize the data.
- Observe the patterns and hopefully gain insights.

## Cleaning and Integration

Before analyzing, we performed some steps to clean and integrate the data. The raw datasets are stored in `data` folder and processed ones can be found in  `processed_data` folder. For reproducibility, we include a notebook `Data Processing.ipynb` detailing steps we took to make data more usable. It can be found in the root directory of the project. In this notebook, we included the date we retrived the datasets. If the datasets are stored on Github, we also put in the link to the specific version we downloaded.

`./data/datasets_used.csv` contains the list of datasets we used for the project. A simplified list is provided in the next section.

## Visualization and Analysis
We made many several charts (static and interactive) to explore the datasets we have. Static charts are stored in the `plots` folder. Interactive choropleth maps can be found [here](https://iamzhaihy.github.io/BD2020-Final-Project). More details can be found in the project report.

## Report and presentations
Both the project report and presentation slides (in PDF format) can be found in the `deliverables` folder. 

## How to reproduce?
All steps we took to process the data is detailed in `Data Processing.ipynb`. You can clone the repo and run it by yourself. The notebook relies on Python 3.8, `numpy`, `pandas`, and `matplotlib` to work.

For interactive maps made in D3, you can use the link provided in the description section. Or you can clone this repo, and run a local HTTP server to see the result. If you are interested, feel free to play with JavaScript files in the `visualizations` folder.

## List of Datasets Used

- Country level
    - World Bank - Hospital Beds (per 1,000 people): https://data.worldbank.org/indicator/SH.MED.BEDS.ZS
    - World Bank - Physicians (per 1,000 people): https://data.worldbank.org/indicator/SH.MED.PHYS.ZS
    - World Bank - Nurses (per 1,000 people): https://data.worldbank.org/indicator/SH.MED.NUMW.P3
    - World Bank - Percentage of Ages 65+: https://data.worldbank.org/indicator/SP.POP.65UP.TO.ZS
    - JHU - Global Confirmed Cases: https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv
    - JHU - Global Recovered Cases: https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv
    - JHU - Global Death Tolls:	https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv
    - Oxford - Government Responses to COVID-19: https://www.bsg.ox.ac.uk/research/research-projects/coronavirus-government-response-tracker
- State level
    - The Covid Tracking Project - State Totals https://covidtracking.com/data
    - KFF - State Actions to Stop COVID-19 Spread: https://www.kff.org/health-costs/issue-brief/state-data-and-policy-actions-to-address-coronavirus/#stateleveldata
    - Wikipedia - State Regulations: https://en.wikipedia.org/wiki/U.S._state_and_local_government_response_to_the_2020_coronavirus_pandemic
- County level
    - KHN - Hospital by County: https://khn.org/news/as-coronavirus-spreads-widely-millions-of-older-americans-live-in-counties-with-no-icu-beds/
    - KHN - ICU Beds by County: https://khn.org/wp-content/uploads/sites/2/2020/03/KHN-ICU-bed-county-analysis_2.zip
