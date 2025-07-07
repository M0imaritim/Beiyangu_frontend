import React from "react";
import {
  DollarSign,
  TrendingUp,
  Clock,
  User,
  Eye,
  Edit3,
  Trash2,
} from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { Request, Bid } from "../../types/dash";

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  trend?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
}) => (
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-[#888888] mb-1">{title}</p>
        <p className="text-2xl font-bold text-[#113E21]">{value}</p>
        {description && (
          <p className="text-xs text-[#888888] mt-1">{description}</p>
        )}
      </div>
      <div className="h-12 w-12 bg-[#B38B59] bg-opacity-10 rounded-lg flex items-center justify-center">
        <Icon className="h-6 w-6 text-[#B38B59]" />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center text-sm">
        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
        <span className="text-green-500">{trend}</span>
      </div>
    )}
  </Card>
);

// Request Card Component
interface RequestCardProps {
  request: Request;
  onView: (request: Request) => void;
  onEdit: (request: Request) => void;
  onDelete: (request: Request) => void;
}

export const RequestCard: React.FC<RequestCardProps> = ({
  request,
  onView,
  onEdit,
  onDelete,
}) => (
  <Card hover className="cursor-pointer">
    <div className="flex justify-between items-start mb-3">
      <div className="flex-1">
        <h3 className="font-semibold text-[#113E21] mb-1 line-clamp-1">
          {request.title}
        </h3>
        <p className="text-sm text-[#888888] mb-2 line-clamp-2">
          {request.description}
        </p>
      </div>
      <Badge status={request.status}>{request.status_display}</Badge>
    </div>

    <div className="flex items-center justify-between text-sm text-[#888888] mb-3">
      <div className="flex items-center">
        <DollarSign className="h-4 w-4 mr-1" />
        <span className="font-medium text-[#113E21]">${request.budget}</span>
      </div>
      <div className="flex items-center">
        <User className="h-4 w-4 mr-1" />
        <span>{request.bid_count} bids</span>
      </div>
    </div>

    {request.deadline && (
      <div className="flex items-center text-sm text-[#888888] mb-3">
        <Clock className="h-4 w-4 mr-1" />
        <span>{request.time_until_deadline}</span>
      </div>
    )}

    <div className="flex justify-between items-center pt-3 border-t border-[#F0F0F0]">
      <span className="text-xs text-[#888888]">
        Created {new Date(request.created_at).toLocaleDateString()}
      </span>
      <div className="flex space-x-2">
        <Button variant="ghost" size="sm" onClick={() => onView(request)}>
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onEdit(request)}>
          <Edit3 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(request)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </Card>
);

// Bid Card Component
interface BidCardProps {
  bid: Bid;
  onView: (bid: Bid) => void;
}

export const BidCard: React.FC<BidCardProps> = ({ bid, onView }) => (
  <Card hover className="cursor-pointer">
    <div className="flex justify-between items-start mb-3">
      <div className="flex-1">
        <h3 className="font-semibold text-[#113E21] mb-1">
          {bid.request_title}
        </h3>
        <p className="text-sm text-[#888888]">Bid Amount: ${bid.amount}</p>
      </div>
      <Badge status={bid.status}>{bid.status_display}</Badge>
    </div>

    <div className="flex justify-between items-center pt-3 border-t border-[#F0F0F0]">
      <span className="text-xs text-[#888888]">
        Submitted {new Date(bid.created_at).toLocaleDateString()}
      </span>
      <Button variant="ghost" size="sm" onClick={() => onView(bid)}>
        <Eye className="h-4 w-4" />
      </Button>
    </div>
  </Card>
);

// Empty State Component
interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>;
  message: string;
  buttonText: string;
  onButtonClick: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  message,
  buttonText,
  onButtonClick,
}) => (
  <Card className="text-center py-12">
    <Icon className="h-12 w-12 text-[#888888] mx-auto mb-4" />
    <p className="text-[#888888] mb-4">{message}</p>
    <Button variant="primary" onClick={onButtonClick}>
      {buttonText}
    </Button>
  </Card>
);
