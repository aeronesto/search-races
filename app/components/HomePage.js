import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

import Input from './Input';
import Races from './Races';

import '../scss/main.scss';

class HomePage extends Component {

		constructor(props) {
				super(props);

				// Prevents rendering of HomePage after user toggles 'going'
				if(localStorage.getItem('currentState')) {
					// when HomePage is rerendered after authentication

					var _this = this;
					// set location to last known search
					var location = JSON.parse(localStorage.getItem('currentState')).last_search;

					// format location to send to yelp location search
					var location_enc = location.split(' ').join('+');

					axios.post('/api/location_search', {location: location_enc})
						.then(function (response) {
							// response from post contains events (races) data		

							// 'this' is a different object so _this is used
							_this.setState({races: response.data.businesses, last_search: location});
						});
					// set the state without remounting component
					this.state = JSON.parse(localStorage.getItem('currentState'));
				}
				else {
					// when HomePage is rerendered for another reason
					this.state = {
						last_search: undefined,
						races: undefined
					};
				}

		}

		handleGOINGOnClick(venueID, event) {
			event.preventDefault();
			var _this = this;

			axios.post('/api/toggle_going', { venueID: venueID })
				.then(function(response) {

					if(response.data.success) {

						var newRaces = _this.state.races.map(function(race) {
							if(race.venueID === response.data.business.venueID) {
								//console.log('Response Data: ', response.data.business);
								race.number_of_users_going = response.data.business.number_of_users_going;
								race.users_going = response.data.business.users_going.slice();
								race.current_user_going = response.data.current_user_going;
								return race;
							}
							else
								return race;
						})

						_this.setState({
								races: newRaces
							}
						)
					
					} else {
							// console.log(response.data);

							//save current state for when redirected back from google
							localStorage.setItem('currentState', JSON.stringify({ races: _this.state.races, last_search: _this.state.last_search }));

							_this.props.router.push('/login');

					}
				});


		}

		handleLocationSubmit(location, event) {
				event.preventDefault();

				var _this = this;

				//if the input field is empty, exit early
				if (!location)
					return;

				// if the user searched for the same location twice, exit early
				if (location === this.state.last_search)
					return;

				this.setState({races: undefined});
				setTimeout(function () {
						_this.setState({races: 'loading', last_search: location});
				}, 200);

				var location_enc = location
					.split(' ')
					.join('+');

				axios
					.post('/api/location_search', {location: location_enc})
					.then(function (response) {
							_this.setState({races: undefined});
							setTimeout(function () {
								_this.setState({races: response.data.businesses});
							}, 200);
					});
		}

		render() {

				return (
					<div className='app'>
						<Input handleLocationSubmit={this.handleLocationSubmit.bind(this)} />
						<div className={'buffer'}/>
						<Races races={this.state.races} handleGOINGOnClick={this.handleGOINGOnClick.bind(this)}/>
					</div>
				);
		}
}


export default withRouter(HomePage);