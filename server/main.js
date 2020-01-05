import { Meteor } from 'meteor/meteor';
import {Device} from '/imports/api/Device'
import {Query} from '/imports/api/Query'
import {User} from '/imports/api/user'
import { WebApp } from 'meteor/webapp';


Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish('users', function(){
  		return Meteor.users.find()
  })
  Meteor.publish('all-devices', function(){
  		return Device.find()
  })
  Meteor.publish('devices', function(){
      return Device.find({owner:Meteor.userId()})
  })
  Meteor.publish('queries', function(){
      return Query.find({},{sort:{submittedOn:-1}})
  })

  WebApp.connectHandlers.use((req, res, next) => {
    if(!req.url.includes('/save')){
      next()
    }
    else{
    const id = req.query.id
    const value = req.query.value
    if(id===undefined || value===undefined){
        res.end('Please enter correct device id and value')
    }
    else if(value!=='1' && value!=='2' && value!=='3' && value!=='4'){
        res.end('Values can only range from 1 to 4.')
    }
    else{
      let foundDevice = Device.find({id, sold:true}).fetch()
      if(foundDevice.length===1){
        Meteor.call('device.save', id, value, (err)=>{
          if(err){
            res.end('error saving feedback')
          }
          else{
            res.end('success')
          }
        }) 
      }
      else{
        res.statusCode = 404;
        res.end('No device found with such id. Either the device id is not registered or it is unsold')
      }
    } 
  }
  });
});
