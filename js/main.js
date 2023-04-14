const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");

const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=5f2863187e15525d2e13d051045b9eb0";
const API_UNITS = "&units=metric";

const getWeather = () => {
	const city = input.value;
	const URL = API_URL + city + API_KEY + API_UNITS;

	axios
		.get(URL)
		.then((res) => {
			const temp = res.data.main.temp;
			const hum = res.data.main.humidity;
			const status = res.data.weather[0];

			cityName.textContent = res.data.name;
			weather.textContent = status.main;
			temperature.textContent = temp.toFixed(1) + "℃";
			humidity.textContent = hum + "%";
			weatherIcon = "./img/" + status.icon + '.png'

			warning.textContent = "";
			input.value = "";

			console.log(res.data);
			console.log(status);
			console.log(status.icon);
			console.log(weatherIcon);

			photo.setAttribute("src", weatherIcon);


		})
		.catch(() => {
			warning.textContent = "Enter a valid city name";
			input.value = "";
		});
};

const inputCheck = () => {
	if (input.value == "") {
		warning.textContent = "You must enter city name";
	} else {
		getWeather();
	}
};
const enterCheck = (e) => {
	if (e.key === "Enter") {
		inputCheck();
	}
};

button.addEventListener("click", inputCheck);
input.addEventListener("keydown", enterCheck);
