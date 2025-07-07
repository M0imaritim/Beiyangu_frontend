import { useState, useEffect, useCallback } from "react";
import { dashboardApiService } from "../services/dashboardApi";
import {
  BuyerDashboardData,
  SellerDashboardData,
  User,
} from "../../../types/dash";

interface UseDashboardProps {
  user: User | null;
  activeTab: string;
}

interface UseDashboardReturn {
  buyerData: BuyerDashboardData | null;
  sellerData: SellerDashboardData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useDashboard = ({
  user,
  activeTab,
}: UseDashboardProps): UseDashboardReturn => {
  const [buyerData, setBuyerData] = useState<BuyerDashboardData | null>(null);
  const [sellerData, setSellerData] = useState<SellerDashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    if (!user?.token) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch buyer data if needed
      if (
        activeTab === "buyer" ||
        user.role === "buyer" ||
        user.role === "both"
      ) {
        const buyerResponse = await dashboardApiService.fetchBuyerDashboard(
          user.token
        );
        setBuyerData(buyerResponse);
      }

      // Fetch seller data if needed
      if (
        activeTab === "seller" ||
        user.role === "seller" ||
        user.role === "both"
      ) {
        const sellerResponse = await dashboardApiService.fetchSellerDashboard(
          user.token
        );
        setSellerData(sellerResponse);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [activeTab, user]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    buyerData,
    sellerData,
    loading,
    error,
    refetch: fetchDashboardData,
  };
};

// Additional hooks for specific dashboard actions
export const useDashboardActions = () => {
  const handleRequestAction = (action: string, request: any) => {
    console.log(`${action} request:`, request);
    // TODO: Implement request actions (view, edit, delete)
    // This is where you would call your API service methods
  };

  const handleBidAction = (action: string, bid: any) => {
    console.log(`${action} bid:`, bid);
    // TODO: Implement bid actions
    // This is where you would call your API service methods
  };

  const handleNewRequest = () => {
    console.log("Navigate to new request page");
    // TODO: Implement navigation to new request page
  };

  const handleBrowseRequests = () => {
    console.log("Navigate to browse requests page");
    // TODO: Implement navigation to browse requests page
  };

  return {
    handleRequestAction,
    handleBidAction,
    handleNewRequest,
    handleBrowseRequests,
  };
};
