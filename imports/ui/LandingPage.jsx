import React from 'react';
import { Link } from 'react-router';
import Particles from 'react-particles-js';
import Logo from './Logo/Logo.js'
import './lp.css'
import Contact from '/imports/ui/user/Contact';
import Footer from '/imports/ui/common/Footer';
const particlesOptions = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}
const LandingPage = () => {
  return (
    <div className="App" style={{fontFamily: `Courier New, Courier, monospace`, padding:'20px'}}>
    	<Particles className='particles'
          params={particlesOptions}/>
          
        <nav style={{display: 'flex', justifyContent: 'space-between'}}>
          <h2><Logo/> Feedback-Systems</h2>
          <Link to="/signin"><h2>Sign In</h2></Link>
        </nav>
        <div>
        <ul style={{listStyle:'sqaure', lineHeight:'50px'}}>
        	<li>Right from the ancient times, Feedback has been considered as the great tool for fostering the growth for companies. With feedbacks, companies have been improving their performance as well as the quality of products/services they deliver.</li>
        	<li>In today's modern world, with changing times are changing the methods of receiving feedback. When everything around has digitalized, the Feedback-Systems are digitlaized too.</li>
        	<li>Gone are the times when there were feedback-forms(no matter on-paper forms or online feedback forms).</li>
        	<li>People are switching to feedback machines that store instantenous results and monitor real-time data quickly.</li>
        	<li>So, here we are, introuducing our Feedback-Systems that lets you anonymously collect feedback, monitor them and get a quick report for your products/services</li>
       		<li>Contact us on +91-XXX-XXX-XXXX to get feedback machine install in your office.</li>
        </ul>
        </div>
        <Contact/>
        <br/>
        <Footer/>
    </div>
  );
};
export default LandingPage;