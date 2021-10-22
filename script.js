const api = "api.openweathermap.org/data/2.5/weather";
const apiKey = '363d6adc9be4c7837663922dec525cca';
let cityName = 'toronto';
const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=
${cityName}&APPID=${apiKey}`;

const form = document.querySelector('.form');
let formInput = document.querySelector('.form__input');
let content = document.querySelector('.content');
const toCelsius = (kelvin) => Math.round(kelvin - 273.15);
toCelsius(278.39);
console.log(toCelsius(288.26));

function renderContent(city, temp, weather) {
	let cityEl = document.createElement('h1');
	let tempEl = document.createElement('h3');
	let weatherEl = document.createElement('p');

	cityEl.innerText = city;
	tempEl.innerText = temp;
	weatherEl.innerText = weather;

	content.appendChild(cityEl);
	content.appendChild(tempEl);
	content.appendChild(weatherEl);
}

function showAPI() {
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		content.innerHTML = '';
		console.log(formInput.value);
		axios.get(`https://api.openweathermap.org/data/2.5/weather?q=
${formInput.value}&APPID=${apiKey}`)
			.then((response) => {
				console.log(response.status);
				console.log(response);
				renderContent(response.data.name,
					toCelsius(response.data.main.temp),
					response.data.weather[0].main);
			})
			.catch((error) => {
				let contentEl = document.createElement('h2');
				contentEl.classList.add('error');
				content.appendChild(contentEl);
				contentEl.innerHTML = `Sorry, we can't find that. Please try another city`;
			});
		e.target.reset();
	});
}

showAPI();




// getAPI();