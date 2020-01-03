import React from 'react';
import './c.css';
import {withTracker} from 'meteor/react-meteor-data';

class Contact extends React.Component{
	constructor(){
		super();
		this.state={
			user:'user'
		}
	}
	componentDidMount(){
		if(this.refs.name.value===''){
			this.refs.name.readOnly=false
			this.refs.email.readOnly=false
			this.refs.mobile.readOnly=false
			this.setState({user:'audience'})
		}
	}
	handleSubmit(event){
		event.preventDefault();
		
		Meteor.call('query.insert', this.refs.name.value, this.refs.email.value, this.refs.mobile.value, this.refs.subject.value.trim(), this.refs.message.value.trim(), this.state.user, (err)=>{
			if(err)
				alert('Some error occured. Please try again!')
			else{
				if(this.refs.name.value===''){
					this.refs.name.value='',
					this.refs.email.value='',
					this.refs.mobile.value=''
				}
				this.refs.subject.value='',
				this.refs.message.value='',
				alert('Your enquiry has been saved. Thanks for submitting the enquiry!')
			}
		})
	}
	render(){
		
		return(
			<div>
			 <section className="Material-contact-section section-padding section-dark">
      <div className="container">
          <div className="row">
              <div className="col-md-12 wow animated fadeInLeft" data-wow-delay=".2s">
                  <h1 className="section-title">We would Love to Hear From You</h1>
              </div>
          </div>
          <div className="row">
              <div className="col-md-6 mt-3 contact-widget-section2 wow animated fadeInLeft" data-wow-delay=".2s">
                <p>We would love to get in touch with you to provide you high quality service, as promised. Please fill in the form and someone from our team will get in touch with you soon!</p>
                <br/>
                <div className="find-widget">
                 Company:  <a href="#">Feedback-Systems</a>
                </div>
                <br/>
                <div className="find-widget">
                 Address: <a href="#">Gujarat, India</a>
                </div>
                <br/>
                <div className="find-widget">
                  Phone:  <a href="#">+91- XXX-XXX-XXXX</a>
                </div>
                <br/>
                <div className="find-widget">
                  Website:  <a href="#">www.feedbacksystems.com</a>
                </div>
                <br/>
                
              </div>
              <div className="col-md-6 wow animated fadeInRight" data-wow-delay=".2s">
                  <form className="shake" role="form" id="contactForm" onSubmit={this.handleSubmit.bind(this)}>
                      <div className="form-group label-floating">
                        <label className="control-label" >Name</label>
                        <input className="form-control" type="text" ref="name" required data-error="Please enter your name" value={Meteor.user()?Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname : undefined} readOnly/>
                        <div className="help-block with-errors"></div>
                      </div>
                      <div className="form-group label-floating">
                        <label className="control-label" >Email</label>
                        <input className="form-control"  type="email" ref="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title='xxx@xxx.domain' required data-error="Please enter your Email" value={Meteor.user()?Meteor.user().emails[0].address : undefined} readOnly/>
                        <div className="help-block with-errors"></div>
                      </div>
                      <div className="form-group label-floating">
                        <label className="control-label" >Mobile number</label>
                        <input className="form-control"  type="text" ref="mobile" pattern="[6-9]{1}[0-9]{9}" title="10 digit valid mobile number" required data-error="Please enter your mobile" value={Meteor.user()?Meteor.user().profile.mobile : undefined} readOnly/>
                        <div className="help-block with-errors"></div>
                      </div>
                      <div className="form-group label-floating">
                        <label className="control-label">Subject</label>
                        <input className="form-control"  type="text" ref="subject" required data-error="Please enter your message subject"/>
                        <div className="help-block with-errors"></div>
                      </div>
                      <div className="form-group label-floating">
                          <label className="control-label">Message</label>
                          <textarea className="form-control" rows="3" ref="message" required data-error="Write your message"></textarea>
                          <div className="help-block with-errors"></div>
                      </div>
                      <div className="form-submit mt-5">
                          <input type='submit' className="btn btn-primary" type="submit" id="form-submit" value='Send Message'/>
                          <div id="msgSubmit" className="h3 text-center hidden"></div>
                          <div className="clearfix"></div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    </section>
			</div>
		)
	}
}

export default withTracker(()=>{
	Meteor.subscribe('users');
	return{
		user : Meteor.users.find().fetch()
	}
})(Contact)