import { Meteor } from 'meteor/meteor';
import {Device} from '/imports/api/Device'
import {Query} from '/imports/api/Query'
import {User} from '/imports/api/user'
import { WebApp } from 'meteor/webapp';
import {Email} from 'meteor/email'
import {Accounts} from 'meteor/accounts-base';

Meteor.startup(() => {
  //Accounts.setPassword(userId, new password, [options](by default logout user from all clients)) server side
  //Accounts.setPassword('ZZFfdPSrZx3Q6vCEK', '123456')
  //Accounts.forgotPassword({email},[callback]) only on client side
 // Accounts.forgotPassword({email:'chaawlaapooja@gmail.com'},(err)=>console.log(err))
  //Accounts.sendResetPasswordEmail(userId, [email], [extraTokenData]) on server side
  //Accounts.sendVerificationEmail(userId, [email], [extraTokenData])
  
//   Email.send({
//   to: "chaawlaapooja@gmail.com",
//   from: "demostudentp@gmail.com",
//   subject: "Example Email",
//   text: "The contents of our email in plain text.",
// });
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
    if(!req.url.includes('/save') && !req.url.includes('/count')){
      next()
    }
    else
    {
      if(req.url.includes('/save')){
        const id = req.query.id
        const value = req.query.value
        if(id===undefined || value===undefined || id==='' || value===''){
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
      else if(req.url.includes('/count')){
        const id = req.query.id
        const fbtype = req.query.fbtype
        if(id===undefined || fbtype===undefined || id==='' || fbtype===''){
            res.end('Please enter correct device id and feedback type')
        }
        else if(fbtype!=='1' && fbtype!=='2' && fbtype!=='3' && fbtype!=='4'){
            res.end('Feedback type can only range from 1 to 4.')
        }
        else{
          let foundDevice = Device.find({id, sold:true}).fetch()
          if(foundDevice.length===1){
            let key = ''
            if(fbtype==='1')
              key='one'
            else if(fbtype==='2')
              key='two'
            else if(fbtype==='3')
              key='three'
            else if(fbtype==='4')
              key='four'
            let feedbacks = foundDevice[0].feedbacks
            var count=0
            for(var i=0; i<feedbacks.length; i++){
              count = parseInt(feedbacks[i][key]) + count
            }
            res.end(count.toString())
          }
          else{
            res.statusCode = 404;
            res.end('No device found with such id. Either the device id is not registered or it is unsold')
          }
        } 
      }
    }
  });
});
