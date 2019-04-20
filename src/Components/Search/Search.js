import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            filteredData: [],
            display: 'none'
        };
    }

    componentDidMount() {
        document.addEventListener('click', event => {
            if (event.target.tagName === 'INPUT') {
                this.setState({
                    display: 'block'
                });
            } else {
                this.setState({
                    display: 'none'
                });
            }
        });
    }

    handleClick = event => {
        this.props.passClick(event);
        this.setState({
            value: event.target.innerText
        });
    };

    handleChangeValue = event => {
        this.setState({
            value: event.target.value
        });
        if (event.target.value.length <= 0) {
            this.setState({
                filteredData: Object.keys(this.props.stations)
            });
        } else {
            const filtered = Object.keys(this.props.stations).filter(asema =>
                new RegExp('^' + event.target.value, 'i').test(asema)
            );
            this.setState({
                filteredData: filtered
            });
        }
    };

    render() {
        return (
            <div className='search'>
                <label>Hae aseman nimellä</label>
                <form>
                    <input
                        id='searchBar'
                        placeholder='Aseman nimi'
                        value={this.state.value}
                        onChange={this.handleChangeValue}
                    />
                </form>
                <div>
                    <div
                        className='suggestions'
                        style={{ display: `${this.state.display}` }}
                    >
                        {this.state.filteredData.map(station => (
                            <p
                                key={station}
                                onClick={this.handleClick}
                                className='option'
                            >
                                {station}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
