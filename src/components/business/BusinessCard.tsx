import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface BusinessCardProps {
  id?: string;
  name?: string;
  logo?: string;
  industry?: string;
  status?:
    | "Researching"
    | "Contacting"
    | "Negotiating"
    | "Partner"
    | "Inactive";
  contactCount?: number;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
  onClick?: () => void;
}

const BusinessCard = ({
  id = "business-1",
  name = "Acme Corporation",
  logo = "",
  industry = "Technology",
  status = "Researching",
  contactCount = 3,
  isFavorite = false,
  onFavoriteToggle = () => {},
  onClick = () => {},
}: BusinessCardProps) => {
  const statusColors = {
    Researching: "bg-blue-100 text-blue-800",
    Contacting: "bg-yellow-100 text-yellow-800",
    Negotiating: "bg-purple-100 text-purple-800",
    Partner: "bg-green-100 text-green-800",
    Inactive: "bg-gray-100 text-gray-800",
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle(id);
  };

  return (
    <Card
      className="w-full max-w-[220px] bg-white hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <Avatar className="h-12 w-12 rounded-md">
            <AvatarImage src={logo} alt={name} />
            <AvatarFallback className="rounded-md bg-primary/10 text-primary font-semibold">
              {name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full",
              isFavorite ? "text-yellow-500" : "text-gray-400",
            )}
            onClick={handleFavoriteClick}
          >
            <Star
              className={cn(
                "h-5 w-5",
                isFavorite ? "fill-yellow-500" : "fill-none",
              )}
            />
          </Button>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-base line-clamp-1">{name}</h3>
          <p className="text-sm text-gray-500 line-clamp-1">{industry}</p>
          <Badge
            variant="outline"
            className={cn("font-normal", statusColors[status])}
          >
            {status}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 border-t border-gray-100 flex justify-between items-center">
        <div className="text-xs text-gray-500">
          {contactCount} contact{contactCount !== 1 ? "s" : ""}
        </div>
        <div className="text-xs text-gray-500">ID: {id.substring(0, 8)}</div>
      </CardFooter>
    </Card>
  );
};

export default BusinessCard;
