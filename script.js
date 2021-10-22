const api = "api.openweathermap.org/data/2.5/weather";
const apiKey = '363d6adc9be4c7837663922dec525cca';
let cityName;
const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=
${cityName}&APPID=${apiKey}`;

const celsiusRadio = document.querySelector('.weather__cel');
const fahRadio = document.querySelector('.weather__fah');
celsiusRadio.checked = 'true';

const form = document.querySelector('.form');
let formInput = document.querySelector('.form__input');
let content = document.querySelector('.content');
let toCelsius = (kelvin) => Math.round(kelvin - 273.15);
toCelsius(278.39);
let toFahrenheit = (kelvin) => Math.round((kelvin - 273.15) * 9 / 5 + 32);

let date = new Date();


function showTime() {

	let estDate = date.toLocaleString("en-US", {
		timeZone: "America/Toronto"
	});
	let pstDate = date.toLocaleString("en-US", {
		timeZone: "America/Vancouver"
	});
	let mstDate = date.toLocaleString("en-US", {
		timeZone: "America/Denver"
	});
	let est = `${estDate.split(' ')[1]} ${estDate.split(' ')[2]}`;
	let pst = `${pstDate.split(' ')[1]} ${pstDate.split(' ')[2]}`;
	let mst = `${mstDate.split(' ')[1]} ${mstDate.split(' ')[2]}`;
	console.log(`${est} EST | ${mst} MST | ${pst} PDT`);
	return `${est} EST | ${mst} MST | ${pst} PDT`;
}


function dateToString(date) {
	date = new Date(date * 1);
	dateStr = date.toString().split(' ');
	return `${dateStr[0]} ${dateStr[1]} ${dateStr[2]} ${dateStr[3]}`;
}

function renderContent(city, temp, weather, time) {
	content.classList.add('appear');
	let cityEl = document.createElement('h1');
	cityEl.classList.add('city__heading');
	let tempEl = document.createElement('h3');
	let weatherEl = document.createElement('p');
	let timeEl = document.createElement('p');
	let dateEl = document.createElement('p');

	cityEl.innerText = city;
	tempEl.innerHTML = celsiusRadio.checked ? `${toCelsius(temp)} C°` :
		`${toFahrenheit(temp)} F°`;
	checkTemp(tempEl, temp);
	weatherEl.innerText = weather;
	weatherEl.classList.add('capital');
	timeEl.innerText = time;
	dateEl.innerText = dateToString(new Date().getTime());

	content.appendChild(cityEl);
	content.appendChild(tempEl);
	content.appendChild(weatherEl);
	content.appendChild(timeEl);
	content.appendChild(dateEl);

	console.log(checkTemp(temp));
}


function checkTemp(el, temp) {

	celsiusRadio.addEventListener('change', (e) => {
		if (e.target.checked) {
			el.innerHTML = `${toCelsius(temp)} C°`;

		}
	});

	fahRadio.addEventListener('change', (e) => {
		if (e.target.checked) {
			el.innerHTML = `${toFahrenheit(temp)} F°`;
		}
	});
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
				renderContent(`${response.data.name} ${response.data.sys.country}`,
					/* celsiusRadio.checked ? toCelsius(response.data.main.temp) :
					toFahrenheit(response.data.main.temp) */
					response.data.main.temp,
					response.data.weather[0].description,
					showTime());

			})
			.catch((error) => {
				if (formInput.value.trim() === '') {
					formInput.placeholder = `Please fill it out`;
				}
				let contentEl = document.createElement('h2');
				contentEl.classList.add('error');
				content.appendChild(contentEl);
				contentEl.innerHTML = `Sorry, we can't find that. Please try another city`;
			});
		e.target.reset();
	});
}

showAPI();

// axios.get(`https://api.openweathermap.org/data/2.5/weather?q=
// toronto&APPID=${apiKey}`)
// 	.then((response) => {
// 		console.log(response.data);
// 		console.log(response.data.weather[0].description);
// 	})