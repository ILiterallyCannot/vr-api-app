import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ListElement from './ListElement'
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
                        {
                            <ListElement
                                list={this.props.arrivals}
                            />
                        }
                    </TabPanel>
                    <TabPanel>
                        <div className='headerContainer'>
                            <div>Juna</div>
                            <div>Lähtöasema</div>
                            <div>Pääteasema</div>
                            <div>Lähtee</div>
                        </div>
                        {
                            <ListElement
                                list={this.props.departures}
                            />
                        }
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}
export default ScheduleList;
