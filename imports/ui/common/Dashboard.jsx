import React from 'react';
import { Link } from 'react-router';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';

import Device from '../admin/Device'
import User from '../admin/User'
import EditUser from '../admin/EditUser'
import Mapp from '../admin/Mapp'
import Queries from '../admin/Queries'

import UserDashboard from '../user/UserDashboard';
import FilteredReports from '../user/FilteredReports';
import DatewiseReports from '../user/DatewiseReports';
import Contact from '../user/Contact';
import Profile from '../user/Profile'

import {withTracker} from 'meteor/react-meteor-data'

class Dashboard extends React.Component{
componentDidMount(){
!function(t){"use strict";t("#sidebarToggle, #sidebarToggleTop").on("click",function(o){t("body").toggleClass("sidebar-toggled"),t(".sidebar").toggleClass("toggled"),t(".sidebar").hasClass("toggled")&&t(".sidebar .collapse").collapse("hide")}),t(window).resize(function(){t(window).width()<768&&t(".sidebar .collapse").collapse("hide")}),t("body.fixed-nav .sidebar").on("mousewheel DOMMouseScroll wheel",function(o){if(768<t(window).width()){var e=o.originalEvent,l=e.wheelDelta||-e.detail;this.scrollTop+=30*(l<0?1:-1),o.preventDefault()}}),t(document).on("scroll",function(){100<t(this).scrollTop()?t(".scroll-to-top").fadeIn():t(".scroll-to-top").fadeOut()}),t(document).on("click","a.scroll-to-top",function(o){var e=t(this);t("html, body").stop().animate({scrollTop:t(e.attr("href")).offset().top},1e3,"easeInOutExpo"),o.preventDefault()})}(jQuery);
}
renderComponent(){
	let component = this.props.route.path.slice(1);
	let status = Meteor.user()?Meteor.user().profile.status:undefined
	if(status==='blocked' && component!=='contact')
		return <div><span style={{fontSize:'100px'}}>&#128531;</span><br/>
				<h5>OOOPS! You're blocked and we're so sorry to hear that. Please contact admin directly or fill up the contact form</h5></div>
	else if(component==='adminpanel')
		return <h1 style={{lineHeight:'50px'}} className="h3 mb-4 text-gray-800">Hello Admin! Welcome! <br/> Navigate to the links aside</h1>
	else if(component==='device')
		return <Device />
	else if(component==='user')
		return <User />
	else if(component==='editUser')
		return <EditUser />
	else if(component==='map')
		return <Mapp />
	else if(component==='queries')
		return <Queries />
	else if(component==='dashboard')
		return <UserDashboard />
	else if(component==='filteredReports')
		return <FilteredReports />
	else if(component==='datewiseReports')
		return <DatewiseReports />
	else if(component==='contact')
		return <Contact />
	else if(component==='profile')
		return <Profile />	
}
render(){
  return (
    <div id="page-top">
    	<div id="wrapper">
    	<Sidebar level={this.props.route.level}/>
    	<div id="content-wrapper" className="d-flex flex-column">
		 <div id="content">
		 	<Topbar/>
		 	<div className="container-fluid">
		 		{this.renderComponent()}
		 	</div>
		 </div>
		 <Footer/>
		 </div>
		 </div>
	</div>
  );
}
};

export default withTracker(()=>{
	Meteor.subscribe('users');
	return{
		user:Meteor.user()
	}
})(Dashboard)
