import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

interface Business {
  id: string;
  name: string;
  logo?: string;
  industry?: string;
  location?: string;
  revenue?: string;
  employees?: number;
  isFavorite?: boolean;
}

interface BusinessCardProps {
  business: Business;
}

// Inline BusinessCard component since we can't import it correctly
const BusinessCard = ({
  business = {
    id: "1",
    name: "Acme Corporation",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=acme",
    industry: "Technology",
    location: "San Francisco, CA",
    revenue: "$10M",
    employees: 50,
    isFavorite: false,
  },
}: BusinessCardProps) => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {business.logo ? (
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
              <img
                src={business.logo}
                alt={business.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-800 font-medium">
                {business.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h3 className="font-medium text-gray-900">{business.name}</h3>
            {business.industry && (
              <p className="text-sm text-gray-500">{business.industry}</p>
            )}
          </div>
        </div>
        <button
          className={`text-gray-400 hover:text-yellow-500 ${
            business.isFavorite ? "text-yellow-500" : ""
          }`}
          aria-label={
            business.isFavorite ? "Remove from favorites" : "Add to favorites"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={business.isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      </div>

      <div className="mt-3 space-y-1">
        {business.location && (
          <p className="text-xs text-gray-500 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {business.location}
          </p>
        )}

        <div className="flex justify-between text-xs text-gray-500">
          {business.revenue && <span>{business.revenue}</span>}
          {business.employees && <span>{business.employees} employees</span>}
        </div>
      </div>
    </div>
  );
};

interface StatusColumnProps {
  title: string;
  count?: number;
  businesses?: Business[];
  color?: string;
  onAddBusiness?: () => void;
}

const StatusColumn = ({
  title = "Status",
  count = 0,
  businesses = [
    {
      id: "1",
      name: "Acme Corporation",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=acme",
      industry: "Technology",
      location: "San Francisco, CA",
      revenue: "$10M",
      employees: 50,
      isFavorite: true,
    },
    {
      id: "2",
      name: "Globex Industries",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=globex",
      industry: "Manufacturing",
      location: "Chicago, IL",
      revenue: "$25M",
      employees: 120,
      isFavorite: false,
    },
    {
      id: "3",
      name: "Stark Enterprises",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=stark",
      industry: "Defense",
      location: "New York, NY",
      revenue: "$100M",
      employees: 500,
      isFavorite: false,
    },
  ],
  color = "bg-blue-100",
  onAddBusiness = () => {},
}: StatusColumnProps) => {
  // Determine the badge color based on status
  const getBadgeColor = () => {
    switch (title.toLowerCase()) {
      case "researching":
        return "bg-blue-100 text-blue-800";
      case "contacting":
        return "bg-yellow-100 text-yellow-800";
      case "negotiating":
        return "bg-purple-100 text-purple-800";
      case "partner":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="flex flex-col h-full w-[240px] bg-white rounded-md shadow-sm border border-gray-200">
      {/* Column Header */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium text-gray-800">{title}</h3>
            <Badge className={getBadgeColor()}>{count}</Badge>
          </div>
          <button
            onClick={onAddBusiness}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Add business"
          >
            <Plus size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Scrollable Business Cards */}
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-3">
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default StatusColumn;
