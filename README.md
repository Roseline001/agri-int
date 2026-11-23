# AgriCheck

**Agricultural intelligence:** a React app to check the weather on farm plots and get simple irrigation advice.

Live site: https://roseline001.github.io/agri-int/

## About

Farming in Kenya depends on rain. AgriCheck shows live weather for four farming areas (Kitale, Machakos, Kericho and Nyeri) and gives simple irrigation advice based on the rain of the last 7 days and the next 3 days.

## Features

- Register and log in with email and password, or with Google
- Live temperature, rainfall, humidity and wind for each plot
- Satellite map of the plots; click a plot to open it
- Search conditions: filter by region, maximum temperature and minimum humidity, and pick a month to see last year's rain
- Weekly rain bars and irrigation advice for each plot
- Locations page with every plot and its advice
- Remembers the last plot you looked at

## Tech stack

- React + Vite
- Tailwind CSS
- Firebase Authentication
- Open-Meteo API (Fetch API)
- react-leaflet
- Vitest + React Testing Library
- Figma (design)
- GitHub Pages (deployment)

## React concepts used

useState, useEffect, useContext, props, conditional rendering, Fetch API

## Run it locally

npm install
npm run dev

## Tests

npm test
npm run coverage

Coverage: about 77% of statements.

## Author

Roseline: https://github.com/Roseline001
