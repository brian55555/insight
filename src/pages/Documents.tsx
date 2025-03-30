import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  Filter,
  FolderOpen,
  FileText,
  Image,
  FileSpreadsheet,
  File,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "doc" | "image" | "spreadsheet" | "note";
  size?: string;
  lastModified: string;
  owner: string;
  business?: string;
  tags?: string[];
  thumbnail?: string;
}

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Mock documents data
  const documents: Document[] = [
    {
      id: "1",
      name: "Acme Corporation Contract.pdf",
      type: "pdf",
      size: "2.4 MB",
      lastModified: "2023-05-15",
      owner: "John Doe",
      business: "Acme Corporation",
      tags: ["Contract", "Legal"],
      thumbnail:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80",
    },
    {
      id: "2",
      name: "Globex Industries Proposal.doc",
      type: "doc",
      size: "1.2 MB",
      lastModified: "2023-05-20",
      owner: "John Doe",
      business: "Globex Industries",
      tags: ["Proposal", "Sales"],
    },
    {
      id: "3",
      name: "Stark Enterprises Meeting Notes",
      type: "note",
      lastModified: "2023-05-10",
      owner: "Sarah Johnson",
      business: "Stark Enterprises",
      tags: ["Meeting", "Notes"],
    },
    {
      id: "4",
      name: "Wayne Industries Office.jpg",
      type: "image",
      size: "3.5 MB",
      lastModified: "2023-05-05",
      owner: "John Doe",
      business: "Wayne Industries",
      tags: ["Office", "Photo"],
      thumbnail:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=200&q=80",
    },
    {
      id: "5",
      name: "Umbrella Corporation Financial Report.xlsx",
      type: "spreadsheet",
      size: "1.8 MB",
      lastModified: "2023-05-18",
      owner: "Emily Davis",
      business: "Umbrella Corporation",
      tags: ["Financial", "Report"],
    },
    {
      id: "6",
      name: "Oscorp Industries Research Summary",
      type: "note",
      lastModified: "2023-05-12",
      owner: "Michael Brown",
      business: "Oscorp Industries",
      tags: ["Research", "Summary"],
    },
  ];

  // Filter documents based on search query and active tab
  const filteredDocuments = documents.filter(
    (document) =>
      (activeTab === "all" ||
        (activeTab === "pdf" && document.type === "pdf") ||
        (activeTab === "doc" && document.type === "doc") ||
        (activeTab === "image" && document.type === "image") ||
        (activeTab === "spreadsheet" && document.type === "spreadsheet") ||
        (activeTab === "note" && document.type === "note")) &&
      (document.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        document.business?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        document.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        )),
  );

  // Get document icon based on type
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <File className="h-10 w-10 text-red-500" />;
      case "doc":
        return <FileText className="h-10 w-10 text-blue-500" />;
      case "image":
        return <Image className="h-10 w-10 text-green-500" />;
      case "spreadsheet":
        return <FileSpreadsheet className="h-10 w-10 text-emerald-500" />;
      case "note":
        return <FileText className="h-10 w-10 text-yellow-500" />;
      default:
        return <FileText className="h-10 w-10 text-gray-500" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Documents</h2>
          <Button size="sm" className="flex items-center gap-1">
            <Plus size={16} />
            <span>New Document</span>
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search documents..."
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
          </div>
        </div>

        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pdf">PDF</TabsTrigger>
            <TabsTrigger value="doc">Documents</TabsTrigger>
            <TabsTrigger value="image">Images</TabsTrigger>
            <TabsTrigger value="spreadsheet">Spreadsheets</TabsTrigger>
            <TabsTrigger value="note">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDocuments.map((document) => (
                <Card
                  key={document.id}
                  className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardContent className="p-0">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                      {document.thumbnail ? (
                        <img
                          src={document.thumbnail}
                          alt={document.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          {getDocumentIcon(document.type)}
                          <span className="text-xs text-gray-500 mt-2">
                            {document.size}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-base truncate">
                        {document.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {document.business}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          {new Date(document.lastModified).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {document.owner}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* The same content is repeated for each tab, but with filtered results */}
          <TabsContent value="pdf" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDocuments.map((document) => (
                <Card
                  key={document.id}
                  className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardContent className="p-0">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                      {document.thumbnail ? (
                        <img
                          src={document.thumbnail}
                          alt={document.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          {getDocumentIcon(document.type)}
                          <span className="text-xs text-gray-500 mt-2">
                            {document.size}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-base truncate">
                        {document.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {document.business}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          {new Date(document.lastModified).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {document.owner}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Repeat for other tabs */}
          <TabsContent value="doc" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDocuments.map((document) => (
                <Card
                  key={document.id}
                  className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardContent className="p-0">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                      {document.thumbnail ? (
                        <img
                          src={document.thumbnail}
                          alt={document.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          {getDocumentIcon(document.type)}
                          <span className="text-xs text-gray-500 mt-2">
                            {document.size}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-base truncate">
                        {document.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {document.business}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          {new Date(document.lastModified).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {document.owner}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="image" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDocuments.map((document) => (
                <Card
                  key={document.id}
                  className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardContent className="p-0">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                      {document.thumbnail ? (
                        <img
                          src={document.thumbnail}
                          alt={document.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          {getDocumentIcon(document.type)}
                          <span className="text-xs text-gray-500 mt-2">
                            {document.size}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-base truncate">
                        {document.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {document.business}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          {new Date(document.lastModified).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {document.owner}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="spreadsheet" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDocuments.map((document) => (
                <Card
                  key={document.id}
                  className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardContent className="p-0">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                      {document.thumbnail ? (
                        <img
                          src={document.thumbnail}
                          alt={document.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          {getDocumentIcon(document.type)}
                          <span className="text-xs text-gray-500 mt-2">
                            {document.size}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-base truncate">
                        {document.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {document.business}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          {new Date(document.lastModified).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {document.owner}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="note" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDocuments.map((document) => (
                <Card
                  key={document.id}
                  className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardContent className="p-0">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                      {document.thumbnail ? (
                        <img
                          src={document.thumbnail}
                          alt={document.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          {getDocumentIcon(document.type)}
                          <span className="text-xs text-gray-500 mt-2">
                            {document.size}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-base truncate">
                        {document.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {document.business}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          {new Date(document.lastModified).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {document.owner}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documents;
