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

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>(
    user?.role === "seller" ? "seller" : "buyer"
  );

  const { buyerData, sellerData, loading, error, refetch } = useDashboard({
    user,
    activeTab,
  });

  const {
    handleRequestAction,
    handleBidAction,
    handleNewRequest,
    handleBrowseRequests,
  } = useDashboardActions();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-[#F0F0F0] p-4">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader
          title="Dashboard"
          subtitle="Welcome back! Here's what's happening with your projects."
        />

        {/* Navigation Tabs - only show for users with 'both' role */}
        {user?.role === "both" && (
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
      </div>
    </div>
  );
};

export default Dashboard;
