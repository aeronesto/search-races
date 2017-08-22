import React from 'react';

// at the top of every page is the navigation bar:
import Navigation from './Navigation';

// The component that will be re-rendered is:
// {this.props.children}


export default class Layout extends React.Component{
  render(){
    return(
      <section className="page">
        <Navigation/>
        <section>
          {this.props.children}
        </section>
      </section>
    );
  }
}
