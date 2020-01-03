import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';
import {withTracker} from 'meteor/react-meteor-data';
import {Device} from '/imports/api/Device';
import printJS from 'print-js'

class UserDashboard extends React.Component{
	componentDidMount() {
        this.initializeChart(this.props.config);
    }
    componentDidUpdate() {
        this.initializeChart(this.props.config);
    }
    
    initializeChart(options) {
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
					data: this.props.d,
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
				  text: this.props.d.reduce(function(acc, val) { return acc + val; }, 0),
		          color: '#FF6384', // Default is #000000
		          fontStyle: 'Arial', // Default is Arial
		          sidePadding: 20 // Defualt is 20 (as a percentage)
				}
			}
		}
	};

		var ctx = ReactDOM.findDOMNode(this.refs.chart).getContext("2d");
		var myChart = new Chart(ctx, config);
    }
    getDays(param){
    	function sumObjectsByKey(...objs) {

    	return objs.reduce((a, b) => {
    	  for (let k in b) {
          	if (b.hasOwnProperty(k))
            	if(k==='date')
            		a[k]=b[k]
            	else
					a[k] = (a[k] || 0) + b[k];
              //console.log(a[k])
          }
          return a;
        }, {});
      }
    	let d =[]
    	let devices = Device.find().fetch()
    	devices.forEach(device=>{
    		const {feedbacks}=device
    		feedbacks.forEach(f=>d.push(f))
    	})
    	
    	let arr = d
    	const result = arr.reduce((acc, d) => {
		  const found = acc.find(a => a.date === d.date);
		  //const value = { name: d.name, val: d.value };
		  const value = { one: d.one, two: d.two, three:d.three, four:d.four }; // the element in data property
		  if (!found) {
		    //acc.push(...value);
		    acc.push({date:d.date, data: [value]}) // not found, so need to add data property
		  }
		  else {
		    //acc.push({ name: d.name, data: [{ value: d.value }, { count: d.count }] });
		    found.data.push(value) // if found, that means data property exists, so just push new element to found.data.
		  }
		  return acc;
		}, []);

		
		let r =[]
		result.forEach(result=>{
			if(result.data.length>1){
				r.push({date:result.date, data:sumObjectsByKey(...result.data)})
			}
			else{
				r.push({date:result.date, data:result.data[0]})
			}
		})
		
		if(param==='lowest'){
			r.sort((a,b)=>a.data.one-b.data.one)
			return (r[0]?r[0].date:undefined)
		}
		else if(param==='highest'){
			r.sort((a,b)=>b.data.four-a.data.four)
			return (r[0]?r[0].date:undefined)
		}
    	
    }
    generateReport(){
    	printJS({ printable: 'print-form', type: 'html',modalMessage: 'Retrieving Document...',targetStyles: ['*'],header: 'Sale Report' })
    }
    getList(param){
    	function sumObjectsByKey(...objs) {
        return objs.reduce((a, b) => {
          for (let k in b) {
            if (b.hasOwnProperty(k))
              a[k] = (a[k] || 0) + b[k];
          }
          return a;
        }, {});
      }
    	let d = Device.find().fetch()
      	let o=[]
      	d.forEach(d=>{
      		const {feedbacks}=d;
      		let data = sumObjectsByKey(...feedbacks)
      		Object.assign(data,{id:d.id})
      		o.push(data)
      	})
      	if(param==='lowest'){
      		o.sort((a,b)=>a.one-b.one)
      		return o.map(o=>
      				<tr key={o.id}>
      					<td>{o.id}</td>
      					<td>{o.one}</td>
      				</tr>
      		)
      	}
      	else if(param==='highest'){
      		o.sort((a,b)=>b.four-a.four)
      		return o.map(o=>
      				<tr key={o.id}>
      					<td>{o.id}</td>
      					<td>{o.four}</td>
      				</tr>
      		)
      	}
    
    }
    render() {
    	return (
    		<div>
    		<button className="d-sm-inline-block btn btn-sm btn-primary shadow-sm" onClick={()=>this.generateReport()}><i className="fas fa-download fa-sm text-white-50"></i> Generate Report</button>
    		<div id='print-form'>
    		<div><canvas ref="chart"  /></div>
    		<h1 className="h3 mb-2 text-gray-800">Feedback Analysis</h1>
    		 
    		
		   	<div className="card shadow mb-4">
		            <div className="card-header py-3">
		              <h6 className="m-0 font-weight-bold text-primary">Feedback by numbers</h6>
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
		                      <th>{this.props.d.reduce(function(acc, val) { return acc + val; }, 0)}</th>
		                      <th>{this.props.d[0]}</th>
		                      <th>{this.props.d[1]}</th>
		                      <th>{this.props.d[2]}</th>
		                      <th>{this.props.d[3]}</th>
		                    </tr>
		                  </tbody>
		                </table>
		              </div>
		            </div>
		    </div>
		    
		    <div className='row'>
		    	<div className='col-lg-6'>
				    <h1 className="h3 mb-2 text-gray-800">List of Devices that received lowest number of poor feedback </h1>
		    		 
		    		
				   	<div className="card shadow mb-4">
				            <div className="card-header py-3">
				              <h6 className="m-0 font-weight-bold text-primary">Feedback by numbers</h6>
				            </div>
				            <div className="card-body">
				              <div className="table-responsive">
				                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
				                  <thead className='card-header'>
				                    <tr>
				                      <th>Device ID</th>
				                      <th>Total Number of lowest feedbacks</th>
				                    </tr>
				                  </thead>
				                  
				                  <tbody>
				                   	{this.getList('lowest')}
				                  </tbody>
				                </table>
				              </div>
				            </div>
				    </div>
				</div>
				<div className='col-lg-6'>

				    <h1 className="h3 mb-2 text-gray-800">List of Devices that received highest number of excellent feedback  </h1>
		    		 
		    		
				   	<div className="card shadow mb-4">
				            <div className="card-header py-3">
				              <h6 className="m-0 font-weight-bold text-primary">Feedback by numbers</h6>
				            </div>
				            <div className="card-body">
				              <div className="table-responsive">
				                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
				                  <thead className='card-header'>
				                    <tr>
				                      <th>Device ID</th>
				                      <th>Total Number of highest feedbacks</th>
				                    </tr>
				                  </thead>
				                  
				                  <tbody>
				                   	{this.getList('highest')}
				                  </tbody>
				                </table>
				              </div>
				            </div>
				    </div>
				</div>
			</div>
			<h1 className="h3 mb-2 text-gray-800">Days that received lowest number of poor feedbacks and highest number of excellent feedbacks</h1>
    		 
    		
		   	<div className="card shadow mb-4">
		            <div className="card-header py-3">
		              <h6 className="m-0 font-weight-bold text-primary">Feedback by numbers</h6>
		            </div>
		            <div className="card-body">
		              <div className="table-responsive">
		                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
		                  <thead className='card-header'>
		                    <tr>
		                      <th>Lowest Number of poor feedbacks</th>
		                      <th>Highest Number of excellent feedbacks</th>
		                    </tr>
		                  </thead>
		                  
		                  <tbody>
		                  	<tr>
		                  	<td>{this.getDays('lowest')}</td>
		                   	<td>{this.getDays('highest')}</td>
		                   	</tr>
		                  </tbody>
		                </table>
		              </div>
		            </div>
		    </div>
			</div>
    		</div>
    	);
    }

}

export default withTracker(()=>{
	Meteor.subscribe('devices');
	function sumObjectsByKey(...objs) {
        return objs.reduce((a, b) => {
          for (let k in b) {
            if (b.hasOwnProperty(k))
              a[k] = (a[k] || 0) + b[k];
          }
          return a;
        }, {});
      }
      let deviceList = Device.find({owner:Meteor.userId()}).fetch()
      let d = [];
      deviceList.map(data=>{
        const {feedbacks} = data
        d.push(sumObjectsByKey(...feedbacks))
      })
      let data = sumObjectsByKey(...d)
      data = Object.values(data)
      data.pop()
      
	return{
		deviceList:Device.find().fetch(),
		d:data
	}
})(UserDashboard)