import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './ScheduleList.css';

class ScheduleList extends Component {
    constructor() {
        super();
        this.state = { tabIndex: 0 };
    }

    render() {
        return (
            <div className='scheduleList'>
                <Tabs
                    selectedIndex={this.state.tabIndex}
                    onSelect={tabIndex => this.setState({ tabIndex })}
                >
                    <TabList>
                        <Tab>Saapuvat</Tab>
                        <Tab>Lähtevät</Tab>
                    </TabList>
                    <TabPanel>
                        <div className='headerContainer'>
                            <div>Juna</div>
                            <div>Lähtöasema</div>
                            <div>Pääteasema</div>
                            <div>Saapuu</div>
                        </div>
                        {this.props.arrivals.length > 0 &&
                            this.props.arrivals.map(train => (
                                <div key={train.id} className='trainSchedule'>
                                    <div>{train.type}</div>
                                    <div>{train.start}</div>
                                    <div>{train.end}</div>
                                    <div>{train.time}</div>
                                </div>
                            ))}
                    </TabPanel>
                    <TabPanel>
                        <div className='headerContainer'>
                            <div>Juna</div>
                            <div>Lähtöasema</div>
                            <div>Pääteasema</div>
                            <div>Lähtee</div>
                        </div>
                        {this.props.departures.length > 0 &&
                            this.props.departures.map(train => (
                                <div key={train.id} className='trainSchedule'>
                                    <div>{train.type}</div>
                                    <div>{train.start}</div>
                                    <div>{train.end}</div>
                                    <div>{train.time}</div>
                                </div>
                            ))}
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}
export default ScheduleList;
