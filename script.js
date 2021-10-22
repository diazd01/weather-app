const api = "api.openweathermap.org/data/2.5/weather";
const apiKey = '363d6adc9be4c7837663922dec525cca';
let cityName;
let cardTemp = document.querySelector('.card__temp');
const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=
${cityName}&APPID=${apiKey}`;
let weatherImage = document.querySelector('.card__weather');
const celsiusRadio = document.querySelector('.weather__cel');
const fahRadio = document.querySelector('.weather__fah');
celsiusRadio.checked = 'true';

const form = document.querySelector('.form');
let formInput = document.querySelector('.form__field');
let content = document.querySelector('.content');
let toCelsius = (kelvin) => Math.round(kelvin - 273.15);
toCelsius(278.39);
let toFahrenheit = (kelvin) => Math.round((kelvin - 273.15) * 9 / 5 + 32);

let date = new Date();

function getTime(timestamp) {
	// let timestamp = 1634920868;
	let convertTime = new Date(timestamp * 1000);
	convertTime = convertTime.toLocaleString("en-US", {
		hour: "numeric",
		minute: "numeric"
	})

	return convertTime;
}


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
	return `${est} EST`;
	//  | ${mst} MST 
	// | ${pst} PDT`
}


function dateToString(date) {
	date = new Date(date * 1);
	dateStr = date.toString().split(' ');
	return `${dateStr[0]} ${dateStr[1]} ${dateStr[2]} ${dateStr[3]}`;
}

function checkWeather(weatherDesc) {
	if (weatherDesc.toLowerCase().includes('cloud')) {
		weatherImage.src = "./assets/icons/cloudy.png";
		console.log(weatherImage.src);
	}
	if (weatherDesc.toLowerCase().includes('thunder')) {
		weatherImage.src = "./assets/icons/thunderstorm.png";
	}
	if (weatherDesc.toLowerCase().includes('rain')) {
		weatherImage.src = "./assets/icons/rainy.png";
	}
	if (weatherDesc.toLowerCase().includes('sunny')) {
		weatherImage.src = "./assets/icons/sunny.png";
	}

}

// console.log(checkWeather());

function renderContent(city, temp, weather, time, windSpeed, sunrise, sunset, weatherDesc, humidity) {
	// temp = `${celsiusRadio.checked ? `${toCelsius(temp)} C°` : `${toFahrenheit(temp)} F°`}`;
	// checkTemp(cardTemp, temp);
	document.querySelector('.card').classList.add('appear');
	document.querySelector('.card__city').innerHTML = city;
	document.querySelector('.card__date').innerHTML = dateToString(new Date().getTime());
	document.querySelector('.card__temp-descrip').innerHTML = weather;
	cardTemp.innerHTML = `${celsiusRadio.checked ? `${toCelsius(temp)} C°` 
	: `${toFahrenheit(temp)} F°`}`;
	checkTemp(cardTemp, temp);
	document.querySelector('.card__time').innerHTML = `${getTime(time)} EST`;

	document.querySelector('.card__info-title-one').innerHTML = `${humidity}%`;
	document.querySelector('.card__info-title-two').innerHTML = `${windSpeed} m/second`;

	document.querySelector('.card__info-title-three').innerHTML = getTime(sunrise);
	document.querySelector('.card__info-title-four').innerHTML = getTime(sunset);

	checkWeather(weatherDesc);

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
					response.data.main.temp,
					response.data.weather[0].description,
					response.data.dt,
					response.data.wind.speed,
					response.data.sys.sunrise,
					response.data.sys.sunset,
					response.data.weather[0].main,
					response.data.main.humidity
				);

			})
			.catch((error) => {
				if (formInput.value.trim() === '') {
					formInput.placeholder = `Please fill it out`;
				}
				let contentEl = document.createElement('h2');
				contentEl.classList.add('error');
				content.appendChild(contentEl);
				contentEl.innerHTML = `Sorry, please try again.`;
			});
		e.target.reset();
	});
}

showAPI();

// axios.get(`https://api.openweathermap.org/data/2.5/weather?q=
// toronto&APPID=${apiKey}`)
// 	.then((response) => {
// 		console.log(response.data.weather[0].main);
// 		console.log(response.data.main.humidity);
// 	})