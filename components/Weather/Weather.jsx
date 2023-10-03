import React, { useState, useEffect } from 'react';
import "./Weather.scss";

// const API_KEY = '7588536ec9945d7b41d9b9c9da433139';

const Weather = () => {
    const [city, setCity] = useState('');
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const weatherData = () => {
            setLoading(true);
            setError('');

            fetch(`https://api.openweathermap.org/data/2.5/weather?q=Yerevan&appid=22c50d687bf77e83b624691b01d33b29`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Can not found this city');
                    }
                    return response.json();
                })
                .then(data => {

                    console.log(data);

                    const temperatureInCelsius = (data.main.temp - 273.15).toFixed(2);

                    setTemperature(temperatureInCelsius);
                    setHumidity(data.main.humidity);
                    setDescription(data.weather[0].description);
                    setLoading(false);
                })
                .catch(err => {
                    setError('Can not found this city');
                    setLoading(false);
                });
        };

        if (city) {
            weatherData();
        }
        
    }, [city]);

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    return (
        <div className="weather__container">
            <h1 className='title'>Wellcome To Weather App</h1>
            <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={handleCityChange}
                className="weather__input"
            />
            {loading ? (
                <p className="loading__message">Loading...</p>
            ) : error ? (
                <p className="error__message">{error}</p>
            ) : (
                <div className="weather__info">
                    <div className="weather__info1">
                        <h2 className="weather__description">Weather in {city}</h2>
                        <p className='temperature'> {temperature} °C <i className="bi bi-brightness-high-fill"></i></p>
                    </div>
                    <div className="weather__info2">
                        <p className='humidity'><i className="bi bi-cloud-drizzle-fill"></i>: {humidity}%</p>
                        <p className='description'> <i className="bi bi-wind"></i> {description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
