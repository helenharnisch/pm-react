import React from 'react';
import WeatherTemperature from  './WeatherTemperature';
import WeatherExtraInfo from  './WeatherExtraInfo';
import PropTypes from 'prop-types';

const WeatherData = ({ data }) => {
  const { temperature, weatherState, humidity, wind } = data;

  return (
  <div className = 'weatherDataCont'>
    <WeatherTemperature temperature = {temperature}
    weatherState = {weatherState}/>
    <WeatherExtraInfo humidity = {humidity} wind = {wind}/>
  </div>
 )
}
//data es un objeto y vamos a validar todo lo que hay dentro.
// shape nos indica la forma es validador de objetos
WeatherData.propTypes = {
  data : PropTypes.shape({
    temperature : PropTypes.number.isRequired,
    weatherState : PropTypes.string.isRequired,
    humidity : PropTypes.number.isRequired,
    wind : PropTypes.number.isRequired,
  }),
};

export default WeatherData;
