import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import StatusColumn from "./StatusColumn";
import BusinessCard from "../business/BusinessCard";

interface Business {
  id: string;
  name: string;
  logo?: string;
  industry?: string;
  location?: string;
  revenue?: string;
  employees?: number;
  contactCount?: number;
  status: "Researching" | "Contacting" | "Negotiating" | "Partner" | "Inactive";
  isFavorite?: boolean;
}

interface StatusBoardProps {
  businesses?: Business[];
  onAddBusiness?: (status: string) => void;
  onBusinessClick?: (id: string) => void;
  onFavoriteToggle?: (id: string) => void;
}

const StatusBoard = ({
  businesses = [
    {
      id: "1",
      name: "Acme Corporation",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=acme",
      industry: "Technology",
      location: "San Francisco, CA",
      revenue: "$10M",
      employees: 50,
      contactCount: 3,
      status: "Researching",
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
      contactCount: 5,
      status: "Contacting",
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
      contactCount: 8,
      status: "Negotiating",
      isFavorite: false,
    },
    {
      id: "4",
      name: "Wayne Industries",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=wayne",
      industry: "Technology",
      location: "Gotham City",
      revenue: "$75M",
      employees: 350,
      contactCount: 6,
      status: "Partner",
      isFavorite: true,
    },
    {
      id: "5",
      name: "Umbrella Corporation",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=umbrella",
      industry: "Pharmaceuticals",
      location: "Raccoon City",
      revenue: "$50M",
      employees: 200,
      contactCount: 2,
      status: "Inactive",
      isFavorite: false,
    },
    {
      id: "6",
      name: "Oscorp Industries",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=oscorp",
      industry: "Research",
      location: "New York, NY",
      revenue: "$40M",
      employees: 180,
      contactCount: 4,
      status: "Researching",
      isFavorite: false,
    },
    {
      id: "7",
      name: "Cyberdyne Systems",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=cyberdyne",
      industry: "AI & Robotics",
      location: "Sunnyvale, CA",
      revenue: "$60M",
      employees: 250,
      contactCount: 3,
      status: "Contacting",
      isFavorite: true,
    },
  ],
  onAddBusiness = (status) => console.log(`Add business to ${status}`),
  onBusinessClick = (id) => console.log(`Business clicked: ${id}`),
  onFavoriteToggle = (id) => console.log(`Toggle favorite: ${id}`),
}: StatusBoardProps) => {
  // Group businesses by status
  const businessesByStatus = {
    Researching: businesses.filter((b) => b.status === "Researching"),
    Contacting: businesses.filter((b) => b.status === "Contacting"),
    Negotiating: businesses.filter((b) => b.status === "Negotiating"),
    Partner: businesses.filter((b) => b.status === "Partner"),
    Inactive: businesses.filter((b) => b.status === "Inactive"),
  };

  // Status columns configuration
  const statusColumns = [
    { title: "Researching", color: "bg-blue-100 text-blue-800" },
    { title: "Contacting", color: "bg-yellow-100 text-yellow-800" },
    { title: "Negotiating", color: "bg-purple-100 text-purple-800" },
    { title: "Partner", color: "bg-green-100 text-green-800" },
    { title: "Inactive", color: "bg-gray-100 text-gray-800" },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Business Status Board
          </h2>
          <Button size="sm" className="flex items-center gap-1">
            <Plus size={16} />
            <span>Add Business</span>
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="flex space-x-4 min-h-[800px]">
          {statusColumns.map((column) => {
            const statusBusinesses =
              businessesByStatus[
                column.title as keyof typeof businessesByStatus
              ];
            return (
              <StatusColumn
                key={column.title}
                title={column.title}
                count={statusBusinesses.length}
                color={column.color}
                onAddBusiness={() => onAddBusiness(column.title)}
                businesses={statusBusinesses.map((business) => ({
                  id: business.id,
                  name: business.name,
                  logo: business.logo,
                  industry: business.industry,
                  location: business.location,
                  revenue: business.revenue,
                  employees: business.employees,
                  isFavorite: business.isFavorite,
                }))}
              />
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default StatusBoard;
