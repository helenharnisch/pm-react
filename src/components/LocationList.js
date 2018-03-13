import React from 'react';
import PropTypes from 'prop-types';
import WeatherLocation from './WeatherLocation';


const LocationList = ({ cities, onSelectedLocation }) => {
const hadlerWeatherLocationClick = city => {
  console.log('hadlerWeatherLocationClick');
  onSelectedLocation(city);
}
const strToComponent = cities => (
  cities.map( city  => (
    <WeatherLocation
      key={city}
      city={city}
    onWeatherLocationClick={() =>
     hadlerWeatherLocationClick(city)}/>))
);
return (

  <div>
    {strToComponent(cities)}
  </div>
);
}

LocationList.propTypes = {
    cities: PropTypes.array.isRequired,
}
export default LocationList;
