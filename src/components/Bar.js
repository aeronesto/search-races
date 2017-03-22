import React from 'react';

const gear = require('../../images/ic_gear_white_24dp_2x.png');

export default class Bar extends React.Component {

    render() {

        if(this.props.loading === 'loading') {
            return (
                <div>
                    <img src={gear} className={'spinning-gear'} />
                </div>
            );
        }

        return (
            <div className='bar-card' >
                <a className={'bar-image-link'} href={(this.props.url || '#')} target='_blank'>
                    <img src={this.props.image_url} className={'bar-image'} />
                </a>
                <div className={'bar-info'}>
                    <div className={'bar-info-name'}>{this.props.name}</div>
                    <div className={'bar-info-item'}>{'Price: ' + this.props.price}</div>
                    <div className={'bar-info-item'}>{'Rating: ' + this.props.rating}</div>
                </div>
                <button className={'going-button'}><span className={'number-going'}>{this.props.num_going || (Math.floor(Math.random() * 1000))}</span>GOING</button>
            </div>
        );
    }

}