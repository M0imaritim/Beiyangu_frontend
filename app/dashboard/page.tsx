"use client";
import React, { useState, useEffect } from "react";
import {
  User,
  Package,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Eye,
  MessageSquare,
  Calendar,
  MapPin,
  Tag,
  RefreshCw,
} from "lucide-react";
import { dashboardApi } from "@/services/api";
import type { BuyerDashboardData, SellerDashboardData } from "@/services/api";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("buyer");
  const [buyerData, setBuyerData] = useState<BuyerDashboardData | null>(null);
  const [sellerData, setSellerData] = useState<SellerDashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (activeTab === "buyer") {
        const response = await dashboardApi.getBuyerDashboard();
        if (response.success && response.data) {
          setBuyerData(response.data as BuyerDashboardData);
        } else {
          throw new Error(
            response.error || "Failed to fetch buyer dashboard data"
          );
        }
      } else {
        const response = await dashboardApi.getSellerDashboard();
        if (response.success && response.data) {
          setSellerData(response.data as SellerDashboardData);
        } else {
          throw new Error(
            response.error || "Failed to fetch seller dashboard data"
          );
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts or tab changes
  useEffect(() => {
    fetchDashboardData();
  }, [activeTab]);

  // Refresh function
  const handleRefresh = () => {
    fetchDashboardData();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "delivered":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    color = "text-[#B38B59]",
  }) => (
    <div className="bg-[#FEFEFE] border border-[#F0F0F0] rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#888888] text-sm font-medium">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          {subtitle && (
            <p className="text-[#888888] text-xs mt-1">{subtitle}</p>
          )}
        </div>
        <Icon className={`h-8 w-8 ${color}`} />
      </div>
    </div>
  );

  const RequestCard = ({ request, showBidCount = false }) => (
    <div className="bg-[#FEFEFE] border border-[#F0F0F0] rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-[#113E21] font-semibold text-lg mb-1">
            {request.title}
          </h3>
          <p className="text-[#888888] text-sm line-clamp-2">
            {request.description}
          </p>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            request.status
          )}`}
        >
          {request.status}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-[#B38B59]">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="font-semibold">
              {formatCurrency(request.budget)}
            </span>
          </div>
          {showBidCount && (
            <div className="flex items-center text-[#888888]">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span className="text-sm">{request.bid_count} bids</span>
            </div>
          )}
        </div>

        <div className="flex items-center text-[#888888] text-sm">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{formatDate(request.created_at)}</span>
        </div>
      </div>

      {request.category && (
        <div className="mt-3 flex items-center">
          <Tag className="h-4 w-4 mr-1 text-[#888888]" />
          <span className="text-[#888888] text-sm">
            {request.category.name}
          </span>
        </div>
      )}
    </div>
  );

  const BidCard = ({ bid, showRequest = false }) => (
    <div className="bg-[#FEFEFE] border border-[#F0F0F0] rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          {showRequest && (
            <h3 className="text-[#113E21] font-semibold mb-1">
              {bid.request.title}
            </h3>
          )}
          <p className="text-[#888888] text-sm line-clamp-2">{bid.message}</p>
        </div>
        <div className="text-right">
          <div className="text-[#B38B59] font-semibold">
            {formatCurrency(bid.amount)}
          </div>
          {bid.is_accepted !== undefined && (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                bid.is_accepted
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {bid.is_accepted ? "Accepted" : "Pending"}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-[#888888]">
        <div className="flex items-center">
          <User className="h-4 w-4 mr-1" />
          <span>{bid.seller?.username || bid.request?.buyer?.username}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{formatDate(bid.created_at)}</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0F0F0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B38B59] mx-auto mb-4"></div>
          <p className="text-[#113E21]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F0F0F0] flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-[#113E21] mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-[#888888] mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="bg-[#B38B59] text-[#FEFEFE] hover:bg-[#9A7A4F] px-4 py-2 rounded-lg inline-flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F0F0]">
      {/* Header */}
      <div className="bg-[#FEFEFE] border-b border-[#F0F0F0] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-[#113E21]">Dashboard</h1>

            <div className="flex items-center space-x-4">
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="text-[#888888] hover:text-[#113E21] p-2 rounded-md transition-colors disabled:opacity-50"
                title="Refresh dashboard"
              >
                <RefreshCw
                  className={`h-5 w-5 ${loading ? "animate-spin" : ""}`}
                />
              </button>

              {/* Tab Navigation */}
              <div className="flex space-x-1 bg-[#F0F0F0] rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("buyer")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "buyer"
                      ? "bg-[#B38B59] text-[#FEFEFE]"
                      : "text-[#888888] hover:text-[#113E21]"
                  }`}
                >
                  Buyer View
                </button>
                <button
                  onClick={() => setActiveTab("seller")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "seller"
                      ? "bg-[#B38B59] text-[#FEFEFE]"
                      : "text-[#888888] hover:text-[#113E21]"
                  }`}
                >
                  Seller View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B38B59] mx-auto mb-4"></div>
            <p className="text-[#113E21]">Loading dashboard...</p>
          </div>
        ) : (
          <>
            {activeTab === "buyer" && buyerData && (
              <div className="space-y-8">
                {/* Buyer Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    icon={Package}
                    title="Total Requests"
                    value={buyerData.stats.total_requests}
                  />
                  <StatCard
                    icon={Clock}
                    title="Open Requests"
                    value={buyerData.stats.open_requests}
                    color="text-blue-600"
                  />
                  <StatCard
                    icon={CheckCircle}
                    title="Completed"
                    value={buyerData.stats.completed_requests}
                    color="text-green-600"
                  />
                  <StatCard
                    icon={DollarSign}
                    title="Total Spent"
                    value={formatCurrency(buyerData.stats.total_spent)}
                  />
                </div>

                {/* Recent Requests */}
                <div className="bg-[#FEFEFE] border border-[#F0F0F0] rounded-lg shadow-sm">
                  <div className="p-6 border-b border-[#F0F0F0]">
                    <h2 className="text-xl font-semibold text-[#113E21]">
                      Recent Requests
                    </h2>
                  </div>
                  <div className="p-6">
                    {buyerData.recent_requests &&
                    buyerData.recent_requests.length > 0 ? (
                      <div className="space-y-4">
                        {buyerData.recent_requests.map((request) => (
                          <RequestCard
                            key={request.id}
                            request={request}
                            showBidCount={true}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-[#888888]">
                        <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No recent requests found</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recent Bids */}
                <div className="bg-[#FEFEFE] border border-[#F0F0F0] rounded-lg shadow-sm">
                  <div className="p-6 border-b border-[#F0F0F0]">
                    <h2 className="text-xl font-semibold text-[#113E21]">
                      Recent Bids on Your Requests
                    </h2>
                  </div>
                  <div className="p-6">
                    {buyerData.recent_bids &&
                    buyerData.recent_bids.length > 0 ? (
                      <div className="space-y-4">
                        {buyerData.recent_bids.map((bid) => (
                          <BidCard key={bid.id} bid={bid} showRequest={true} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-[#888888]">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No recent bids found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "seller" && sellerData && (
              <div className="space-y-8">
                {/* Seller Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    icon={MessageSquare}
                    title="Total Bids"
                    value={sellerData.stats.total_bids}
                  />
                  <StatCard
                    icon={CheckCircle}
                    title="Accepted Bids"
                    value={sellerData.stats.accepted_bids}
                    color="text-green-600"
                  />
                  <StatCard
                    icon={DollarSign}
                    title="Total Earned"
                    value={formatCurrency(sellerData.stats.total_earned)}
                  />
                  <StatCard
                    icon={TrendingUp}
                    title="Pending Earnings"
                    value={formatCurrency(sellerData.stats.pending_earnings)}
                    color="text-orange-600"
                  />
                </div>

                {/* My Bids */}
                <div className="bg-[#FEFEFE] border border-[#F0F0F0] rounded-lg shadow-sm">
                  <div className="p-6 border-b border-[#F0F0F0]">
                    <h2 className="text-xl font-semibold text-[#113E21]">
                      My Recent Bids
                    </h2>
                  </div>
                  <div className="p-6">
                    {sellerData.my_bids && sellerData.my_bids.length > 0 ? (
                      <div className="space-y-4">
                        {sellerData.my_bids.map((bid) => (
                          <BidCard key={bid.id} bid={bid} showRequest={true} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-[#888888]">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No bids placed yet</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Available Requests */}
                <div className="bg-[#FEFEFE] border border-[#F0F0F0] rounded-lg shadow-sm">
                  <div className="p-6 border-b border-[#F0F0F0]">
                    <h2 className="text-xl font-semibold text-[#113E21]">
                      Available Requests
                    </h2>
                  </div>
                  <div className="p-6">
                    {sellerData.available_requests &&
                    sellerData.available_requests.length > 0 ? (
                      <div className="space-y-4">
                        {sellerData.available_requests.map((request) => (
                          <RequestCard
                            key={request.id}
                            request={request}
                            showBidCount={true}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-[#888888]">
                        <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No available requests at the moment</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
