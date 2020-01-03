import React from 'react';
import Accounts from './Accounts'
import {withTracker} from 'meteor/react-meteor-data';

const Topbar = () =>(
	<nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

          <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
            <i className="fa fa-bars"></i>
          </button>
          <p style={{margin:'0%'}}>{Meteor.user()?`Hello, ${Meteor.user().profile.firstname} ${Meteor.user().profile.lastname}`:''}</p>
          

          <ul className="navbar-nav ml-auto">
    			  <li className="nav-item dropdown no-arrow">
              <Accounts/>
            </li>
    		  </ul>

        </nav>
)

export default withTracker(()=>{
  Meteor.subscribe('users')
  return{
    user : Meteor.users.find().fetch()
  }
})(Topbar)