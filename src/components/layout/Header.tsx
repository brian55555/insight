import React from "react";
import {
  Bell,
  Search,
  Settings,
  HelpCircle,
  LogOut,
  Shield,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  notificationCount?: number;
  onSearch?: (query: string) => void;
}

const Header = ({
  userName,
  userEmail,
  userAvatar,
  notificationCount = 3,
  onSearch = () => {},
}: HeaderProps) => {
  const navigate = useNavigate();
  const { user, profile, signOut, isAdmin } = useAuth();

  // Use profile data if available, otherwise use props
  const displayName = profile?.full_name || userName || "User";
  const displayEmail = profile?.email || userEmail || user?.email || "";
  const displayAvatar =
    profile?.avatar_url ||
    userAvatar ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${displayName}`;

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <header className="flex h-[72px] w-full items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <div className="relative w-[320px]">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          {notificationCount > 0 && (
            <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
              {notificationCount}
            </span>
          )}
        </Button>

        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5 text-gray-600" />
        </Button>

        {isAdmin && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin")}
            className="relative"
          >
            <Shield className="h-5 w-5 text-gray-600" />
          </Button>
        )}

        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5 text-gray-600" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar>
                <AvatarImage src={displayAvatar} alt={displayName} />
                <AvatarFallback>
                  {displayName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium md:inline-block">
                {displayName}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{displayName}</p>
                <p className="text-xs text-gray-500">{displayEmail}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem onClick={() => navigate("/admin")}>
                <Shield className="mr-2 h-4 w-4" />
                Admin Panel
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
