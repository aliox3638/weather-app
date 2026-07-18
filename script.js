const input = document.querySelector("#input");
const button = document.querySelector("#btn");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temp");
const humidityElement = document.querySelector("#humidity");
const windElement = document.querySelector("#wind");
const loadingElement = document.querySelector("#loading");
const iconElement = document.querySelector("#icon");
const apiKey = "045191eac414487b96371645261707";
const updatedElement = document.querySelector("#updated");

button.addEventListener("click", getWeather);

input.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        getWeather();

    }

});

async function getWeather() {

    try {

        let city = input.value.trim();

        if (city === "") {

            cityElement.textContent =
                "Please enter a city name";

            return;
        }

        let url =
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

        loadingElement.textContent = "Loading...";

        let response = await fetch(url);

        let data = await response.json();

        if (data.error) {

            iconElement.src = "";

            cityElement.textContent =
                "City not found";

            tempElement.textContent = "";
            humidityElement.textContent = "";
            windElement.textContent = "";

            loadingElement.textContent = "";

            return;
        }

        if (data.current.is_day === 0) {

            document.body.style.background =
            "linear-gradient(135deg, #141E30, #243B55)";
        }
        else {
        
            document.body.style.background =
            "linear-gradient(135deg, #4facfe, #00f2fe)";
        }

        let iconUrl = data.current.condition.icon;

        iconElement.src = `https:${iconUrl}`;

        loadingElement.textContent = "";

        cityElement.textContent =
            `${data.location.name}, ${data.location.country}`;

        tempElement.textContent =
            `${data.current.temp_c}°C`;

        humidityElement.textContent =
            `Humidity: ${data.current.humidity}%`;

        windElement.textContent =
            `Wind: ${data.current.wind_kph} kph`;

        updatedElement.textContent =
            `Updated: ${data.current.last_updated}`;

    }

    catch (error) {

        cityElement.textContent = "City not found";

        tempElement.textContent = "";
        humidityElement.textContent = "";
        windElement.textContent = "";

        console.log(error);
    }

}