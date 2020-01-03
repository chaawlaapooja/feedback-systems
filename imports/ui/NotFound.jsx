import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <div style={{display:'flex', justifyContent:'center'}}>
      <div>
        <h1>404 - Page Not Found</h1>
        <p>We're unable to find that page.</p>
        <Link to="/" className="button button--link">HEAD HOME</Link>
      </div>
    </div>
  );
};
