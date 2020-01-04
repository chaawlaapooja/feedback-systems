import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Device} from '/imports/api/Device';
import Modal from 'react-awesome-modal';

class Map extends React.Component{
	constructor(props){
		super(props);
		this.state={
			user:'',
			device:'',
			userObj:'',
			visible : false
		}
	}
	handleFormSubmit(event){
		event.preventDefault();
		if(this.refs.user.value==='')
			this.setState({user:'Please select a user'})
		else if(this.refs.device.value==='')
			this.setState({device:'Please select a device'})
		else{
			Meteor.call('user.updateDevice', this.refs.user.value, this.refs.device.value, (err)=>{
			if(err)
				alert('Some error occured. Please try again')
			else{
				Meteor.call('device.update', this.refs.user.value, this.refs.device.value, (err)=>{
					if(err)
						alert('Some error occured. Please try again')
					else{
						alert('Device saved for user successfully !')
						this.refs.user.value=''
						this.refs.device.value=''
					}
				})
				
			}
		})
		}
		
	}
	editMap(userObj){
		this.setState({
            visible : true, userObj
        });
	}
	close_modal() {
        this.setState({
            visible : false, userObj:''
        });

    }
    handleEditting(event){
    	event.preventDefault();
    	let checkedDevices = [];
    	let uncheckedDevices = [];
    	let deviceList = this.props.deviceList.filter(device=>device.sold===true)
		for(var i=0; i<deviceList.length; i++){
			if(this.refs.hasOwnProperty(deviceList[i].id))
			if(this.refs[deviceList[i].id].checked){
				checkedDevices.push(this.refs[deviceList[i].id].value);
			}
			else{
				uncheckedDevices.push(this.refs[deviceList[i].id].value);
			}
		}
		let msg=''
		if(checkedDevices.length===0)
			msg="You're about to delete all devices with this user. Are you sure you want to remove all devices with this user?"
		else
			msg="You're about to edit devices associated with this user. Are you sure you want to do this?"
		var ans = confirm(msg)
			if(ans){
				Meteor.call('user.setDevices', this.state.userObj._id, checkedDevices, (err)=>{
					if(err)
						console.log(err)
					else{
						for(var i=0; i<uncheckedDevices.length; i++){
							Meteor.call('device.updateToUnsold', uncheckedDevices[i], (err)=>{
								if(err)
									console.log(err)
								else{
									this.close_modal()

								}
							})

						}
						alert('updated successfully!')
					}
				})
			}
		
		
    }
    getCheckbox(){
    	if(this.state.userObj!=='')
    	return this.state.userObj.profile.devices.map(device=><div key={device}><input type="checkbox" ref={device} value={device} defaultChecked/>{device}</div>)
    }

	renderData(){
		if(this.props.userList.length<1)
			return <p>No mapping yet</p>
		else
		return this.props.userList
				.filter(user=>user.profile.designation==='user')
				.filter(user=>user.profile.devices.length>0)
				.map(user=>{
					const {firstname, lastname, devices} = user.profile;
					const username = user.username;
					// const getList = (d) =>{
					// let deviceList='', ndl='';
					// for (var I = 0; I < d.length; I++)
					// {
					// 		if(I===0)
					// 			ndl = `[ ${d.length} devices ] -->`
					//        deviceList = ` ${d[I]} ,`
					//        ndl += deviceList;
					//        if(I===d.length-1)
					//        		return ndl
					//  }
					// }

					let classList = '';
					this.props.userList.filter(user=>user.profile.designation==='user' && user.profile.devices.length>0)
				.indexOf(user)%2?classList='bg-gray-300':classList='bg-gray-400'
			
					
					return(
						<tr key={user._id} className={classList}>
							<td>{firstname} {lastname} ({username})</td>
							<td>{devices}
								<button className="btn btn-info btn-icon-split" style={{float:'right'}} onClick={()=>this.editMap(user)}>
			                    <span className="text">Edit</span>
			                  	</button>
			                </td>
						</tr>
					)
				})
	}
	getUsersList(){
		return this.props.userList
				.filter(user=>user.profile.designation==='user')
				.map(user=>{
					const {firstname, lastname} = user.profile;
					const username = user.username;
					return(
						<option key={user._id} value={user._id}>{firstname} {lastname} ({username})</option>
					)
				})
	}
	getDeviceList(){
		return this.props.deviceList
				.filter(device=>device.sold===false)
				.map(device=>
			<option key={device._id} value={device.id}>{device.id}</option>
		)
	}
	render(){
		return(
<div>
	<Modal visible={this.state.visible}  effect="fadeInUp" onClickAway={() => this.close_modal()} >
                    <div className="modal-content">
                    <div className="modal-header mh" style={{color: "white"}}>
                    <button type="button" className="close" onClick={() => this.close_modal()}>&times;</button>
                    <h4 className="modal-title" style={{color: "white"}}>You clicked edit button</h4>
                    </div>
                    <div className="modal-body">
                    
                      {this.state.userObj!==''?<p>You may uncheck the devices that you don't wanna assign to the user <br/> {this.state.userObj.profile.firstname} {this.state.userObj.profile.lastname} ({this.state.userObj.username})</p>:undefined}
                      <form onSubmit={this.handleEditting.bind(this)}>
                      {this.getCheckbox()}
                      <br/>
                      <input type="submit" value="Save changes" className="btn btn-primary"/>
                      </form>
                    </div>
                    <div className="modal-footer mf" >
                      <button type="button" className="btn btn-default" onClick={() => this.close_modal()}>CLOSE</button>
                    </div>
                    </div>
    </Modal>
	<div className="card o-hidden border-0 shadow-lg my-5">
      <div className="card-body p-0">
        
        <div className="row">
          <div className="col-lg-12 d-none d-lg-block bg-register-image"></div>
          <div className="col-lg-12">
            <div className="p-5" style={{padding:'1rem'}}>
              <div className="text-center">
                <h1 className="h4 text-gray-900 mb-4">Assign device to user!</h1>
              </div>
              <form className="user" onSubmit={this.handleFormSubmit.bind(this)}>
                
                
                <div className="form-group row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                  	<label>Select User :</label><br/>
                  	<span style={{padding:'2%'}}>
                  	<select ref="user" required>
                  		<option></option>
                  		{this.getUsersList()}
                  	</select>
                  	</span>
                  </div>
                  <div className="col-sm-6 mb-3 mb-sm-0">
                  	<label>Select device ID :</label><br/>
                  	<span style={{padding:'2%'}}>
                  	<select ref="device" required>
                  		<option></option>
                  		{this.getDeviceList()}
                  	</select>
                  	</span>
                  </div>
                </div>
               	<hr/>
                <input type='submit' value='Save the device for user' className="btn btn-primary btn-user btn-block"/>
               
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h1 className="h3 mb-2 text-gray-800">Registered Devices for a User</h1>
   	<div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Registered Device List for a user</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                  <thead className='card-header'>
                    <tr>
                      <th>User</th>
                      <th>Registered devices</th>
                    </tr>
                  </thead>
                  <tfoot className='card-header'>
                    <tr>
                      <th>User</th>
                      <th>Registered devices</th>
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
	Meteor.subscribe('all-devices');
	return{
		userList : Meteor.users.find().fetch(),
		deviceList : Device.find().fetch(),
	}
})(Map)