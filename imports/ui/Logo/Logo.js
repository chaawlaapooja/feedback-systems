import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';

const Logo = () => {
  return (
    <div  style={{padding:'3%'}}>
      <Tilt className="Tilt" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner">
          <img style={{padding: '5px', margin:'5px'}} alt='logo' src='https://res.cloudinary.com/luckymobile/image/upload/c_scale,w_130/v1577454133/feedback/image1.jpg'/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;