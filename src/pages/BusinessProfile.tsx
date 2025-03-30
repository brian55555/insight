import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Edit,
  Star,
  Phone,
  Mail,
  Globe,
  MapPin,
  Users,
  FileText,
  Calendar,
  BarChart,
  MessageSquare,
  Plus,
} from "lucide-react";

interface BusinessProfileProps {
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
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  description?: string;
  revenue?: string;
  employees?: number;
  foundedYear?: number;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

const BusinessProfile = ({
  id = "business-1",
  name = "Acme Corporation",
  logo = "https://api.dicebear.com/7.x/avataaars/svg?seed=acme",
  industry = "Technology",
  status = "Researching",
  website = "https://www.acmecorp.com",
  phone = "+1 (555) 123-4567",
  email = "info@acmecorp.com",
  address = "123 Main St, San Francisco, CA 94105",
  description = "Acme Corporation is a leading technology company specializing in innovative software solutions for businesses of all sizes. With a focus on user experience and cutting-edge technology, Acme has established itself as a trusted partner for digital transformation initiatives.",
  revenue = "$10M - $50M",
  employees = 250,
  foundedYear = 2005,
  isFavorite = false,
  onFavoriteToggle = () => {},
}: BusinessProfileProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const statusColors = {
    Researching: "bg-blue-100 text-blue-800",
    Contacting: "bg-yellow-100 text-yellow-800",
    Negotiating: "bg-purple-100 text-purple-800",
    Partner: "bg-green-100 text-green-800",
    Inactive: "bg-gray-100 text-gray-800",
  };

  // Mock data for contacts
  const contacts = [
    {
      id: "1",
      name: "John Smith",
      position: "CEO",
      email: "john.smith@acmecorp.com",
      phone: "+1 (555) 123-4567",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      position: "CTO",
      email: "sarah.j@acmecorp.com",
      phone: "+1 (555) 987-6543",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      id: "3",
      name: "Michael Brown",
      position: "Sales Director",
      email: "m.brown@acmecorp.com",
      phone: "+1 (555) 456-7890",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
  ];

  // Mock data for notes/activities
  const activities = [
    {
      id: "1",
      type: "note",
      content:
        "Initial meeting with John Smith. Discussed potential partnership opportunities.",
      date: "2023-05-15",
      user: "Jane Doe",
    },
    {
      id: "2",
      type: "email",
      content: "Sent follow-up email with proposal details.",
      date: "2023-05-16",
      user: "Jane Doe",
    },
    {
      id: "3",
      type: "call",
      content:
        "Phone call with Sarah Johnson. She expressed interest in our enterprise solution.",
      date: "2023-05-18",
      user: "John Doe",
    },
    {
      id: "4",
      type: "meeting",
      content: "Product demo meeting scheduled for next week.",
      date: "2023-05-25",
      user: "Jane Doe",
    },
  ];

  // Mock data for documents
  const documents = [
    {
      id: "1",
      name: "Acme Corporation Proposal.pdf",
      type: "pdf",
      size: "2.4 MB",
      lastModified: "2023-05-15",
    },
    {
      id: "2",
      name: "Meeting Notes - Initial Discussion.doc",
      type: "doc",
      size: "1.2 MB",
      lastModified: "2023-05-16",
    },
    {
      id: "3",
      name: "Acme Corporation Financial Overview.xlsx",
      type: "spreadsheet",
      size: "1.8 MB",
      lastModified: "2023-05-18",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="p-6 bg-white border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16 rounded-md">
              <AvatarImage src={logo} alt={name} />
              <AvatarFallback className="rounded-md bg-primary/10 text-primary font-semibold">
                {name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onFavoriteToggle}
                  className={isFavorite ? "text-yellow-500" : "text-gray-400"}
                >
                  <Star
                    className={isFavorite ? "fill-yellow-500" : "fill-none"}
                  />
                </Button>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className={statusColors[status]}>
                  {status}
                </Badge>
                <span className="text-sm text-gray-500">{industry}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center gap-1">
              <Edit size={16} />
              <span>Edit</span>
            </Button>
            <Button className="flex items-center gap-1">
              <MessageSquare size={16} />
              <span>Contact</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <div className="border-b border-gray-200 bg-white">
          <TabsList className="h-12 w-full justify-start rounded-none bg-transparent p-0">
            <TabsTrigger
              value="overview"
              className="h-12 rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="h-12 rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Contacts
            </TabsTrigger>
            <TabsTrigger
              value="activities"
              className="h-12 rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Activities
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="h-12 rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Documents
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="flex-1 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Company Info */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-700">{description}</p>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {website}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a
                        href={`mailto:${email}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {email}
                      </a>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{employees} employees</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Founded in {foundedYear}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Annual Revenue</span>
                    <span className="text-sm">{revenue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Employees</span>
                    <span className="text-sm">{employees}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Founded</span>
                    <span className="text-sm">{foundedYear}</span>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Last Contact</span>
                    <span className="text-sm">May 18, 2023</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Relationship Age
                    </span>
                    <span className="text-sm">3 months</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Open Opportunities
                    </span>
                    <span className="text-sm">2</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.slice(0, 3).map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {activity.type === "note" && (
                        <FileText className="h-5 w-5 text-blue-500" />
                      )}
                      {activity.type === "email" && (
                        <Mail className="h-5 w-5 text-green-500" />
                      )}
                      {activity.type === "call" && (
                        <Phone className="h-5 w-5 text-yellow-500" />
                      )}
                      {activity.type === "meeting" && (
                        <Calendar className="h-5 w-5 text-purple-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.content}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500">
                          {new Date(activity.date).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-500 mx-2">•</span>
                        <span className="text-xs text-gray-500">
                          {activity.user}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contacts Tab */}
        <TabsContent value="contacts" className="flex-1 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Contacts</h2>
            <Button size="sm" className="flex items-center gap-1">
              <Plus size={16} />
              <span>Add Contact</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contacts.map((contact) => (
              <Card
                key={contact.id}
                className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {contact.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="mt-3">
                    <h3 className="font-medium text-base">{contact.name}</h3>
                    <p className="text-sm text-gray-500">{contact.position}</p>
                  </div>
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {contact.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{contact.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Activities Tab */}
        <TabsContent value="activities" className="flex-1 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Activities & Notes</h2>
            <Button size="sm" className="flex items-center gap-1">
              <Plus size={16} />
              <span>Add Activity</span>
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200">
                {activities.map((activity) => (
                  <div key={activity.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {activity.type === "note" && (
                          <FileText className="h-5 w-5 text-blue-500" />
                        )}
                        {activity.type === "email" && (
                          <Mail className="h-5 w-5 text-green-500" />
                        )}
                        {activity.type === "call" && (
                          <Phone className="h-5 w-5 text-yellow-500" />
                        )}
                        {activity.type === "meeting" && (
                          <Calendar className="h-5 w-5 text-purple-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.content}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-gray-500">
                            {new Date(activity.date).toLocaleDateString()}
                          </span>
                          <span className="text-xs text-gray-500 mx-2">•</span>
                          <span className="text-xs text-gray-500">
                            {activity.user}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="flex-1 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Documents</h2>
            <Button size="sm" className="flex items-center gap-1">
              <Plus size={16} />
              <span>Upload Document</span>
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200">
                {documents.map((document) => (
                  <div
                    key={document.id}
                    className="p-4 hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {document.type === "pdf" && (
                            <FileText className="h-6 w-6 text-red-500" />
                          )}
                          {document.type === "doc" && (
                            <FileText className="h-6 w-6 text-blue-500" />
                          )}
                          {document.type === "spreadsheet" && (
                            <BarChart className="h-6 w-6 text-green-500" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{document.name}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-gray-500">
                              {document.size}
                            </span>
                            <span className="text-xs text-gray-500 mx-2">
                              •
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(
                                document.lastModified,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessProfile;
