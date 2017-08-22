import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Race from './Race';

export default class Races extends React.Component {

    render() {

		var _this = this;

        var races = undefined;

        if(this.props.races && this.props.races !== 'loading') {
            races = this.props.races.map(function(race, i) {
                return (
                    <Race race={race} key={race.venueID} handleGOINGOnClick={_this.props.handleGOINGOnClick.bind(_this)} />
                );
            })
            //console.log(races);
        } else if(this.props.races === 'loading') {
            races = [<Race loading={'loading'} key='loading' />];
        }

        //console.log(races);

        return (
            <div className='races'>
                <ReactCSSTransitionGroup
                    transitionName='races'
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}>
                    {races}
                </ReactCSSTransitionGroup>
            </div>
        );
    }

}