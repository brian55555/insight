import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase-client";
import { CheckCircle, XCircle, UserCog, Users, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  email: string;
  full_name: string;
  approved: boolean;
  role: string;
  created_at: string;
  last_sign_in_at: string | null;
}

const AdminPanel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const { toast } = useToast();
  // supabase client is imported from lib/supabase-client

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error: any) {
      console.error("Error fetching users:", error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load users. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApproveUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ approved: true })
        .eq("id", userId);

      if (error) throw error;

      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, approved: true } : user,
        ),
      );

      toast({
        title: "User Approved",
        description: "The user can now access the platform.",
      });
    } catch (error: any) {
      console.error("Error approving user:", error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to approve user. Please try again.",
      });
    }
  };

  const handleRejectUser = async (userId: string) => {
    try {
      // In a real app, you might want to delete the auth user as well
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userId);

      if (error) throw error;

      setUsers(users.filter((user) => user.id !== userId));

      toast({
        title: "User Rejected",
        description: "The user has been removed from the system.",
      });
    } catch (error: any) {
      console.error("Error rejecting user:", error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reject user. Please try again.",
      });
    }
  };

  const handleChangeRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", userId);

      if (error) throw error;

      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user,
        ),
      );

      toast({
        title: "Role Updated",
        description: `User role changed to ${newRole}.`,
      });
    } catch (error: any) {
      console.error("Error changing role:", error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user role. Please try again.",
      });
    }
  };

  const pendingUsers = users.filter((user) => !user.approved);
  const approvedUsers = users.filter((user) => user.approved);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Pending Approval</span>
              {pendingUsers.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {pendingUsers.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>All Users</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                <p className="mt-2 text-gray-500">Loading users...</p>
              </div>
            ) : pendingUsers.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center py-8">
                  <p className="text-gray-500">No pending approval requests</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {pendingUsers.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {user.full_name?.substring(0, 2).toUpperCase() ||
                                user.email.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">
                              {user.full_name || "Unnamed User"}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {user.email}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Registered on{" "}
                              {new Date(user.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRejectUser(user.id)}
                          >
                            <XCircle className="h-4 w-4" />
                            <span>Reject</span>
                          </Button>
                          <Button
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => handleApproveUser(user.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>Approve</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                <p className="mt-2 text-gray-500">Loading users...</p>
              </div>
            ) : approvedUsers.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center py-8">
                  <p className="text-gray-500">No users found</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            User
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Email
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Role
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">
                            Last Login
                          </th>
                          <th className="text-right py-3 px-4 font-medium text-gray-500">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {approvedUsers.map((user) => (
                          <tr
                            key={user.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                    {user.full_name
                                      ?.substring(0, 2)
                                      .toUpperCase() ||
                                      user.email.substring(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">
                                  {user.full_name || "Unnamed User"}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-500">
                              {user.email}
                            </td>
                            <td className="py-3 px-4">
                              <Badge variant="outline" className="bg-gray-100">
                                {user.role || "User"}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-gray-500">
                              {user.last_sign_in_at
                                ? new Date(
                                    user.last_sign_in_at,
                                  ).toLocaleDateString()
                                : "Never"}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center gap-1"
                                  onClick={() =>
                                    handleChangeRole(
                                      user.id,
                                      user.role === "Admin" ? "User" : "Admin",
                                    )
                                  }
                                >
                                  <UserCog className="h-4 w-4" />
                                  <span>
                                    {user.role === "Admin"
                                      ? "Make User"
                                      : "Make Admin"}
                                  </span>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
