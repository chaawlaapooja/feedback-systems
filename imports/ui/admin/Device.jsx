import React from 'react';
import { withTracker } from 'meteor/react-meteor-data'
import {Device} from '/imports/api/Device'
class DeviceComponent extends React.Component{
	constructor(props){
		super(props);
		this.state={
			error : ''
		}
	}
	componentDidMount(){
		this.refs.id.value=Math.random().toString(36).slice(-10)
		this.refs.id.readOnly=true
	}
	handleRadioChange = event => {
		let selectedOption = event.target.classList[0];
		if(selectedOption==='manual'){
			this.refs.id.value=''
			this.refs.id.readOnly=false
		}
		else if(selectedOption==='auto'){
			this.refs.id.value=Math.random().toString(36).slice(-10)
			this.refs.id.readOnly=true
		}
	}
	saveID(event){
		event.preventDefault();

		if(this.refs.id.value.length!==10){
			this.setState({error:'Enter 10 character long unique ID...'})
		}
		else{
			Meteor.call('device.add', this.refs.id.value, (err)=>{
				if(err){
					this.setState({error:err.reason})
				}
				else{
					this.setState({error:''})
					alert('Device added successfully')
					if(document.querySelector('.auto').checked)
						this.refs.id.value=Math.random().toString(36).slice(-10)	
					else if(document.querySelector('.manual').checked)
						this.refs.id.value=''
				}
			})
		}
	}
	renderData(){
		return this.props.deviceList.map(d=>{
			let classList=''
			this.props.deviceList.indexOf(d)%2?classList='bg-gray-300':classList='bg-gray-400'
			const {id, sold} = d;
			const status = sold?'Sold':'Unsold';
			return(
				<tr key={id} className={sold?'bg-gray-800':classList}>
					<td>{id}</td>
					<td>{status}
					{sold? <button className="btn btn-danger btn-circle disabled" style={{float:'right'}}><i className="fas fa-trash"></i>
                  	</button> :
					<button className="btn btn-danger btn-circle" style={{float:'right'}} onClick={()=>{
						if(confirm('Do you want to remove this device?'))
							Meteor.call('device.remove', d._id)}
                
					}>
				    <i className="fas fa-trash"></i>
                  	</button>}
					</td>
				</tr>
			)
		})
	}
	render(){
		return(
			<div className="container">

    <div className="row justify-content-center">

      <div className="col-xl-10 col-lg-12 col-md-9">

        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            
            <div className="row">
              <div className="col-lg-12 d-none d-lg-block bg-password-image"></div>
              <div className="col-lg-12">
                <div className="p-5" style={{padding:'3rem'}}>
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-2">Register Device!</h1>
                    <p className="mb-4">
                    Please select one of the options below:
                    </p>
                    <div style={{display:'flex', justifyContent:'space-evenly'}}>
                    <span className="pull-left"><input type="radio" name="id" className="auto" onChange={this.handleRadioChange} defaultChecked/>System-generated</span>
                    <span className="pull-right"><input type="radio" name="id" className="manual" onChange={this.handleRadioChange}/>Manual</span>
                  	</div>
                  </div>
                  <br/>
                  <form className="user" onSubmit={this.saveID.bind(this)}>
                    {this.state.error?<p style={{color:'red'}}>{this.state.error}</p>:undefined}
                    <div className="form-group">
                      <input type="text" ref="id" className="form-control form-control-user" pattern="[a-zA-Z0-9]{10}" title="Enter 10 character long unique ID..." placeholder="Enter 10 character long unique ID..."/>
                    </div>
                    <input type="submit" value="Register Device" className="btn btn-primary btn-user btn-block"/>
                     
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
    <h1 className="h3 mb-2 text-gray-800">Registered Devices</h1>
   	<div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Registered Device List</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                  <thead className='card-header'>
                    <tr>
                      <th>Device ID</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tfoot className='card-header'>
                    <tr>
                      <th>Device ID</th>
                      <th>Status</th>
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
	Meteor.subscribe('all-devices')
	return {
		deviceList : Device.find().fetch()
	}
}) (DeviceComponent)