import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Device = new Mongo.Collection('device')

Meteor.methods({
	'device.add':function(id){
		if (!this.userId) {
	      throw new Meteor.Error('not-authorized');
	    }

	    new SimpleSchema({
	      id: {
	        type: String,
	        min: 10,
    		max: 10
	      }
	    }).validate({ id });

	    Device.insert({id, sold:false, feedbacks:[]})
	},
	'device.remove':function(_id){
		Device.remove(_id)
	},
	'device.update':function(owner, id){
		new SimpleSchema({
	      id: {
	        type: String,
	        min: 10,
    		max: 10
	      }
	    }).validate({ id });
		Device.update({id},{$set:{owner, sold:true}})
	},
	'device.updateToUnsold':function(id){
		new SimpleSchema({
	      id: {
	        type: String,
	        min: 10,
    		max: 10
	      }
	    }).validate({ id });
		Device.update({id},{$set:{owner:'', sold:false}})
	},
	'device.save':function(id, value){
		new SimpleSchema({
	      id: {
	        type: String,
	        min: 10,
    		max: 10
	      }
	    }).validate({ id });
		let dt = new Date().toDateString()
		let f = (Device.find({id}).fetch()[0].feedbacks.length)
			let feedbackObj={};
			if(value==='1'){
				feedbackObj={
					date:dt,
					one:1,
					two:0,
					three:0,
					four:0
				}
			}
			else if(value==='2'){
				feedbackObj={
					date:dt,
					one:0,
					two:1,
					three:0,
					four:0
				}
			}
			else if(value==='3'){
				feedbackObj={
					date:dt,
					one:0,
					two:0,
					three:1,
					four:0
				}
			}
			else if(value==='4'){
				feedbackObj={
					date:dt,
					one:0,
					two:0,
					three:0,
					four:1
				}
			}
		if(f===0){
		
			Device.update({id},{$push:{feedbacks:feedbackObj}})
		}
		else{
			let checkFeedbackDate = Device.find({id, 'feedbacks.date':dt}).fetch()
	        if(checkFeedbackDate.length!==0){
		        if(value==='1'){
		        	Device.update({id , "feedbacks.date" : (dt) } , 
		                {$inc : {"feedbacks.$.one" : 1} } , 
		                false , 
		                true);
		        }
		        else if(value==='2'){
		        	Device.update({id , "feedbacks.date" : (dt) } , 
		                {$inc : {"feedbacks.$.two" : 1} } , 
		                false , 
		                true);
		        }
		        else if(value==='3'){
		        	Device.update({id , "feedbacks.date" : (dt) } , 
		                {$inc : {"feedbacks.$.three" : 1} } , 
		                false , 
		                true);
		        }
		        else if(value==='4'){
		        	Device.update({id , "feedbacks.date" : (dt) } , 
		                {$inc : {"feedbacks.$.four" : 1} } , 
		                false , 
		                true);
		        }

	        }
	        else{
	        	Device.update({id,'feedbacks.date':{$nin: [dt]}}, {$push:{feedbacks:feedbackObj}})
	        }
		}
	}
})
