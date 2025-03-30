import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Plus, Filter, Grid3X3, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  position?: string;
  company?: string;
  avatar?: string;
  tags?: string[];
  lastContact?: string;
}

const Contacts = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock contacts data
  const contacts: Contact[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@acmecorp.com",
      phone: "+1 (555) 123-4567",
      position: "CEO",
      company: "Acme Corporation",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      tags: ["Executive", "Decision Maker"],
      lastContact: "2023-05-15",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@globex.com",
      phone: "+1 (555) 987-6543",
      position: "CTO",
      company: "Globex Industries",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      tags: ["Technical", "Decision Maker"],
      lastContact: "2023-05-20",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "m.brown@starkent.com",
      phone: "+1 (555) 456-7890",
      position: "Procurement Manager",
      company: "Stark Enterprises",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      tags: ["Procurement"],
      lastContact: "2023-05-10",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.d@wayne.com",
      phone: "+1 (555) 789-0123",
      position: "Marketing Director",
      company: "Wayne Industries",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      tags: ["Marketing"],
      lastContact: "2023-05-05",
    },
    {
      id: "5",
      name: "David Wilson",
      email: "d.wilson@umbrella.com",
      phone: "+1 (555) 234-5678",
      position: "Sales Manager",
      company: "Umbrella Corporation",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      tags: ["Sales"],
      lastContact: "2023-05-18",
    },
    {
      id: "6",
      name: "Jessica Miller",
      email: "j.miller@oscorp.com",
      phone: "+1 (555) 345-6789",
      position: "Research Lead",
      company: "Oscorp Industries",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
      tags: ["Research", "Technical"],
      lastContact: "2023-05-12",
    },
  ];

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.position?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Contacts</h2>
          <Button size="sm" className="flex items-center gap-1">
            <Plus size={16} />
            <span>Add Contact</span>
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search contacts..."
              className="pl-10 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Filter size={16} />
              <span>Filter</span>
            </Button>
            <div className="flex border rounded-md overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className="rounded-none"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 size={16} />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className="rounded-none"
                onClick={() => setViewMode("list")}
              >
                <List size={16} />
              </Button>
            </div>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredContacts.map((contact) => (
              <Card
                key={contact.id}
                className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {contact.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-xs text-gray-500">
                        Last contact:{" "}
                        {new Date(
                          contact.lastContact || "",
                        ).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="mt-3">
                      <h3 className="font-medium text-base">{contact.name}</h3>
                      <p className="text-sm text-gray-500">
                        {contact.position}
                      </p>
                      <p className="text-sm text-gray-500">{contact.company}</p>
                    </div>
                    <div className="mt-3 space-y-1">
                      <p className="text-sm">{contact.email}</p>
                      <p className="text-sm">{contact.phone}</p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {contact.tags?.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="bg-gray-100"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Position
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Company
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Contact
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tags
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Last Contact
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Avatar>
                            <AvatarImage
                              src={contact.avatar}
                              alt={contact.name}
                            />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {contact.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {contact.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {contact.position}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {contact.company}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {contact.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {contact.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {contact.tags?.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="bg-gray-100"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(contact.lastContact || "").toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
