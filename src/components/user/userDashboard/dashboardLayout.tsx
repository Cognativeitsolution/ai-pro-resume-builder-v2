// src/components/user/dashboardLayout.tsx
'use client';

import React, { useState } from 'react';
import UserDashboard from './userDashboard';
import UserHeader from './header/header';

import Dashboard from '../dashboard/dashboard';
import Documents from '../documents/documents';
import Services from '../services/services';
import Transactions from '../transactions/transactions';
import Profile from '../profile/profile';


const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const renderComponent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard />;
      case "Documents":
        return <Documents />;
      case "Services":
        return <Services />;
      case "Transactions":
        return <Transactions />;
      case "Profile":
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex">
      <UserDashboard activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 ml-48 lg:ml-72 min-h-screen bg-white">
        <UserHeader />
        <div className="p-5">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
