import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Device} from '/imports/api/Device'
import ReactDOM from 'react-dom';
import Chart from 'chart.js';
import printJS from 'print-js'
class DatewiseReports extends React.Component{
	constructor(){
		super();
		this.state={
			device:'',
			data:[],
			ob:{}
		}
	}
	onDeviceChange(){
		this.setState({device:this.refs.id.value})
		this.initializeChart(this.props.config)
	}
	onDateChange(){
		this.setState({date:this.refs.date.value})
		this.initializeChart(this.props.config)
	}
	initializeChart(options) {
		
		function sumObjectsByKey(...objs) {
	        return objs.reduce((a, b) => {
	          for (let k in b) {
	            if (b.hasOwnProperty(k))
	              a[k] = (a[k] || 0) + b[k];
	          }
	          return a;
	        }, {});
      	}
      let deviceID = this.refs.id.value
      let date = this.refs.date.value
      let data = {}
      if(date!=='' && deviceID===''){
      	let d = Device.find({feedbacks: {$elemMatch: {'date': new Date(date).toDateString()}}}).fetch()
      	let o=[]
      	d.forEach(d=>{
      		const {feedbacks}=d;
      		let f = (feedbacks.filter(f=>f.date===new Date(date).toDateString()))
      		o.push(f[0])
      	})
      	data = sumObjectsByKey(...o)
      }
      else if(date==='' && deviceID!==''){
      	let device = Device.find({id:this.refs.id.value}).fetch()
	    data = device!==undefined?sumObjectsByKey(...device[0].feedbacks):{}
	  }
      else if(date!=='' && deviceID!==''){
      	let d = Device.find({id:deviceID, feedbacks: {$elemMatch: {'date': new Date(date).toDateString()}}}).fetch()
      	let o=[]
      	d.forEach(d=>{
      		const {feedbacks}=d;
      		let f = (feedbacks.filter(f=>f.date===new Date(date).toDateString()))
      		o.push(f[0])
      	})
      	data = sumObjectsByKey(...o)
      }
      data = Object.values(data)
	  data.pop()
      this.setState({data})
      	Chart.pluginService.register({
		beforeDraw: function (chart) {
			if (chart.config.options.elements.center) {
        //Get ctx from string
        var ctx = chart.chart.ctx;
        
				//Get options from the center object in options
        var centerConfig = chart.config.options.elements.center;
      	var fontStyle = centerConfig.fontStyle || 'Arial';
				var txt = centerConfig.text;
        var color = centerConfig.color || '#000';
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
        //Start with a base font of 30px
        ctx.font = "50px " + fontStyle;
        
				//Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = (chart.innerRadius * 2);

        // Pick a new font size so it will not be larger than the height of label.
        var fontSizeToUse = Math.min(newFontSize, elementHeight);

				//Set font settings to draw it correctly.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
        ctx.font = fontSizeToUse+"px " + fontStyle;
        ctx.fillStyle = color;
        
        //Draw text in center
        ctx.fillText(txt, centerX, centerY);
			}
		}
	});


		var config = {
			type: 'doughnut',
			data: {
				labels: [
				  "Poor",
				  "Bad",
				  "Good",
				  "Excellent"
				],
				datasets: [{
					data: data,
					backgroundColor: [
					  "#FF6384",
					  "#36A2EB",
					  "#FFCE56",
					  "#1cc88a"
					],
					hoverBackgroundColor: [
					  "#FF1748",
					  "#137BC1",
					  "#FFB80A",
					  "#17a673"
					]
				}]
			},

		options: {
			maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: true
    },
    cutoutPercentage: 80,
			elements: {
				center: {
				  text: data.reduce(function(acc, val) { return acc + val; }, 0),
		          color: '#FF6384', // Default is #000000
		          fontStyle: 'Arial', // Default is Arial
		          sidePadding: 20 // Defualt is 20 (as a percentage)
				}
			}
		}
	};

		var ctx = this.refs.chart ? ReactDOM.findDOMNode(this.refs.chart).getContext("2d"):undefined;
		var myChart = ctx ? new Chart(ctx, config):undefined;
    }
    generateReport(){
    	printJS({ printable: 'print-form', type: 'html',modalMessage: 'Retrieving Document...',targetStyles: ['*'],header: 'Datewise Filtered Report' })
    }
	getDevices(){
		return this.props.deviceList.map(device=>{
			return(
				<option key={device.id} value={device.id}>{device.id}</option>
			)
		})
	}
	render(){
		return(
			<div>
			<div style={{display:'flex', justifyContent:'space-between'}}>
			<div>
			Select Date : 
			<input type='date' ref='date' style={{margin:'2%'}} onChange={()=>this.onDateChange()}/>
			</div>
			<div>
			Select Device :
			<select ref="id" style={{margin:'2%'}} onChange={()=>this.onDeviceChange()}>
				<option value=''></option>
				{this.getDevices()}
			</select>
			</div>
			
			</div>
			{this.state.device || this.state.date?
			<div id='data'>
				<button className="d-sm-inline-block btn btn-sm btn-primary shadow-sm" onClick={()=>this.generateReport()}><i className="fas fa-download fa-sm text-white-50"></i> Generate Report</button>
    			<div id='print-form'>
					<div><canvas ref="chart"  /></div>
		    		
		    		<h1 className="h3 mb-2 text-gray-800">Feedback Analysis</h1>
		    		
		    		<div className="card shadow mb-4">
				            <div className="card-header py-3">
				              <h6 className="m-0 font-weight-bold text-primary">
				              Feedback by numbers 
				              {this.state.date? ` on ${new Date(this.state.date).toDateString()}`: undefined}</h6>
				              {this.state.device? ` for Device Id ${this.state.device}`:' for all devices'} 
				            </div>
				            <div className="card-body">
				              <div className="table-responsive">
				                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
				                  <thead className='card-header'>
				                    <tr>
				                      <th>Total number of inputs</th>
				                      <th>Number of poor feedbacks</th>
				                      <th>Number of bad feedbacks</th>
				                      <th>Number of good feedbacks</th>
				                      <th>Number of excellent feedbacks</th>
				                    </tr>
				                  </thead>
				                  
				                  <tbody>
				                   	<tr>
				                      <th>{this.state.data.reduce(function(acc, val) { return acc + val; }, 0)}</th>
				                      <th>{this.state.data[0]}</th>
				                      <th>{this.state.data[1]}</th>
				                      <th>{this.state.data[2]}</th>
				                      <th>{this.state.data[3]}</th>
				                    </tr>
				                  </tbody>
				                </table>
				              </div>
				            </div>
				    </div>
				</div>
			</div>
    		:undefined}
			</div>
		)
	}
}

export default withTracker(()=>{
	Meteor.subscribe('devices');
	return{
		deviceList : Device.find().fetch()
	}
})(DatewiseReports)