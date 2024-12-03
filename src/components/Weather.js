import React from "react";

const Weather = (props) => {
  return (
    <div className="info">
      {props.city && props.country && (
        <>
          <p className="info_key">Location: <span className="info_value">{props.city}, {props.country}</span></p>
          <p className="info_key">Temperature: <span className="info_value">{props.temperature}°C</span></p>
          <p className="info_key">Humidity: <span className="info_value">{props.humidity}%</span></p>
          <p className="info_key">Description: <span className="info_value">{props.description}</span></p>
          {props.icon && <img src={props.icon} alt="weather-icon" />}
        </>
      )}
      {props.error && <p className="info_key">Error: <span className="info_value">{props.error}</span></p>}

      {/* 5-Day Forecast */}
      {props.forecast.length > 0 && (
        <div className="forecast">
          <h3>5-Day Forecast</h3>
          <div className="forecast-container">
            {props.forecast.map((day, index) => (
              <div key={index} className="forecast-day">
                <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
                <p>{day.main.temp}°C</p>
                <p>{day.weather[0].description}</p>
                <img src={`https://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt="forecast-icon" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
