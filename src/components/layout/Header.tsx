import React from "react";
import { Bell, Search, Settings, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
}

const Header = ({
  userName = "John Doe",
  userEmail = "john.doe@example.com",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  notificationCount = 3,
}: HeaderProps) => {
  return (
    <header className="flex h-[72px] w-full items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <div className="relative w-[320px]">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input type="text" placeholder="Search..." className="pl-10 pr-4" />
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

        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5 text-gray-600" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar>
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>
                  {userName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium md:inline-block">
                {userName}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-gray-500">{userEmail}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
