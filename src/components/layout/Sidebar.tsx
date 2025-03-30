import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  LayoutDashboard,
  Building2,
  Users,
  CheckSquare,
  FileText,
  Settings,
  Star,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import BusinessCard from "../business/BusinessCard";

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  favorites?: Array<{
    id: string;
    name: string;
    logo?: string;
    industry?: string;
    status?:
      | "Researching"
      | "Contacting"
      | "Negotiating"
      | "Partner"
      | "Inactive";
  }>;
  onFavoriteSelect?: (id: string) => void;
  activePath?: string;
}

const Sidebar = ({
  collapsed = false,
  onToggleCollapse = () => {},
  favorites = [
    {
      id: "business-1",
      name: "Acme Corporation",
      industry: "Technology",
      status: "Partner",
    },
    {
      id: "business-2",
      name: "Globex Industries",
      industry: "Manufacturing",
      status: "Negotiating",
    },
    {
      id: "business-3",
      name: "Initech LLC",
      industry: "Finance",
      status: "Researching",
    },
  ],
  onFavoriteSelect = () => {},
  activePath = "/dashboard",
}: SidebarProps) => {
  const navItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      label: "Businesses",
      path: "/businesses",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Contacts",
      path: "/contacts",
    },
    {
      icon: <CheckSquare className="h-5 w-5" />,
      label: "Tasks",
      path: "/tasks",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Documents",
      path: "/documents",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      path: "/settings",
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[280px]",
      )}
    >
      {/* Logo and collapse button */}
      <div className="flex items-center justify-between p-4 h-[72px]">
        {!collapsed && (
          <div className="font-semibold text-xl text-primary">CRM Platform</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="ml-auto"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      <Separator />

      {/* Main navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <TooltipProvider delayDuration={collapsed ? 100 : 1000}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={activePath === item.path ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        collapsed ? "px-2" : "px-3",
                      )}
                    >
                      {item.icon}
                      {!collapsed && <span className="ml-3">{item.label}</span>}
                    </Button>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </nav>

      <Separator />

      {/* Favorites section */}
      <div className="py-4 flex-shrink-0">
        <div className="flex items-center px-4 mb-2">
          {!collapsed && <h3 className="text-sm font-medium">Favorites</h3>}
          {collapsed && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Star className="h-5 w-5 text-yellow-500 mx-auto" />
                </TooltipTrigger>
                <TooltipContent side="right">Favorites</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <ScrollArea className={cn("h-[300px]", collapsed ? "px-1" : "px-2")}>
          <div className={cn("space-y-3", collapsed ? "items-center" : "")}>
            {favorites.length > 0 ? (
              favorites.map((business) => (
                <div
                  key={business.id}
                  onClick={() => onFavoriteSelect(business.id)}
                >
                  {collapsed ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex justify-center">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold cursor-pointer">
                              {business.name.substring(0, 2).toUpperCase()}
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          {business.name}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <div className="px-2">
                      <BusinessCard
                        id={business.id}
                        name={business.name}
                        logo={business.logo}
                        industry={business.industry}
                        status={business.status}
                        isFavorite={true}
                        contactCount={0}
                        onClick={() => onFavoriteSelect(business.id)}
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-sm text-gray-500 py-4">
                {!collapsed && "No favorite businesses yet"}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Sidebar;
