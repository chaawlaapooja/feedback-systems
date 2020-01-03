import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import './main.html';
import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(()=>{
	ReactDOM.render(routes, document.getElementById('react-target'))
})
