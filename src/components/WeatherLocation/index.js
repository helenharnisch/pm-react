import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import Location from './Location';
import WeatherData from './WeatherData';
import transformWeather from './../../services/transformWeather';
// import './styles.css';

//Creando const para llamar api
const api_key = "631deffc7b3dc563f3a19aea3aa586d2";
// const location = 'Santiago, scl';
const url = 'https://api.openweathermap.org/data/2.5/weather';
// const api_weather = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}&units=metric`;



/*el component es una creacion de react para poder escribir constructores de clases
usa javascript, permite que react lo reconozca*/
class WeatherLocation extends Component {
  constructor({city}) {
    super();
    this.state = {
      city,
      data: null
    }
    console.log('constructor');
  }
  // Esto se va al archivo transformWeather
  /*
  getWeatherState = weather => {
    return SUN;
  }
  getData = (weather_data) => {
    const {humidity, temp} = weather_data.main;
    const {speed} = weather_data.wind;
    const weatherState = this.getWeatherState(this.weather);
    const data = {
      humidity,
      temperature: temp,
      weatherState,
      wind: `${speed} m/s`
    }
    return data;
  }
  */
  // Reemplazamos handleUpdateClick por nuestro componente componentWillMount
  componentWillMount = () => {
    const {city} = this.state
    const api_weather = `${url}?q=${city}&appid=${api_key}&units=metric`;

    fetch(api_weather).then(data => {
      return data.json();
    }).then(weather_data => {
      const data = transformWeather(weather_data);
      this.setState({data})
    })
  }
  // Ocuparemos componentWillMount ya que se ejecuta antes del render
  /* componentWillMount() {
    this.handleUpdateClick();
  } Lo dejo comentado, se llamó arriba*/

  render = () => {
    const {onWeatherLocationClick} = this.props;
    const {city, data} = this.state;
    return(
    <div className='weatherLocation' onClick = {onWeatherLocationClick}>
      <Location city = {city}/>
      {data ? <WeatherData data = {data} /> : <CircularProgress size={60} thinckness={7}/>}
    </div>
    );
  }
}

// ? = null
/*const WeatherLocation = () => (
    <div className='weatherLocation'>
      <Location city = {'Santiago!!'}/>
      <WeatherData data = {data} />
    </div>
  )
*/

WeatherLocation.propTypes = {
  city: PropTypes.string.isRequired,
  onWeatherLocationClick: PropTypes.func,
}

export default WeatherLocation;
