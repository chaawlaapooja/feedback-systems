import React from 'react';
import {Link} from 'react-router';
const Sidebar = (props) =>{
  if(props.level==='admin')
	return(
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/adminpanel">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Feedback-Systems</div>
      </Link>

      <hr className="sidebar-divider my-0"/>

      <li className="nav-item active">
        <Link className="nav-link" to="/adminpanel">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span></Link>
      </li>

      <hr className="sidebar-divider"/>

      
      <div className="sidebar-heading">
        Add
      </div>
      <li className="nav-item">
        <Link className="nav-link" to="/device">
          <i className="fas fa-fw fa-tablet-alt"></i>
          <span>Device</span></Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/user">
          <i className="fas fa-fw fa-user"></i>
          <span>User</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/map">
          <i className="fas fa-fw fa-arrows-alt-h"></i>
          <span>Map user & device</span></Link>
      </li>
      <hr className="sidebar-divider d-none d-md-block"/>
      
      <li className="nav-item">
        <Link className="nav-link" to="/editUser">
          <i className="fas fa-fw fa-ban"></i>
          <span>Block/Activate User</span></Link>
      </li>
      
      <hr className="sidebar-divider d-none d-md-block"/>
      <li className="nav-item">
        <Link className="nav-link" to="/queries">
          <i className="fas fa-fw fa-question-circle"></i>
          <span>Queries</span></Link>
      </li>

      <hr className="sidebar-divider d-none d-md-block"/>

      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>

    </ul>
  )
  else if(props.level==='user')
  return(
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Feedback-Systems</div>
      </Link>

      <hr className="sidebar-divider my-0"/>

      <li className="nav-item active">
        <Link className="nav-link" to="/dashboard">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span></Link>
      </li>

      <hr className="sidebar-divider"/>
      
      <div className="sidebar-heading">
        Reports
      </div>
      <li className="nav-item">
        <Link className="nav-link" to="/filteredReports">
          <i className="fab fa-wpforms"></i>
          <span>Filtered Reports</span></Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/datewiseReports">
          <i className="fas fa-calendar-alt"></i>
          <span>Datewise Reports</span></Link>
      </li>
      <hr className="sidebar-divider d-none d-md-block"/>

      <li className="nav-item">
        <Link className="nav-link" to="/contact">
          <i className="fas fa-question"></i>
          <span>Contact</span></Link>
      </li>
      <hr className="sidebar-divider d-none d-md-block"/>
      
      <li className="nav-item">
        <Link className="nav-link" to="/profile">
          <i className="fas fa-users-cog"></i>
          <span>Profile</span></Link>
      </li>

      <hr className="sidebar-divider d-none d-md-block"/>

      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>

  </ul>
  )
}

export default Sidebar;
