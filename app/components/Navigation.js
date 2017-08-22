import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';


export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {isLoggedIn: false};
    var _this = this;
    axios.post('/auth/get_user')
      .then(function(res){
        let isLoggedIn = (res.data.success);
        _this.setState({isLoggedIn: isLoggedIn});
      })
  }

  handleOnClick(event) {
    event.preventDefault();
    var _this = this;

    axios.get('/logout')
      .then(function(res){
        _this.setState({isLoggedIn: false})
      });
  }

  render(){
    const isLoggedIn = this.state.isLoggedIn;
    let options = null;
    if (isLoggedIn) {
      options = <ul className="nav navbar-nav navbar-right smooth-scroll">
                <li><button onClick={this.handleOnClick.bind(this)}>Logout</button></li>
                </ul>;
    } else {
      options = <ul className="nav navbar-nav navbar-right smooth-scroll">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
                </ul>;
    }

    return (
      <div className="navbar navbar-inverse navbar-sticky navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand">Local Races</Link>
          </div>
          <div className="navbar-collapse collapse">
            {options}
          </div>
        </div>
      </div>
    );
  }
}
