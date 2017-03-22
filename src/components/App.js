import React from 'react';
import axios from 'axios';

import Header from './Header';
import Input from './Input';
import Bars from './Bars';

import '../scss/main.scss';

if(module.hot) {
    module.hot.accept();
    console.log('That\'s hot');
}

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            last_search: undefined,
            bars: undefined
        };
    }

    handleLocationSubmit(location, event) {
        event.preventDefault();

        //console.log(location);

        var _this = this;

        //if the input field is empty, exit early
        if(!location)
            return;

        // if the user searched for the same location twice, exit early
        if(location === this.state.last_search)
            return;

        this.setState({ bars: undefined });
        setTimeout(function() {
            _this.setState({ bars: 'loading', last_search: location });
        }, 200);

        var location_enc = location.split(' ').join('+');

        axios.post('/api/location_search', { location: location_enc } )
        .then(function(response) {
            _this.setState({bars: undefined});

            setTimeout(function() {
                _this.setState({ bars: response.data.businesses });
            }, 200);
        });
    }

    render() {

        return (
            <div className='app'>
                <Header />
                <Input handleLocationSubmit={this.handleLocationSubmit.bind(this)} />
                <div className={'buffer'} />
                <Bars bars={this.state.bars} />
            </div>
        );
    }
}