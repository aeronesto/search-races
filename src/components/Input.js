import React, { Component } from 'react';

export default class Input extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: ''
        };
    }

    handleInputField(event) {
        this.setState({ location: event.target.value });
    }

    render() {
        return (
            <form className={'input-container'}>
                <input onChange={this.handleInputField.bind(this)} type={'text'} className={'location-input'} placeholder={'enter a location...'} autoFocus={true} />
                <button onClick={this.props.handleLocationSubmit.bind(this, this.state.location)} type={'submit'} className={'go-button'}>GO</button>
            </form>
        );
    }
}