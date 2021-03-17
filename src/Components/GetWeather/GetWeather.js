import axios from "axios";

const options = {
  method: "GET",
  url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
  params: { q: "Orem", days: "3" },
  headers: {
    "x-rapidapi-key": "1ec5386572msh7c7a51b410e32c2p16d50fjsndaa0d8e46542",
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
}

const GetWeather = () => {
  return (
    <div>
      <button onClick={returnWeather}>Get Weather</button>
    </div>
  );
};

export default GetWeather;
