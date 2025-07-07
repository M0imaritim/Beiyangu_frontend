export interface BuyerStats {
  total_requests: number;
  open_requests: number;
  completed_requests: number;
  total_spent: number;
}

export interface SellerStats {
  total_bids: number;
  accepted_bids: number;
  total_earned: number;
}

export interface Request {
  id: number;
  public_id: string;
  title: string;
  description: string;
  budget: string;
  buyer: number;
  buyer_name: string;
  buyer_username: string;
  status: string;
  status_display: string;
  category: string | null;
  deadline: string | null;
  bid_count: number;
  is_expired: boolean | null;
  can_be_bid_on: boolean;
  time_until_deadline: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface Bid {
  id: number;
  public_id: string;
  request_title: string;
  amount: string;
  status: string;
  status_display: string;
  created_at: string;
  updated_at: string;
}

export interface BuyerDashboardData {
  stats: BuyerStats;
  recent_requests: Request[];
}

export interface SellerDashboardData {
  stats: SellerStats;
  recent_bids: Bid[];
}

export interface User {
  id: number;
  role: "buyer" | "seller" | "both";
  token: string;
  email?: string;
  name?: string;
}
