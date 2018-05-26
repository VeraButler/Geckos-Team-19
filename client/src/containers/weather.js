import React, { Component } from 'react';
import TempButton from '../components/tempButton';
import { FadeIn, Bounce, Div, ItemTemp, CityNameInputWrap, TempBtnWrap, Icon, WeatherWrap, InfoList, InfoItem, CityName,  ReturnedState,  ListItems, MiddleWeather } from '../styles/--weather';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/api';
import { store } from '../actions/store';
// import Input from '../container/locationSearch';
import '../styles/weather-icons/css/weather-icons.css';
import CitySearch from '../container/citySearch';
import ThreeDayForecast from '../components/threeDayForcast';

//put a timeout on a function that renders the display of the weather
//outside of the main rendom method
class Weather extends Component {


    constructor(props) {
        super(props);
        this.state = {
            error: null,
            tempKind: false,
        }
        this.handleTempChange = this.handleTempChange.bind(this);
        
    }

 
    
    
    handleTempChange = (event) => {
        
        this.setState(prevState => ({
            tempKind: !prevState.tempKind
        }));
    }
    returnTemp = () => {
        if(this.state.tempKind === false){
            return store.getState().temp.day1F
        } else {
            return store.getState().temp.day1C;
        }
    }
 
    componentDidMount() {
        console.log(this.props);
        let options = {
            enableHighAccuracy: true,
            timeout: 3000,
            maximumAge: Infinity
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.props.fetchWeather(
                    position.coords.longitude,
                    position.coords.latitude);
                this.setState({ error: false });
            },
            (err) => {
                this.setState({ error: true });
            },
            options
        );
        
    }
    

    render() {
        let passStore = store.getState();
        if (this.state.error === false || store.getState().main.humidity > 0) {
            return (
                <Div>
                        <ListItems>
                           <MiddleWeather>
                            <CitySearch/>
                            <FadeIn>                        
                                <CityName>{store.getState().main.city}</CityName>
                            </FadeIn>
                          </MiddleWeather>
                        </ListItems>
                        {/* <FadeIn>
                        <TempBtnWrap>
                            <ItemTemp>
                              {this.returnTemp()}
                            </ItemTemp>
                            <TempButton
                               onClick={this.handleTempChange}
                               tempkind={this.state.tempKind ? 'wi wi-celsius' : 'wi wi-fahrenheit'} />
                                <Icon>
                                <i className={store.getState().main.icon}></i>
                                </Icon>
                                <ReturnedState> {store.getState().main.main}</ReturnedState>
                         </TempBtnWrap>
                         </FadeIn> */}
                         <ThreeDayForecast/>
                </Div>
            )
      } else if (this.state.error === true) {
            return (
                <Bounce>
                <CitySearch/>
                </Bounce>
                )
      } else {
            return null;
        }
    }
}

function mapStateToProps(state) {
    return {
        temp: state.temp
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ fetchWeather }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather)