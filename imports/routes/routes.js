import { Meteor } from 'meteor/meteor';
import React from 'react';
// import { Switch, Router, Route } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import { Router, Route, browserHistory } from 'react-router';

import NotFound from '../ui/NotFound';
import LandingPage from '../ui/LandingPage';
import Dashboard from '/imports/ui/common/Dashboard'
import SignIn from '/imports/ui/SignIn/sign-in.components'

//const history = createBrowserHistory()
const unauthenticatedPages = ['/', '/signin'];
const authenticatedPages = [];

const onEnterPublicPage = () => {
  if(Meteor.userId()){
    if(Meteor.user())
    if(Meteor.user().profile)
    if(Meteor.user().profile.designation==='admin')
    {
      browserHistory.replace('/adminpanel');
    }
    else if(Meteor.user().profile.designation==='user')
    {
      browserHistory.replace('/dashboard')
    }
  }
};
const onEnterPrivatePage = () => {
  const pathname = location.pathname;
      
  if(Meteor.userId()){
    if(Meteor.user()){
      if(Meteor.user().profile.designation==='admin')
      {
        let unauthenticatedPagesLength = unauthenticatedPages.length
        unauthenticatedPages.splice(0,unauthenticatedPagesLength)
        unauthenticatedPages.push('/','/signin','/dashboard','/filteredReports','/datewiseReports','/contact','/profile')
        
      }
      else if(Meteor.user().profile.designation==='user')
      {
          let unauthenticatedPagesLength = unauthenticatedPages.length
          unauthenticatedPages.splice(0,unauthenticatedPagesLength)
          unauthenticatedPages.push('/','/signin','/adminpanel','/device','/user','/map','/editUser','/queries')
      }
     }
    if(unauthenticatedPages.includes(pathname)){
      browserHistory.replace('/')
    }
  
  }
  if(!Meteor.userId()){
    browserHistory.replace('/')
  }
};
export const onAuthChange = (isAuthenticated) => {
  const pathName = location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
  const isAuthenticatedPage = authenticatedPages.includes(pathName);
  
  if(isUnauthenticatedPage && isAuthenticated){
    if(Meteor.user()){
      if(Meteor.user().profile.designation==='admin')
      {
        browserHistory.replace('/adminpanel');
      }
      else if(Meteor.user().profile.designation==='user')
      {
        browserHistory.replace('/dashboard')
      }
    }
  }
  else if(!isAuthenticatedPage && !isAuthenticated ){
    browserHistory.replace('/')
  }
};

export const routes = (
  <Router history={browserHistory}>
  		<Route path="/" component={LandingPage} onEnter={onEnterPublicPage}/>
    	<Route path="/signin" component={SignIn} onEnter={onEnterPublicPage}/>
      
      <Route path="/adminpanel" component={Dashboard} level='admin' onEnter={onEnterPrivatePage}/>
    	<Route path="/device" component={Dashboard} level='admin' onEnter={onEnterPrivatePage}/>
      <Route path="/user" component={Dashboard} level='admin' onEnter={onEnterPrivatePage}/>
      <Route path="/editUser" component={Dashboard} level='admin' onEnter={onEnterPrivatePage}/>
      <Route path="/map" component={Dashboard} level='admin' onEnter={onEnterPrivatePage}/>
      <Route path="/queries" component={Dashboard} level='admin' onEnter={onEnterPrivatePage}/>
      
    	<Route path="/dashboard" component={Dashboard} level='user' onEnter={onEnterPrivatePage}/>
      <Route path="/filteredReports" component={Dashboard} level='user' onEnter={onEnterPrivatePage}/>
      <Route path="/datewiseReports" component={Dashboard} level='user' onEnter={onEnterPrivatePage}/>
      <Route path="/contact" component={Dashboard} level='user' onEnter={onEnterPrivatePage}/>
      <Route path="/profile" component={Dashboard} level='user' onEnter={onEnterPrivatePage}/>
      
      <Route exact path="*" component={NotFound}/>
  </Router>
);
