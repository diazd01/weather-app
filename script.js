const api = "api.openweathermap.org/data/2.5/weather";
const apiKey = '363d6adc9be4c7837663922dec525cca';
const cityName = 'toronto';
const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=
${cityName}&APPID=${apiKey}`;


axios.get(apiURL)
	.then((response) => {
		console.log(response.data.name);
	})
	.catch((error) => {
		console.log(error);
	});