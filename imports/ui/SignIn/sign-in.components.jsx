import React from 'react';

import '/imports/css/sb-admin2.min.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error:''
    };
  }
  handleSignIn(event){
	event.preventDefault();
	if(this.refs.email.value.includes('@'))
  		Meteor.loginWithPassword({email:this.refs.email.value}, this.refs.password.value, (err)=>{
  			if(err)
  				this.setState({error:err.reason})
  			else
  				this.setState({error:''})
  		})
  	else
  		Meteor.loginWithPassword({username:this.refs.email.value}, this.refs.password.value, (err)=>{
  			if(err)
  				this.setState({error:err.reason})
  			else
  				this.setState({error:''})
  		})
  }
 

  

  render() {
    return(
    	<div className="container">

    <div className="row justify-content-center">

      <div className="col-xl-10 col-lg-12 col-md-9">

        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            
            <div className="row">
              <div className="col-lg-6 d-none d-lg-block bg-login-image" onClick={()=>window.location.href='/'}></div>
              <div className="col-lg-6">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    <p>Login with your email and password or username and password !</p>
                  </div>
                  <span>{this.state.error?<p style={{color:'red'}}>{this.state.error}</p>:undefined}</span>
                  <form className="user" onSubmit={this.handleSignIn.bind(this)}>
                    <div className="form-group">
                      <input type="text" ref="email" className="form-control form-control-user" placeholder="Enter Email Address..."/>
                    </div>
                    <div className="form-group">
                      <input type="password" ref="password" className="form-control form-control-user" placeholder="Password"/>
                    </div>
                    
                    <button className="btn btn-primary btn-user btn-block">
                      Login
                    </button>
              
                  </form>
                  {/*<hr/>
                  <div className="text-center">
                                      <a className="small" href="forgot-password.html">Forgot Password?</a>
                                    </div>*/}
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

export default SignIn;