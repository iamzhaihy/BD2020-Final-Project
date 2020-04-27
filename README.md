# BD2020-Final-Project

Group Name: Immortals

Project Participants:
- Hongyu Zhai (`hz2162`)
- Yuhan Chen (`yc4184`)
- Sifan Chen (`sc7782`)

## Project Description

Analysis of the relationship between medical resource distribution, policy and mortality rate (by country, by state, by county).

## Approach Overview

The project is roughly divided into three parts:

- Collecting data
    - policy information from various regions
    - medical resources (test number, hospital capacity, number of beds and ICU beds) of various regions
    - local virus outbreak curves, mortality rate, cure rate, bed utilization rate, etc. 
- Cleaning and wrangling the data.
- Analyzing the results to generate evaluation results.

## Cleaning and Integration

Before analyzing, we performed some steps to clean and integrate the data. The raw datasets are stored in `data` folder and processed ones can be found in  `processed_data` folder. For reproducibility, we include a notebook `Data Processing.ipynb` detailing steps we took to make data more usable. It can be found in the root directory of the project. In this notebook, we included the date we retrived the datasets. If the datasets are stored on Github, we also put in the link to the specific version we downloaded.

`./data/datasets_used.csv` contains the list of datasets we used for the project. A simplified list is provided in the next section.

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
