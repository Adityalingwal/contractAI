import React from 'react';
import { Link } from 'react-router-dom';
import './ExploreContractors.css'; // You'll need to create this CSS file

const ExploreContractors: React.FC = () => {
  return (
    <div className="dashboard-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Contractor Portal</h3>
        </div>
        
        <div className="sidebar-menu">
          <ul>
            <li>
              <Link to="/dashboard" className="menu-item active">
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/payment-status" className="menu-item">
                <i className="fas fa-money-bill-wave"></i>
                <span>Payment Status</span>
              </Link>
            </li>
            <li>
              <Link to="/edit-profile" className="menu-item">
                <i className="fas fa-user-edit"></i>
                <span>Edit Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/my-contracts" className="menu-item">
                <i className="fas fa-file-contract"></i>
                <span>My Contracts</span>
              </Link>
            </li>
          </ul>
          
          {/* Home link at the bottom */}
          <div className="home-link-container">
            <Link to="/" className="menu-item home-link">
              <i className="fas fa-home"></i>
              <span>Return to Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-header">
          <h1>Explore Contractors</h1>
        </div>
        
        <div className="content-body">
          {/* Your main page content will go here */}
          <p>Welcome to the Explore Contractors dashboard. Select an option from the sidebar to get started.</p>
        </div>
      </div>
    </div>
  );
};

export default ExploreContractors;
