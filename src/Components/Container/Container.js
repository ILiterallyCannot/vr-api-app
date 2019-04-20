import React, { Component } from 'react';
import './Container.css';
import ScheduleList from '../ScheduleList/ScheduleList';
import Search from '../Search/Search';

class Container extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            stations: {},
            arrivals: {},
            departures: {}
        };
    }

    getStations = () => {
        //Asemien nimet ja lyhenteet
        const url = 'https://rata.digitraffic.fi/api/v1/metadata/stations';
        fetch(url) //
            .then(response => response.json())
            .then(data => {
                let stations = {};
                Object.keys(data).forEach(key => {
                    stations = {
                        ...stations,
                        [data[key].stationName]: {
                            short: data[key].stationShortCode
                        }
                    };
                });
                this.setState({
                    stations
                });
            });
    };

    getStationInfo = selection => {
        //Junat
        console.log(this.state.stations[selection].short);
        const station = this.state.stations[selection].short;
        const url = `http://rata.digitraffic.fi/api/v1/live-trains/station/${station}?minutes_before_departure=360&minutes_before_arrival=360`;
        fetch(url) //
            .then(response => response.json())
            .then(data => {
                this.parseData(data, station);
            });
    };

    parseData = (data, station) => {
        let arrivalList = [];
        let departureList = [];
        let arrivalId = 0;
        let departureId = 0;

        data.forEach(train => {
            train.timeTableRows.forEach(element => {
                //Saapuvat
                if (element.stationShortCode === station && element.type === 'ARRIVAL') {
                    let trainObj = {
                        id: arrivalId,
                        type: `${train.trainType} ${train.trainNumber}`,
                        start: Object.keys(this.state.stations).filter(x =>
                                this.state.stations[x].short ===
                                train.timeTableRows[0].stationShortCode
                        ),
                        end: Object.keys(this.state.stations).filter( x =>
                                this.state.stations[x].short ===
                                train.timeTableRows[train.timeTableRows.length - 1].stationShortCode
                        ),
                        time: element.scheduledTime.substr(11, 5)
                    };
                    arrivalList.push(trainObj);
                    arrivalId++;
                }
                //Lähtevät
                if (element.stationShortCode === station && element.type === 'DEPARTURE') {
                    let trainObj = {
                        id: departureId,
                        type: `${train.trainType} ${train.trainNumber}`,
                        start: train.timeTableRows[0].stationShortCode,
                        end: Object.keys(this.state.stations).filter(x =>
                                this.state.stations[x].short ===
                                train.timeTableRows[train.timeTableRows.length - 1].stationShortCode
                        ),
                        time: element.scheduledTime.substr(11, 5)
                    };
                    departureList.push(trainObj);
                    departureId++;
                }
            });
        });
        this.setState({
            arrivals: arrivalList,
            departures: departureList
        });
    };

    handleClickedOption = event => {
        this.getStationInfo(event.target.textContent);
    };

    componentWillMount() {
        this.getStations();
    }
    render() {
        return (
            <div className='container'>
                <div className='header'>
                    <p>Aseman junatiedot</p>
                </div>
                <Search
                    stations={this.state.stations}
                    passClick={this.handleClickedOption}
                />
                <ScheduleList
                    arrivals={this.state.arrivals}
                    departures={this.state.departures}
                />
            </div>
        );
    }
}

export default Container;
