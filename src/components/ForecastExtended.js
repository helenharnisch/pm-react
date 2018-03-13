import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ForecastItem from './ForecastItem';
import transformForecast from './../services/transformForecast';

/*const days = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
];
const data = {
  temperature: 10,
  humidity: 10,
  weatherState: 'normal',
  wind: 'normal'
}*/

const api_key = "631deffc7b3dc563f3a19aea3aa586d2";

const url = 'https://api.openweathermap.org/data/2.5/forecast';

class ForecastExtended extends Component {
  constructor(){
    super();
    this.state = {
      forecastData: null
    }
  }

componentDidMount(){
  this.updateCity(this.props.city)
}


componentWillReceiveProps(nextProps) {
  if(nextProps.city !== this.props.city) {
    this.setState ({forecastData: null});
    this.updateCity(nextProps.city);
  }
}

updateCity = city => {
  const url_forecast = `${url}?q=${ city }&appid=${api_key}&units=metric`;

  fetch(url_forecast).then(data => (data.json())
  ).then(weather_data => {
    console.log(weather_data);
    const forecastData = transformForecast(weather_data);

    this.setState({forecastData})
    }
  )
}

  renderForecastItemDays(forecastData) {
    return forecastData.map(forecast => (
      <ForecastItem
        key={`${forecast.weekDay}${forecast.hour}`}
        weekDay={forecast.weekDay}
        hour={forecast.hour}
        data={forecast.data}>
      </ForecastItem>
    ));
  }

  renderProgress() {
    return(<h1>Cargando pronóstico extendido</h1>);
  }

  render () {
    const {city} = this.props;
    const {forecastData} = this.state;
    return (
      <div>
        <h2>Pronóstico extendido para {city}</h2>
        {
          forecastData ?
          this.renderForecastItemDays(forecastData) :
          this.renderProgress()
        }
      </div>
    )
  }
}

ForecastExtended.proptypes = {
  city: PropTypes.string.isRequired,
}

export default ForecastExtended;
