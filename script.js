// API key
const APP_ID = '4090239d69cdb3874de692fd18539299';

// API usamos las coordenadas del lugar basándonos en coordenadas (OpenWeather)
const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_ID}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

// Obtener la información del lugar 
const setWeatherData = data => {
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: Math.floor(data.main.temp),
        date: getDate(),
    }

    Object.keys(weatherData).forEach(key => {
        setTextContent(key, weatherData[key]);
    });

    setWeatherBackground(weatherData.description); // Cambia el fondo basado en la descripción del clima
    cleanUp();
}

// Establece el fondo dinámico según el clima
const setWeatherBackground = description => {
    let container = document.getElementById('container');

    // Restablecer cualquier fondo anterior
    container.style.backgroundImage = '';

    // Establecer la imagen de fondo basada en la descripción del clima
    switch (description.toLowerCase()) {
        case 'clear':
            container.style.backgroundImage = "url('./clear-sky.jpg')";
            break;
        case 'clouds':
            container.style.backgroundImage = "url('./cloudy.jpg')";
            break;
        case 'rain':
            container.style.backgroundImage = "url('./rain.jpg')";
            break;
        case 'snow':
            container.style.backgroundImage = "url('./snow.jpg')";
            break;
        case 'thunderstorm':
            container.style.backgroundImage = "url('./thunderstorm.jpg')";
            break;
        case 'mist':
        case 'fog':
            container.style.backgroundImage = "url('./mist.jpg')";
            break;
        default:
            container.style.backgroundImage = "url('./default.jpg')"; // Fondo por defecto
            break;
    }

    // Ajustar el estilo del fondo
    container.style.backgroundSize = 'cover';  // Asegura que la imagen cubra el contenedor
    container.style.backgroundPosition = 'center';  // Centrar la imagen
}

const cleanUp = () => {
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');

    loader.style.display = 'none'; 
    container.style.display = 'flex'; 
}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}

const setTextContent = (element, text) => {
    document.getElementById(element).textContent = text;
}

// Obtiene información del usuario
const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData, error => {
        console.error('Error getting location', error);
        // Podrías mostrar un mensaje al usuario sobre el error
    });
}
