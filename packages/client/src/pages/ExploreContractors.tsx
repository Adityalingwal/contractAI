import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ExploreContractors.css'; 
import ContractorDashboard from './ContractorDashboard';

const ExploreContractors: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const location = useLocation();
  
  // Function to render the appropriate content based on active tab
  const renderContent = () => {
    switch(activeTab) {
      case 'createProfile':
        return <ContractorDashboard />;
      case 'dashboard':
      default:
        return (
          <>
            <div className="content-header">
              <h1>Explore Contractors</h1>
            </div>
            <div className="content-body">
              <p>Welcome to the Explore Contractors dashboard. Select an option from the sidebar to get started.</p>
              {/* Display data from location state if available */}
              {location.state?.contractorData && (
                <div className="mt-4">
                  <h2>Recently Added Contractor:</h2>
                  <pre>{JSON.stringify(location.state.contractorData, null, 2)}</pre>
                </div>
              )}
            </div>
          </>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Contractor Portal</h3>
        </div>
        
        <div className="sidebar-menu">
          <ul>
            <li>
              <button
                onClick={() => setActiveTab('dashboard')} 
                className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              >
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </button>
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
            <li>
              <button
                onClick={() => setActiveTab('createProfile')} 
                className={`menu-item ${activeTab === 'createProfile' ? 'active' : ''}`}
              >
                <i className="fas fa-file-contract"></i>
                <span>Create Profile</span>
              </button>
            </li>
          </ul>
          
          <div className="home-link-container">
            <Link to="/" className="menu-item home-link">
              <i className="fas fa-home"></i>
              <span>Return to Home</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default ExploreContractors;
