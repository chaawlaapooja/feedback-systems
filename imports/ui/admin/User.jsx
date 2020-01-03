import React from 'react';
import {Accounts} from 'meteor/accounts-base'
import {withTracker} from 'meteor/react-meteor-data'

class User extends React.Component{

	constructor(props){
		super(props);
		this.state={
			error:'',
			gst:''
		}
	}
	componentDidMount(){
		this.refs.username.value='FM'+Math.random().toString().slice(-7);
		this.refs.username.readOnly = true;
	}
	registerUser(event){
		event.preventDefault();
		
		Meteor.call('user.create',
			this.refs.username.value.trim(),
			this.refs.email.value.trim(),
			'123456',
			this.refs.firstname.value.trim(),
			this.refs.lastname.value.trim(),
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
					alert('user added successfully'),
					this.refs.username.value='FM'+Math.random().toString().slice(-7),
					this.refs.email.value='',
					this.refs.firstname.value='',
					this.refs.lastname.value='',
					this.refs.mobile.value='',
					this.refs.altmobile.value='',
					this.refs.companyname.value='',
					this.refs.companygst.value='',
					this.refs.companyaddress.value='',
					this.refs.companydetails.value='',
					this.setState({error:'', gst:''})
				}
			}
		)
		
	}
	checkGST(){
		this.refs.companygst.value=this.refs.companygst.value.toUpperCase()
	let result = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/.test(this.refs.companygst.value)
     result && this.refs.companygst.value.length===15 ? this.setState({gst:''}):this.setState({gst:'Please enter correct GST'})
	}
	renderData(){
		return this.props.userList
				.filter(user=>user.profile.designation==='user')
				.map(user=>{
			const {firstname, lastname, companyname} = user.profile
			const username = user.username
			const email = user.emails?user.emails[0].address:'email'
			let classList = '';
			this.props.userList.indexOf(user)%2?classList='bg-gray-300':classList='bg-gray-400'
			
			return(
				<tr key={username} className={classList}>
					<td>{username}</td>
					<td>{firstname}</td>
					<td>{lastname}</td>
					<td>{email}</td>
					<td>{companyname}
					<button className="btn btn-danger btn-circle" style={{float:'right'}} onClick={()=>{
						if(confirm('Do you want to remove this user?'))
							Meteor.call('user.remove', user._id)}
                	}>
				    <i className="fas fa-trash"></i>
                  	</button>
                  	</td>
				</tr>
			)
		})
	}

	render(){
		return(
			<div>
	<div>

    <div className="card o-hidden border-0 shadow-lg my-5">
      <div className="card-body p-0">
        
        <div className="row">
          <div className="col-lg-12 d-none d-lg-block bg-register-image"></div>
          <div className="col-lg-12">
            <div className="p-5" style={{padding:'1rem'}}>
              <div className="text-center">
                <h1 className="h4 text-gray-900 mb-4">Create an User Account!</h1>
              </div>
              <span>{this.state.error?<p style={{color:'red'}}>{this.state.error}</p>:undefined}</span>
              <form className="user" onSubmit={this.registerUser.bind(this)}>
                <div className="form-group row">
                  <div className="col-sm-4 mb-3 mb-sm-0">
                    <input type="text" className="form-control form-control-user" ref="username"/>
                  </div>
                  <div className="col-sm-4 mb-3 mb-sm-0">
                    <input type="text" className="form-control form-control-user" ref="firstname" placeholder="First Name" pattern="[a-zA-Z].{1,}" title='Enter two or more characters' required/>
                  </div>
                  <div className="col-sm-4 mb-3 mb-sm-0">
                    <input type="text" className="form-control form-control-user" ref="lastname" placeholder="Last Name" pattern="[a-zA-Z].{1,}" title='Enter two or more characters' required/>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-4 mb-3 mb-sm-0">
                    <input type="tel" className="form-control form-control-user" ref="mobile" placeholder="Mobile Number" pattern="[6-9]{1}[0-9]{9}" title="10 digit valid mobile number" required/>
                  </div>
                  <div className="col-sm-4 mb-3 mb-sm-0">
                    <input type="tel" className="form-control form-control-user" ref="altmobile" placeholder="Alternate Mobile Number" pattern="[6-9]{1}[0-9]{9}" title="10 digit valid mobile number"/>
                  </div>
                  <div className="col-sm-4 mb-3 mb-sm-0">
                    <input type="email" className="form-control form-control-user" ref="email" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title='xxx@xxx.domain' required/>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input type="text" className="form-control form-control-user" ref="companyname" placeholder="Company Name" placeholder="Company Name" pattern="[a-zA-Z].{1,}" title='Enter two or more characters' required/>
                  </div>
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <input type="text" className="form-control form-control-user" ref="companygst" placeholder="Company GST Number" onKeyUp={()=>this.checkGST()} title='15 digit GST Number' required/>
                  </div>
                  <span>{this.state.gst?<p style={{color:'red'}}>{this.state.gst}</p>:undefined}
                </span>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control form-control-user" ref="companyaddress" placeholder="Company Address" required/>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control form-control-user" ref="companydetails" placeholder="Company Details"/>
                </div>
                {/*<div className="form-group row">
                                  <div className="col-sm-6 mb-3 mb-sm-0">
                                    <input type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password"/>
                                  </div>
                                  <div className="col-sm-6">
                                    <input type="password" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Repeat Password"/>
                                  </div>
                                </div>*/}
                <input type='submit' value='Register Account' className="btn btn-primary btn-user btn-block"/>
                <hr/>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <h1 className="h3 mb-2 text-gray-800">Registered Users</h1>
   	<div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Users List</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                  <thead className='card-header'>
                    <tr>
                      <th>User ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Company Name</th>
                    </tr>
                  </thead>
                  <tfoot className='card-header'>
                    <tr>
                      <th>User ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Company Name</th>
                    </tr>
                  </tfoot>
                  <tbody>
                   	{this.renderData()}
                  </tbody>
                </table>
              </div>
            </div>
    </div>
  </div>
		)
	}
}

export default withTracker(()=>{
	Meteor.subscribe('users')
	return {
		userList : Meteor.users.find().fetch()		
	}
}) (User)