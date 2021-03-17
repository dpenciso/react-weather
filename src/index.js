import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WeatherInput from './Components/WeatherInput/WeatherInput';
import reportWebVitals from './reportWebVitals';
import GetWeather from './Components/GetWeather/GetWeather'

ReactDOM.render(
  <React.StrictMode>
    <WeatherInput />
    <GetWeather />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
