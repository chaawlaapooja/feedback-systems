import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Query} from '/imports/api/Query';
import printJS from 'print-js'

class Queries extends React.Component{
	getCount(params){
		let arr = []
		if(params==='total'){
			arr = this.props.queries.filter(query=>query.read===false)
		}
		else if(params==='audience'){
			arr = this.props.queries.filter(query=>query.read===false && query.comingFrom==='audience')
		}
		else if(params==='user'){
				arr = this.props.queries.filter(query=>query.read===false && query.comingFrom==='user')
		}
		return arr.length
	}
	generateReport(){
    	printJS({ printable: 'print-form', type: 'html',modalMessage: 'Retrieving Document...',targetStyles: ['*'],header: 'Queries' })
    }
	renderData(params){
			return this.props.queries
					.filter(query=>query.comingFrom===params)
					.map(query=>{
						const { _id, name, email, mobile, subject, message, submittedOn, read } = query;
						return(
							<tr key={_id} className={read?'bg-gray-300':'bg-cyan'}>
								<td>{name}</td>
								<td>{email}</td>
								<td>{mobile}</td>
								<td>{subject}</td>
								<td>{message}</td>
								<td>{new Date(submittedOn).toDateString()}</td>
								<td><button className='btn btn-primary' onClick={()=>Meteor.call('query.read',_id, !read)}>{read?'Mark as Unread':'Mark as Read'}</button></td>
							</tr>
						)
					})
		

	}
	render(){
		return(
			<div>
			<button className="d-sm-inline-block btn btn-sm btn-primary shadow-sm" onClick={()=>this.generateReport()}><i className="fas fa-download fa-sm text-white-50"></i> Generate Report</button>
    		<br/><br/>
    		<div id='print-form'>
				<div className='row' style={{display:'flex', justifyContent:'space-between'}}>
					<div className="col-xl-3 col-md-6 mb-4">
		              <div className="card border-left-primary shadow h-100 py-2">
		                <div className="card-body">
		                  <div className="row no-gutters align-items-center">
		                    <div className="col mr-2">
		                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Total Pending Queries</div>
		                      <div className="h5 mb-0 font-weight-bold text-gray-800">{this.getCount('total')}</div>
		                    </div>
		                    <div className="col-auto">
		                      <i className="fas fa-calendar fa-2x text-gray-300"></i>
		                    </div>
		                  </div>
		                </div>
		              </div>
		            </div>
		            <div className="col-xl-3 col-md-6 mb-4">
		              <div className="card border-left-warning shadow h-100 py-2">
		                <div className="card-body">
		                  <div className="row no-gutters align-items-center">
		                    <div className="col mr-2">
		                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Pending Requests (from audience)</div>
		                      <div className="h5 mb-0 font-weight-bold text-gray-800">{this.getCount('audience')}</div>
		                    </div>
		                    <div className="col-auto">
		                      <i className="fas fa-comments fa-2x text-gray-300"></i>
		                    </div>
		                  </div>
		                </div>
		              </div>
		            </div>
		            <div className="col-xl-3 col-md-6 mb-4">
		              <div className="card border-left-warning shadow h-100 py-2">
		                <div className="card-body">
		                  <div className="row no-gutters align-items-center">
		                    <div className="col mr-2">
		                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Pending Requests (from users)</div>
		                      <div className="h5 mb-0 font-weight-bold text-gray-800">{this.getCount('user')}</div>
		                    </div>
		                    <div className="col-auto">
		                      <i className="fas fa-comments fa-2x text-gray-300"></i>
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
			                      <th>Name</th>
			                      <th>Email</th>
			                      <th>Mobile</th>
			                      <th>Subject</th>
			                      <th>Message</th>
			                      <th>Received on</th>
			                      <th></th>
			                    </tr>
			                  </thead>
			                  <tfoot className='card-header'>
			                    <tr>
			                      <th>Name</th>
			                      <th>Email</th>
			                      <th>Mobile</th>
			                      <th>Subject</th>
			                      <th>Message</th>
			                      <th>Received on</th>
			                      <th></th>
			                    </tr>
			                  </tfoot>
			                  <tbody>
			                   	{this.renderData('audience')}
			                  </tbody>
			                </table>
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
			                      <th>Name</th>
			                      <th>Email</th>
			                      <th>Mobile</th>
			                      <th>Subject</th>
			                      <th>Message</th>
			                      <th>Received on</th>
			                      <th></th>
			                    </tr>
			                  </thead>
			                  <tfoot className='card-header'>
			                    <tr>
			                      <th>Name</th>
			                      <th>Email</th>
			                      <th>Mobile</th>
			                      <th>Subject</th>
			                      <th>Message</th>
			                      <th>Received on</th>
			                      <th></th>
			                    </tr>
			                  </tfoot>
			                  <tbody>
			                   	{this.renderData('user')}
			                  </tbody>
			                </table>
			              </div>
			            </div>
			    </div>
			</div>
			</div>
		)
	}
}

export default withTracker(()=>{
	Meteor.subscribe('queries');
	return {
		queries : Query.find().fetch()
	}
})(Queries)