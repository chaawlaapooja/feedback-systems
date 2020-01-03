import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Query = new Mongo.Collection('queries')

Meteor.methods({
	'query.insert' : function(name, email, mobile, subject, message, comingFrom){
		mobile=parseInt(mobile)
		new SimpleSchema({
		    email: {
		      type: String,
		      regEx: SimpleSchema.RegEx.Email
		    },
		    name:{
		    	type : String,
		    	min : 2,
		    },
		    mobile :{
		    	type : SimpleSchema.Integer
		    },
		    subject :{
		    	type : String,
		    	min : 2
		    },
		    message : {
		    	type : String,
		    	min : 2
		    }
		  }).validate({ email, name, mobile, subject, message});
		Query.insert({name, email, mobile, subject, message, comingFrom, submittedOn:new Date(), read:false})
	},
	'query.read':function(_id, read){
		new SimpleSchema({
			read:{
				type:Boolean
			}
		}).validate({read})
		Query.update({_id},{$set:{read}})
	}
})
