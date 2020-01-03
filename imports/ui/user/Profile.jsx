import React from 'react';
import {withTracker} from 'meteor/react-meteor-data'

class Profile extends React.Component{
	constructor(){
		super();
		this.state={
			error:'',
			gst:''
		}
	}
	save(event){
		event.preventDefault();
		Meteor.call('user.update',
			this.refs.username.value.trim(),
			this.refs.mobile.value,
			this.refs.altmobile.value,
			this.refs.companyname.value.trim(),
			this.refs.companygst.value,
			this.refs.companyaddress.value.trim(),
			this.refs.companydetails.value.trim(),
			(err,result)=>{
				if(err)
					this.setState({error:err.reason})
				else{
					alert('Information updated successfully')
				}
			})
	}
	checkGST(){
		this.refs.companygst.value=this.refs.companygst.value.toUpperCase()
	    let result = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/.test(this.refs.companygst.value)
    	result && this.refs.companygst.value.length===15 ? this.setState({gst:''}):this.setState({gst:'Please enter correct GST'})
	}
	render(){
		return(
			<div>
				<div className="card o-hidden border-0 shadow-lg my-5">
      <div className="card-body p-0">
        
        <div className="row">
          <div className="col-lg-12 d-none d-lg-block bg-register-image"></div>
          <div className="col-lg-12">
            <div className="p-5" style={{padding:'1rem'}}>
              <div className="text-center">
                <h1 className="h4 text-gray-900 mb-4">Edit Your Profile Here!</h1>
              </div>
              <span>{this.state.error?<p style={{color:'red'}}>{this.state.error}</p>:undefined}</span>
              <form className="user" onSubmit={this.save.bind(this)}>
                <div className="form-group row">
                  <div className="col-sm-4 mb-3 mb-sm-0">
                    <input type="text" className="form-control form-control-user" ref="username" value={Meteor.user()?Meteor.user().username:undefined} readOnly/>
                  </div>
                  <div className="col-sm-4 mb-3 mb-sm-0">
                    <input type="text" className="form-control form-control-user" ref="firstname" placeholder="First Name" pattern="[a-zA-Z].{1,}" title='Enter two or more characters' value={Meteor.user()?Meteor.user().profile.firstname:undefined} readOnly required/>
                  </div>
                  <div className="col-sm-4 mb-3 mb-sm-0">
                    <input type="text" className="form-control form-control-user" ref="lastname" placeholder="Last Name" pattern="[a-zA-Z].{1,}" title='Enter two or more characters' value={Meteor.user()?Meteor.user().profile.lastname:undefined} readOnly required/>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-4 mb-3 mb-sm-0">
                    <input type="tel" className="form-control form-control-user" ref="mobile" placeholder="Mobile Number" pattern="[6-9]{1}[0-9]{9}" title="10 digit valid mobile number" defaultValue={Meteor.user()?Meteor.user().profile.mobile:undefined} required/>
                  </div>
                  <div className="col-sm-4 mb-3 mb-sm-0">
                    <input type="tel" className="form-control form-control-user" ref="altmobile" placeholder="Alternate Mobile Number" pattern="[6-9]{1}[0-9]{9}" title="10 digit valid mobile number" defaultValue={Meteor.user()?Meteor.user().profile.altmobile:undefined}/>
                  </div>
                  <div className="col-sm-4 mb-3 mb-sm-0">
                    <input type="email" className="form-control form-control-user" ref="email" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title='xxx@xxx.domain' value={Meteor.user()?Meteor.user().emails[0].address:undefined} readOnly required/>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input type="text" className="form-control form-control-user" ref="companyname" placeholder="Company Name" placeholder="Company Name" pattern="[a-zA-Z].{1,}" title='Enter two or more characters' defaultValue={Meteor.user()?Meteor.user().profile.companyname:undefined} required/>
                  </div>
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input type="text" className="form-control form-control-user" ref="companygst" placeholder="Company GST Number" onKeyUp={()=>this.checkGST()} title='15 digit GST Number' defaultValue={Meteor.user()?Meteor.user().profile.companygst:undefined} required/>
                  </div>
                  <span>{this.state.gst?<p style={{color:'red'}}>{this.state.gst}</p>:undefined}
                </span>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control form-control-user" ref="companyaddress" placeholder="Company Address" defaultValue={Meteor.user()?Meteor.user().profile.companyaddress:undefined} required/>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control form-control-user" ref="companydetails" placeholder="Company Details" defaultValue={Meteor.user()?Meteor.user().profile.companydetails:undefined}/>
                </div>
                <input type='submit' value='Save Changes' className="btn btn-primary btn-user btn-block"/>
                <hr/>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
			</div>
		)
	}
}

export default withTracker(()=>{
	Meteor.subscribe('users');
	return{
		user:Meteor.users.find().fetch()
	}
})(Profile)