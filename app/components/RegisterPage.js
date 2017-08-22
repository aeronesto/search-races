import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';
import axios from 'axios';


export default class RegisterPage extends Component{
  render(){
    return (
      <div>
        <DocumentTitle title={`Sign Up`}>
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <h3>Sign Up</h3>
                <hr />
              </div>
            </div>

        
        <form action="/auth/signup" method="post">
        <div className='sp-login-form'>
          <div className="row">
            <div className="col-xs-12">
              <div className="form-horizontal">

                <div className="form-group">
                  <label htmlFor="spEmail" className="col-xs-12 col-sm-4 control-label">Email</label>
                  <div className="col-xs-12 col-sm-4">
                    <input className="form-control" id="spUsername" name="username" placeholder="Username or Email" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="spPassword" className="col-xs-12 col-sm-4 control-label">Password</label>
                  <div className="col-xs-12 col-sm-4">
                    <input type="password" className="form-control" id="spPassword" name="password" placeholder="Password" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-offset-4 col-sm-4">
                    <button type="submit" className="btn btn-primary">Signup</button>
                  </div>
                </div>
                <p>Already have an account? <Link to="/login">Login</Link></p>
              </div>
            </div>
          </div>
        </div>
        </form>

          </div>
        </DocumentTitle>
      </div>
    )
  }
}