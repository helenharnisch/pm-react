import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
//import { createStore } from 'redux';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import LocationList from './components/LocationList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import  { setCity } from './actions';
//import  { store } from './store';

import ForecastExtended from './components/ForecastExtended';
const cities = [
  'Santiago,scl',
  'Buenos Aires,ar',
  'Bogotá,col',
  'Ciudad de México,mx',
  'Madrid,es',
  'Rio de Janeiro,br',
  'London,uk'
];

//const store = createStore(() => {}, window.__REDUX_DEVTOOLS_EXTENSION__&&
// window.__REDUX_DEVTOOLS_EXTENSION__());

/*const setCity = value => ({
   type: 'setCity',
   value
 })*/

class App extends Component {
  constructor() {
    super();
    this.state = {
      city: null
    }
  }

  hadlerSelectionLocationClick = city =>{
    this.setState({city})
    console.log('hadlerSelectionLocationClick ${click}');

    //const action = {type:'setState', value: city}
    //store.dispatch(setCity(city));
    this.props.setCity(city);
  }


render() {
  const { city } =this.state;
  return (
    <MuiThemeProvider>
      <Grid>
        <Row>
      <Col xs={12}>
            <AppBar title='Belu'></AppBar>
          </Col>
        </Row>
        <Row>
        <Col xs={12} md={6}>
          <LocationList cities={cities}
          onSelectedLocation={this.
            hadlerSelectionLocationClick}/>
        </Col>
        <Col xs={12} md={6}>
          <Paper zDepth={4}>
           <div className='detail'>
             {
               city === null ? <h1>No se seleccionó ciudad</h1> :
               <ForecastExtended city={ city }></ForecastExtended>
             }

          </div>
          </Paper>
        </Col>
        </Row>
      </Grid>
    </MuiThemeProvider>
  );
}
}
//const mapDispatchTopropsActions = dispatch => ({
//const componentConnected = connect(null, mapDispatchTopropsActions)(app)
const mapDispatchTopropsActions = dispatch => ({
  setCity: value => dispatch(setCity(value))
});

 const AppConnected = connect(null, mapDispatchTopropsActions)(App)


export default AppConnected;
