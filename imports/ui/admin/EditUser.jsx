import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';

class EditUser extends React.Component{
	renderData(){
		return this.props.userList
				.filter(user=>user.profile.designation==='user')
				.map(user=>{
			const {firstname, lastname, companyname, status} = user.profile
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
					<td>{companyname}</td>
					<td><button className="btn btn-danger btn-icon-split" style={{float:'right'}} onClick={()=>Meteor.call('user.block',user._id, status)}>
                    <span className="icon text-white-50">
                      <i className="fas fa-ban"></i>
                    </span>
                    <span className="text">{status==='active'?'BLOCK':'UNBLOCK'}</span>
                  </button>
                  	</td>
				</tr>
			)
		})
	}
	render(){
		return(
			<div>
				<h1 className="h3 mb-2 text-gray-800">Block/Unblock Users</h1>
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
			                      <th></th>
			                    </tr>
			                  </thead>
			                  <tfoot className='card-header'>
			                    <tr>
			                      <th>User ID</th>
			                      <th>First Name</th>
			                      <th>Last Name</th>
			                      <th>Email</th>
			                      <th>Company Name</th>
			                      <th></th>
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
	Meteor.subscribe('users');
	return{
		userList : Meteor.users.find().fetch(),
	}
})(EditUser)