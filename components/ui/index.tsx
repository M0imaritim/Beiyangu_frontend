import React from "react";
import { Loader2, RefreshCw, AlertCircle } from "lucide-react";

// Card Component
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = false,
}) => (
  <div
    className={`bg-[#FEFEFE] border border-[#F0F0F0] rounded-lg shadow-sm p-4 ${
      hover ? "hover:shadow-md transition-shadow duration-200" : ""
    } ${className}`}
  >
    {children}
  </div>
);

// Badge Component
interface BadgeProps {
  status: string;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ status, children }) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "accepted":
        return "bg-[#B38B59] text-white";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
        status
      )}`}
    >
      {children || status}
    </span>
  );
};

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200";

  const variants = {
    primary: "bg-[#B38B59] text-[#FEFEFE] hover:bg-[#9A7A4F]",
    secondary: "bg-[#113E21] text-[#FEFEFE] hover:bg-[#0F3520]",
    outline:
      "border border-[#B38B59] text-[#B38B59] hover:bg-[#B38B59] hover:text-[#FEFEFE]",
    ghost: "text-[#113E21] hover:bg-[#F0F0F0]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};

// Loading Spinner Component
export const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center py-8">
    <Loader2 className="h-8 w-8 animate-spin text-[#B38B59]" />
  </div>
);

// Error Message Component
interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
}) => (
  <div className="text-center py-8">
    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
    <p className="text-red-600 mb-4">{message}</p>
    <Button variant="outline" onClick={onRetry}>
      <RefreshCw className="h-4 w-4 mr-2" />
      Retry
    </Button>
  </div>
);
