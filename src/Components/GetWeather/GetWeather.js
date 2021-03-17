import React from "react";
import axios from "axios";

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const options = {
  method: "GET",
  url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
  params: { q: "Orem", days: "3" },
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
  },
};

const returnWeather = async () => {
  const response = await axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  console.log(response);
};

const GetWeather = () => {
  return (
    <div>
      <button onClick={returnWeather}>Get Weather</button>
    </div>
  );
};

export default GetWeather;
