

const API_KEY = '78c9fe25d3bfc2cc5dfe620e7d28ad73';

async function getWeather(city) {


    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error("something went wrong!")
        }

        const data = await response.json()

        return data;
    } catch (error) {
        console.log(error)
    }

}



async function addFavorite(city) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.includes(city)) {
        console.log("City already exist")
        return;
    }

    favorites.push(city)

    localStorage.setItem("favorites", JSON.stringify(favorites))
}



function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    let favoritesContainer = document.getElementById("favorites");

    favoritesContainer.innerHTML = "";

    favorites.forEach(function (city) {
        let cityElement = document.createElement("p");

        cityElement.textContent = city;

        favoritesContainer.appendChild(cityElement);
    });
}


async function searchWeather(city) {
    try {
        let weatherCard = document.getElementById("weatherCard");

        weatherCard.textContent = "Loading....."

        const data = await getWeather(city);

    } catch (error) {
        console.log(error);
    }
}

function debounceSearch() {
    let timer = 0;

    return function (event) {
        clearTimeout(timer);

        const city = event.target.value;

        timer = setTimeout(() => {
            searchWeather(city);
        }, 500);
    };
}

const debounce = debounceSearch();



document.addEventListener('DOMContentLoaded', function () {

    const searchInput = document.querySelector('#searchInput');

    searchInput.addEventListener('input', debounce);

    loadFavorites();
});

window.searchWeather = searchWeather;
window.addFavorite = addFavorite;