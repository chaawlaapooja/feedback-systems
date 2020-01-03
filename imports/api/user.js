import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
	'user.create' : function(username, email, password, firstname, lastname, mobile, altmobile, companyname, companygst, companyaddress, companydetails){
		if (!this.userId) {
	      throw new Meteor.Error('not-authorized');
	    }
mobile=parseInt(mobile)
altmobile=altmobile===''? 0 : parseInt(altmobile)
new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    },
    firstname:{
    	type : String,
    	min : 2,
    	optional:false
    },
    lastname:{
    	type : String,
    	min:2
    },
    mobile :{
    	type : SimpleSchema.Integer
    },
    altmobile : {
    	type : SimpleSchema.Integer,
    	optional:true
    },
    companyname :{
    	type : String,
    	min:2
    },
    companygst :{
    	type : String,
    	min:15,
    	max:15
    },
    companyaddress:{
    	type:String,
    	min:10
    },
    companydetails:{
    	type:String,
    	optional:true
    }
  }).validate({ email, firstname, lastname, mobile, altmobile, companyname, companygst, companyaddress, companydetails });

		Accounts.createUser({
			username,
			email,
			password,
			profile:{
				firstname,
				lastname,
				mobile,
				altmobile,
				companyname,
				companygst,
				companyaddress,
				companydetails,
				status:'active',
				designation:'user'
			}
		})
	},
	'user.remove':function(_id){
		Meteor.users.remove(_id)
	},
	'user.updateDevice':function(_id, deviceId){
        new SimpleSchema({
            deviceId:{
                type:String,
                min:10,
                max:10
            }
        }).validate({deviceId})
		Meteor.users.update({_id},{$push:{"profile.devices":deviceId}})
	},
    'user.setDevices':function(_id, devices){
        new SimpleSchema({
            devices:{type:Array}
        }).validate({devices})
        Meteor.users.update({_id},{$set:{"profile.devices":devices}})
    },
    'user.block':function(_id, status){
        new SimpleSchema({
            status:{type:String, min:'6', max:7}
        }).validate({status})
        status = status==='active'?'blocked':'active'
        Meteor.users.update({_id},{$set:{"profile.status":status}})
    },
    'user.update':function(username, mobile, altmobile, companyname, companygst, companyaddress, companydetails){
        mobile=parseInt(mobile)
        altmobile=altmobile===''? 0 : parseInt(altmobile)
        new SimpleSchema({
            mobile :{
                type : SimpleSchema.Integer
            },
            altmobile : {
                type : SimpleSchema.Integer,
                optional:true
            },
            companyname :{
                type : String,
                min:2
            },
            companygst :{
                type : String,
                min:15,
                max:15
            },
            companyaddress:{
                type:String,
                min:10
            },
            companydetails:{
                type:String,
                optional:true
            }
          }).validate({ mobile, altmobile, companyname, companygst, companyaddress, companydetails });
        Meteor.users.update({username},
            {$set:{
                "profile.mobile":mobile,
                "profile.altmobile":mobile,
                "profile.companyname":companyname,
                "profile.companygst":companygst,
                "profile.companyaddress":companyaddress,
                "profile.companydetails":companydetails
            }}
        )
    }
})


export const User = new Mongo.Collection('user')