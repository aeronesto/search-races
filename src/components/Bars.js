import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Bar from './Bar';

export default class Bars extends React.Component {

    render() {

        //console.log('IN BARS: ', this.props.bars);

        var bars = undefined;
        if(this.props.bars && this.props.bars !== 'loading') {
            bars = this.props.bars.map(function(bar, i) {
                return (
                    <Bar image_url={bar.image_url} name={bar.name} price={bar.price} rating={bar.rating} url={bar.url} key={bar.id} />
                );
            })
            //console.log(bars);
        } else if(this.props.bars === 'loading') {
            bars = [<Bar loading={'loading'} key='loading' />];
        }

        //console.log(bars);

        return (
            <div className='bars'>
                <ReactCSSTransitionGroup
                    transitionName='bars'
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}>
                    {bars}
                </ReactCSSTransitionGroup>
            </div>
        );
    }

}