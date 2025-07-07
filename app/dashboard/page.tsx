"use client";
import React, { useState } from "react";

import { LoadingSpinner, ErrorMessage } from "@/components/ui";
import {
  DashboardHeader,
  NavigationTabs,
  BuyerDashboardSection,
  SellerDashboardSection,
} from "./sections";
import { useDashboard, useDashboardActions } from "./hooks/useDashboard";

interface DashboardProps {
  userRole?: "buyer" | "seller" | "both";
}

const Dashboard: React.FC<DashboardProps> = ({ userRole = "buyer" }) => {
  const [activeTab, setActiveTab] = useState<string>(
    userRole === "seller" ? "seller" : "buyer"
  );

  const { buyerData, sellerData, loading, error, refetch } = useDashboard({
    activeTab,
    userRole,
  });

  const {
    handleRequestAction,
    handleBidAction,
    handleNewRequest,
    handleBrowseRequests,
  } = useDashboardActions();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0F0F0] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F0F0F0] flex items-center justify-center">
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F0F0] p-4">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader
          title="Dashboard"
          subtitle="Welcome back! Here's what's happening with your projects."
        />

        {/* Navigation Tabs - only show for users with 'both' role */}
        {userRole === "both" && (
          <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
        )}

        {/* Buyer Dashboard */}
        {activeTab === "buyer" && buyerData && (
          <BuyerDashboardSection
            data={buyerData}
            onNewRequest={handleNewRequest}
            onViewRequest={(req) => handleRequestAction("view", req)}
            onEditRequest={(req) => handleRequestAction("edit", req)}
            onDeleteRequest={(req) => handleRequestAction("delete", req)}
          />
        )}

        {/* Seller Dashboard */}
        {activeTab === "seller" && sellerData && (
          <SellerDashboardSection
            data={sellerData}
            onBrowseRequests={handleBrowseRequests}
            onViewBid={(bid) => handleBidAction("view", bid)}
          />
        )}

        {/* Show message if no data is available */}
        {!buyerData && !sellerData && !loading && (
          <div className="text-center py-12">
            <p className="text-[#888888] text-lg">
              No dashboard data available for the selected view.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
