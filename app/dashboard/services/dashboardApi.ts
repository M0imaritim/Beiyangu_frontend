import {
  BuyerDashboardData,
  SellerDashboardData,
  ApiResponse,
} from "../../../types/dash";

class DashboardApiService {
  private baseURL: string;

  constructor(baseURL: string = "http://localhost:8000/api") {
    this.baseURL = baseURL;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      credentials: "include", // ✅ Send cookies with request
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse<T> = await response.json();

    if (!data.success) {
      throw new Error(data.message || "API request failed");
    }

    return data.data;
  }

  async fetchBuyerDashboard(): Promise<BuyerDashboardData> {
    return this.makeRequest<BuyerDashboardData>("/dashboard/buyer/");
  }

  async fetchSellerDashboard(): Promise<SellerDashboardData> {
    return this.makeRequest<SellerDashboardData>("/dashboard/seller/");
  }

  async refreshDashboard(role: "buyer" | "seller") {
    if (role === "buyer") {
      return this.fetchBuyerDashboard();
    } else {
      return this.fetchSellerDashboard();
    }
  }
}

// Export a singleton instance
export const dashboardApiService = new DashboardApiService();

// Export the class for custom instances if needed
export { DashboardApiService };
