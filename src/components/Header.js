import React from 'react';

const pin =     require('../../images/ic_room_white_24dp_2x.png');
const taxi =    require('../../images/ic_local_taxi_white_24dp_2x.png');
const wine =    require('../../images/ic_local_bar_white_24dp_2x.png');
const github =  require('../../images/github_icon.png');
const yelp =    require('../../images/yelp_fullcolor.png');

export default class Header extends React.Component {
    render() {
        return (
            <div className='header'>
                <h1>Plans tonight?</h1>
                <div style={{'display':'block'}}>
                    <img src={pin} />
                    <img src={taxi} />
                    <img src={wine} />
                    <a className={'github-link'} href={'https://github.com/JordanSobovitch/nightlife-app'} target={'_blank'}>
                        <img src={github} className={'github'} onDragStart={function() {return false;}} />
                    </a>
                </div>
                <h4>See which bars are hoppin' tonight and RSVP ahead of time!<br/>
                Remember: take a cab and drink responsibly<br/></h4>
                <h4>Results from <a href={'https://www.yelp.com'} target={'_blank'} ><img src={yelp} className={'yelp-logo'} /></a></h4>
            </div>
        );
    }
}