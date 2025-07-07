import { useState, useEffect, useCallback } from "react";
import apiService from "../../../services/api";
import { BuyerDashboardData, SellerDashboardData } from "../../../types/dash";

interface UseDashboardProps {
  activeTab: string;
  userRole?: "buyer" | "seller" | "both";
}

interface UseDashboardReturn {
  buyerData: BuyerDashboardData | null;
  sellerData: SellerDashboardData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useDashboard = ({
  activeTab,
  userRole = "buyer",
}: UseDashboardProps): UseDashboardReturn => {
  const [buyerData, setBuyerData] = useState<BuyerDashboardData | null>(null);
  const [sellerData, setSellerData] = useState<SellerDashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch buyer data if needed
      if (
        activeTab === "buyer" ||
        userRole === "buyer" ||
        userRole === "both"
      ) {
        const buyerResponse = await apiService.get("/dashboard/buyer/");

        // Handle the response format from your API service
        if (buyerResponse.success === false) {
          throw new Error(
            buyerResponse.error || "Failed to fetch buyer dashboard"
          );
        }

        // If the response is wrapped in a success structure, extract the data
        setBuyerData(buyerResponse.data || buyerResponse);
      }

      // Fetch seller data if needed
      if (
        activeTab === "seller" ||
        userRole === "seller" ||
        userRole === "both"
      ) {
        const sellerResponse = await apiService.get("/dashboard/seller/");

        // Handle the response format from your API service
        if (sellerResponse.success === false) {
          throw new Error(
            sellerResponse.error || "Failed to fetch seller dashboard"
          );
        }

        // If the response is wrapped in a success structure, extract the data
        setSellerData(sellerResponse.data || sellerResponse);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [activeTab, userRole]);

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
  const handleRequestAction = async (action: string, request: any) => {
    console.log(`${action} request:`, request);
    // TODO: Implement request actions using apiService
    // Example:
    // if (action === "delete") {
    //   await apiService.postJSON(`/requests/${request.id}/delete/`, {});
    // }
  };

  const handleBidAction = async (action: string, bid: any) => {
    console.log(`${action} bid:`, bid);
    // TODO: Implement bid actions using apiService
    // Example:
    // if (action === "withdraw") {
    //   await apiService.postJSON(`/bids/${bid.id}/withdraw/`, {});
    // }
  };

  const handleNewRequest = () => {
    console.log("Navigate to new request page");
    // TODO: Implement navigation to new request page
    // Example: router.push("/requests/new");
  };

  const handleBrowseRequests = () => {
    console.log("Navigate to browse requests page");
    // TODO: Implement navigation to browse requests page
    // Example: router.push("/requests");
  };

  return {
    handleRequestAction,
    handleBidAction,
    handleNewRequest,
    handleBrowseRequests,
  };
};
