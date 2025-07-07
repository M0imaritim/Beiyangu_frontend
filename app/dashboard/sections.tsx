import React from "react";
import {
  DollarSign,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui";
import { StatCard, RequestCard, BidCard, EmptyState } from "./index";
import {
  BuyerDashboardData,
  SellerDashboardData,
  Request,
  Bid,
} from "../../types/dash";

// Dashboard Header Component
interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
}) => (
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-[#113E21] mb-2">{title}</h1>
    <p className="text-[#888888]">{subtitle}</p>
  </div>
);

// Navigation Tabs Component
interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onTabChange,
}) => (
  <div className="mb-8">
    <div className="flex border-b border-[#F0F0F0]">
      <button
        onClick={() => onTabChange("buyer")}
        className={`px-6 py-3 font-medium ${
          activeTab === "buyer"
            ? "text-[#B38B59] border-b-2 border-[#B38B59]"
            : "text-[#888888] hover:text-[#113E21]"
        }`}
      >
        Buyer Dashboard
      </button>
      <button
        onClick={() => onTabChange("seller")}
        className={`px-6 py-3 font-medium ${
          activeTab === "seller"
            ? "text-[#B38B59] border-b-2 border-[#B38B59]"
            : "text-[#888888] hover:text-[#113E21]"
        }`}
      >
        Seller Dashboard
      </button>
    </div>
  </div>
);

// Buyer Dashboard Section
interface BuyerDashboardSectionProps {
  data: BuyerDashboardData;
  onNewRequest: () => void;
  onViewRequest: (request: Request) => void;
  onEditRequest: (request: Request) => void;
  onDeleteRequest: (request: Request) => void;
}

export const BuyerDashboardSection: React.FC<BuyerDashboardSectionProps> = ({
  data,
  onNewRequest,
  onViewRequest,
  onEditRequest,
  onDeleteRequest,
}) => (
  <div className="space-y-8">
    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Requests"
        value={data.stats.total_requests}
        icon={FileText}
        description="All time"
      />
      <StatCard
        title="Open Requests"
        value={data.stats.open_requests}
        icon={Clock}
        description="Currently active"
      />
      <StatCard
        title="Completed"
        value={data.stats.completed_requests}
        icon={CheckCircle}
        description="Finished projects"
      />
      <StatCard
        title="Total Spent"
        value={`$${data.stats.total_spent}`}
        icon={DollarSign}
        description="All time spending"
      />
    </div>

    {/* Recent Requests */}
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#113E21]">
          Recent Requests
        </h2>
        <Button variant="primary" onClick={onNewRequest}>
          + New Request
        </Button>
      </div>

      {data.recent_requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.recent_requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onView={onViewRequest}
              onEdit={onEditRequest}
              onDelete={onDeleteRequest}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FileText}
          message="No requests yet"
          buttonText="Create Your First Request"
          onButtonClick={onNewRequest}
        />
      )}
    </div>
  </div>
);

// Seller Dashboard Section
interface SellerDashboardSectionProps {
  data: SellerDashboardData;
  onBrowseRequests: () => void;
  onViewBid: (bid: Bid) => void;
}

export const SellerDashboardSection: React.FC<SellerDashboardSectionProps> = ({
  data,
  onBrowseRequests,
  onViewBid,
}) => (
  <div className="space-y-8">
    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title="Total Bids"
        value={data.stats.total_bids}
        icon={FileText}
        description="All time"
      />
      <StatCard
        title="Accepted Bids"
        value={data.stats.accepted_bids}
        icon={CheckCircle}
        description="Successful bids"
      />
      <StatCard
        title="Total Earned"
        value={`$${data.stats.total_earned}`}
        icon={DollarSign}
        description="All time earnings"
      />
    </div>

    {/* Recent Bids */}
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#113E21]">Recent Bids</h2>
        <Button variant="primary" onClick={onBrowseRequests}>
          Browse Requests
        </Button>
      </div>

      {data.recent_bids.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.recent_bids.map((bid) => (
            <BidCard key={bid.id} bid={bid} onView={onViewBid} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={TrendingUp}
          message="No bids submitted yet"
          buttonText="Browse Available Requests"
          onButtonClick={onBrowseRequests}
        />
      )}
    </div>
  </div>
);
