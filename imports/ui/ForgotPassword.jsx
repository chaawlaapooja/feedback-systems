import React from 'react';
import {Link, browserHistory} from 'react-router';
import {withTracker} from 'meteor/react-meteor-data';
import '/imports/css/sb-admin2.min.css';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error:''
    };
  }
  handleSubmit(event){
  	event.preventDefault();
  	let user = this.props.userList.filter(user=>user.emails[0].address===this.refs.email.value.trim())
    if(user.length===0){
    	this.setState({error:'No user found with such email address'})
    }
    else{
    	Meteor.call('user.resetPassword', user[0]._id, (err)=>{
    		if(err)
    			this.setState({error:err.reason})
    		else{
    			this.setState({error:''})
    			alert("Your new password is - 123456 \nPlease change your password after logging in.")
    			browserHistory.replace('/signin')
    		}
    	})
    }
  }
 

  

  render() {
    return(
    	<div className="container">
    	<Link to='/' style={{color:'black', margin:'2%'}}><h2>Feedback-Systems</h2></Link>
    <div className="row justify-content-center">

      <div className="col-xl-10 col-lg-12 col-md-9">

        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            
            <div className="row">
              <div className="col-lg-6 d-none d-lg-block bg-login-image" onClick={()=>browserHistory.replace('/')}></div>
              <div className="col-lg-6">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                    <p className="mb-4">We get it, stuff happens. Just enter your email address below and we'll send you help to reset your password!</p>
                  </div>
                  {this.state.error?<p style={{color:'red'}}>{this.state.error}</p>:undefined}
                  <form className="user" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                      <input type="email" className="form-control form-control-user" ref="email" placeholder="Enter Email Address..." required/>
                    </div>
                    <input type="submit" className="btn btn-primary btn-user btn-block" value=" Reset Password"/>
                     
                 
                  </form>
                 <hr/>
                  <div className="text-center">
                    <Link className="small" to="/signin">Already have an account? Login!</Link>
                  </div>
                </div>
              </div>
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
		userList : Meteor.users.find().fetch()
	}
})(ForgotPassword)