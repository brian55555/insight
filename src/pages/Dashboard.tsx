import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Bell, User, Plus } from "lucide-react";
import StatusBoard from "@/components/dashboard/StatusBoard";
import BusinessCard from "@/components/business/BusinessCard";

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

interface SidebarProps {
  favoriteBusinesses?: Business[];
  onFavoriteClick?: (id: string) => void;
}

const Sidebar = ({
  favoriteBusinesses = [
    {
      id: "1",
      name: "Acme Corporation",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=acme",
      industry: "Technology",
      status: "Researching",
      isFavorite: true,
    },
    {
      id: "4",
      name: "Wayne Industries",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=wayne",
      industry: "Technology",
      status: "Partner",
      isFavorite: true,
    },
    {
      id: "7",
      name: "Cyberdyne Systems",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=cyberdyne",
      industry: "AI & Robotics",
      status: "Contacting",
      isFavorite: true,
    },
  ],
  onFavoriteClick = (id) => console.log(`Favorite clicked: ${id}`),
}: SidebarProps) => {
  return (
    <div className="w-[280px] h-full bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-white">
        <h1 className="text-xl font-bold text-primary">INSIGHT CRM</h1>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <nav className="space-y-6">
          <div>
            <ul className="space-y-1">
              <li>
                <a
                  href="#"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-primary/10 text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  Businesses
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  Contacts
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v4"></path>
                    <path d="M12 18v4"></path>
                    <path d="m4.93 4.93 2.83 2.83"></path>
                    <path d="m16.24 16.24 2.83 2.83"></path>
                    <path d="M2 12h4"></path>
                    <path d="M18 12h4"></path>
                    <path d="m4.93 19.07 2.83-2.83"></path>
                    <path d="m16.24 7.76 2.83-2.83"></path>
                  </svg>
                  Tasks
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Documents
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Favorite Businesses
            </h3>
            <div className="mt-2 space-y-2">
              {favoriteBusinesses.map((business) => (
                <a
                  key={business.id}
                  href="#"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  onClick={() => onFavoriteClick(business.id)}
                >
                  <div className="flex-shrink-0 h-6 w-6 rounded-full overflow-hidden mr-2 bg-gray-200">
                    {business.logo ? (
                      <img
                        src={business.logo}
                        alt={business.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary font-semibold">
                        {business.name.substring(0, 1)}
                      </div>
                    )}
                  </div>
                  <span className="truncate">{business.name}</span>
                </a>
              ))}

              <button className="flex items-center px-3 py-2 w-full text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                <Plus size={16} className="mr-2" />
                <span>Add favorite</span>
              </button>
            </div>
          </div>
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User size={16} className="text-primary" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">John Doe</p>
            <p className="text-xs text-gray-500">john.doe@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface HeaderProps {
  onSearch?: (query: string) => void;
  notificationCount?: number;
}

const Header = ({
  onSearch = (query) => console.log(`Search: ${query}`),
  notificationCount = 3,
}: HeaderProps) => {
  return (
    <header className="h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="relative w-64">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 text-xs flex items-center justify-center rounded-full bg-red-500 text-white">
              {notificationCount}
            </span>
          )}
        </button>

        <div className="h-8 w-px bg-gray-200" />

        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User size={16} className="text-primary" />
          </div>
          <span className="text-sm font-medium text-gray-700">John Doe</span>
        </div>
      </div>
    </header>
  );
};

interface TabsContainerProps {
  tabs?: Array<{ id: string; title: string; active?: boolean }>;
  onTabChange?: (id: string) => void;
  onTabClose?: (id: string) => void;
  onAddTab?: () => void;
}

const TabsContainer = ({
  tabs = [
    { id: "dashboard", title: "Dashboard", active: true },
    { id: "acme-corp", title: "Acme Corporation" },
    { id: "wayne-ind", title: "Wayne Industries" },
  ],
  onTabChange = (id) => console.log(`Tab changed: ${id}`),
  onTabClose = (id) => console.log(`Tab closed: ${id}`),
  onAddTab = () => console.log("Add tab clicked"),
}: TabsContainerProps) => {
  return (
    <div className="h-[40px] bg-gray-50 border-b border-gray-200 flex items-center px-4">
      <div className="flex space-x-1 overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center h-8 px-3 text-sm font-medium rounded-md ${tab.active ? "bg-white text-primary border border-gray-200" : "text-gray-600 hover:bg-gray-100"}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span>{tab.title}</span>
            {tab.id !== "dashboard" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2 text-gray-400 hover:text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose(tab.id);
                }}
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            )}
          </button>
        ))}

        <button
          className="flex items-center justify-center h-8 w-8 rounded-md text-gray-500 hover:bg-gray-100"
          onClick={onAddTab}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data for businesses
  const businesses = [
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
  ] as Business[];

  // Filter favorite businesses
  const favoriteBusinesses = businesses.filter((b) => b.isFavorite);

  // Handle favorite toggle
  const handleFavoriteToggle = async (id: string) => {
    try {
      const supabase = createClientComponentClient();
      const { data: existingFavorite } = await supabase
        .from("favorites")
        .select("id")
        .eq("business_id", id)
        .eq(
          "user_id",
          supabase.auth.getUser().then(({ data }) => data.user?.id),
        )
        .single();

      if (existingFavorite) {
        // Remove from favorites
        await supabase.from("favorites").delete().eq("id", existingFavorite.id);
      } else {
        // Add to favorites
        const { data: userData } = await supabase.auth.getUser();
        await supabase.from("favorites").insert([
          {
            user_id: userData.user?.id,
            business_id: id,
          },
        ]);
      }

      // Update the businesses in state
      const updatedBusinesses = businesses.map((business) => {
        if (business.id === id) {
          return { ...business, isFavorite: !business.isFavorite };
        }
        return business;
      });

      // This would be replaced with actual state update in a real implementation
      console.log(`Toggled favorite for business: ${id}`);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  // Handle business click
  const handleBusinessClick = (id: string) => {
    console.log(`Business clicked: ${id}`);
    // In a real app, this would open the business profile in a new tab
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar
        favoriteBusinesses={favoriteBusinesses}
        onFavoriteClick={handleBusinessClick}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Tabs */}
        <TabsContainer onTabChange={setActiveTab} />

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {activeTab === "dashboard" ? (
            <StatusBoard
              businesses={businesses}
              onBusinessClick={handleBusinessClick}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ) : (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Business Profile</h2>
              <p className="text-gray-500">
                Business profile content would appear here.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
