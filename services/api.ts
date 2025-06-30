// src/services/api.ts
import axios, { AxiosResponse } from "axios";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  ApiResponse,
} from "@/types/auth";

// Make sure this points to your Railway backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

console.log("API_BASE_URL:", API_BASE_URL); // Debug log to verify URL

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for httpOnly cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.status, error.response?.data);
    if (error.response?.status === 401) {
      // Handle unauthorized - could redirect to login
      console.log("Unauthorized request");
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authApi = {
  // Register new user
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    try {
      const response: AxiosResponse<AuthResponse> = await api.post(
        "/auth/register/", // Fixed: added /auth/ prefix
        credentials
      );
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || "Registration failed",
        details: error.response?.data?.details,
      };
    }
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      console.log("Attempting login to:", `${API_BASE_URL}/auth/login/`);
      const response: AxiosResponse<AuthResponse> = await api.post(
        "/auth/login/", // Fixed: added /auth/ prefix and trailing slash
        credentials
      );
      return response.data;
    } catch (error: any) {
      console.error("Login error:", error);
      return {
        success: false,
        error:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Login failed",
      };
    }
  },

  // Get current user info
  me: async (): Promise<AuthResponse> => {
    try {
      const response: AxiosResponse<AuthResponse> = await api.get("/auth/me/");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || "Failed to get user info",
      };
    }
  },

  // Logout user
  logout: async (): Promise<ApiResponse> => {
    try {
      const response: AxiosResponse<ApiResponse> = await api.post(
        "/auth/logout/"
      );
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || "Logout failed",
      };
    }
  },

  // Refresh token
  refresh: async (): Promise<AuthResponse> => {
    try {
      const response: AxiosResponse<AuthResponse> = await api.post(
        "/auth/refresh/"
      );
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || "Token refresh failed",
      };
    }
  },
};

export default api;
