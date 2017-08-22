import React from 'react';

const gear = require('../../images/gear.png');

export default class Race extends React.Component {

		render() {

				if (this.props.loading === 'loading') {
						return (
								<div>
										<img src={gear} className={'spinning-gear'}/>
								</div>
						);
				}

				var currentUserButton = undefined;
				if(this.props.race.current_user_going) {
					currentUserButton = (
						<span className={'number-going current'}>
							{this.props.race.number_of_users_going || 0}
						</span>
					);
				} else {
					currentUserButton = (
						<span className={'number-going'}>
							{this.props.race.number_of_users_going || 0}
						</span>
					);
				}

				return (
						<div className='race-card'>
								<a className={'race-image-link'} href={(this.props.race.url || '#')} target='_blank'>
										<img src={this.props.race.image_url} className={'race-image'}/>
								</a>
								<div className={'race-info'}>
										<div className={'race-info-name'}>
												<b>{this.props.race.name}</b>
										</div>
										<div className={'race-info-item'}>{'Reviews: ' + this.props.race.reviews}</div>
										<div className={'race-info-item'}>{'Rating: ' + this.props.race.rating}</div>
								</div>
								<button className={'going-button'} onClick={this.props.handleGOINGOnClick.bind(this, this.props.race.venueID)} >
									{currentUserButton}GOING
								</button>
						</div>
				);
		}

}