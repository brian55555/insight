import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface BusinessTab {
  id: string;
  name: string;
  isActive: boolean;
}

interface TabsContainerProps {
  tabs?: BusinessTab[];
  onTabChange?: (tabId: string) => void;
  onTabClose?: (tabId: string) => void;
  onTabAdd?: () => void;
}

const TabsContainer = ({
  tabs = [
    { id: "tab1", name: "Acme Corporation", isActive: true },
    { id: "tab2", name: "TechStart Inc.", isActive: false },
    { id: "tab3", name: "Global Solutions", isActive: false },
  ],
  onTabChange = () => {},
  onTabClose = () => {},
  onTabAdd = () => {},
}: TabsContainerProps) => {
  const [activeTab, setActiveTab] = useState<string>(
    tabs.find((tab) => tab.isActive)?.id || tabs[0]?.id || "",
  );

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  const handleTabClose = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    onTabClose(tabId);

    // If we're closing the active tab, activate another tab
    if (activeTab === tabId) {
      const remainingTabs = tabs.filter((tab) => tab.id !== tabId);
      if (remainingTabs.length > 0) {
        setActiveTab(remainingTabs[0].id);
        onTabChange(remainingTabs[0].id);
      }
    }
  };

  return (
    <div className="w-full bg-background border-b">
      <div className="flex items-center">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="flex-1"
        >
          <TabsList className="h-10 bg-background p-0 w-full flex overflow-x-auto">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  "flex items-center gap-2 h-10 px-4 rounded-none border-r",
                  activeTab === tab.id
                    ? "bg-white border-b-2 border-b-primary"
                    : "bg-muted/30",
                )}
              >
                <span className="max-w-[150px] truncate">{tab.name}</span>
                <button
                  onClick={(e) => handleTabClose(e, tab.id)}
                  className="rounded-full p-0.5 hover:bg-muted"
                  aria-label={`Close ${tab.name} tab`}
                >
                  <X size={14} />
                </button>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab content would be rendered here */}
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="p-0 mt-0">
              {/* Content for each tab would be rendered here */}
              <div className="p-4 bg-white">
                <h3 className="text-lg font-medium">Business: {tab.name}</h3>
                <p className="text-muted-foreground">
                  Tab content for {tab.name} would be displayed here.
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <button
          onClick={onTabAdd}
          className="flex items-center justify-center h-10 w-10 bg-background hover:bg-muted/50 border-l"
          aria-label="Add new tab"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
};

export default TabsContainer;
