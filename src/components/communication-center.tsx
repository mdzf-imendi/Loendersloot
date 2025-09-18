import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { MessageCircle, Bell, Send, Search, Phone, Mail, Clock, AlertTriangle, CheckCircle } from "lucide-react";

export function CommunicationCenter() {
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const chatMessages = [
    {
      id: 1,
      sender: "Support Team",
      message: "Your order ORD-2024-001 has been successfully shipped and is now in transit.",
      timestamp: "2024-01-15 14:30",
      type: "info",
      isSupport: true
    },
    {
      id: 2,
      sender: "You",
      message: "Thank you for the update. Could you provide the expected delivery time?",
      timestamp: "2024-01-15 14:35",
      type: "message",
      isSupport: false
    },
    {
      id: 3,
      sender: "Support Team",
      message: "The estimated delivery is January 18th, 2024. You'll receive tracking updates as the shipment progresses.",
      timestamp: "2024-01-15 14:37",
      type: "info",
      isSupport: true
    },
    {
      id: 4,
      sender: "System",
      message: "Customs clearance completed for order ORD-2024-002",
      timestamp: "2024-01-15 16:20",
      type: "success",
      isSupport: true
    }
  ];

  const notifications = [
    {
      id: 1,
      title: "Shipment Delayed",
      message: "Order ORD-2024-004 has been delayed due to weather conditions. New ETA: Jan 22",
      type: "warning",
      timestamp: "2 hours ago",
      read: false
    },
    {
      id: 2,
      title: "Customs Clearance",
      message: "Order ORD-2024-002 has successfully cleared customs in Amsterdam",
      type: "success",
      timestamp: "4 hours ago",
      read: false
    },
    {
      id: 3,
      title: "Low Stock Alert",
      message: "SKU-002 (Steel Pipes 2m) is running low - only 120 units remaining",
      type: "warning",
      timestamp: "6 hours ago",
      read: true
    },
    {
      id: 4,
      title: "Order Delivered",
      message: "Order ORD-2024-003 has been successfully delivered to BuildCo Ltd",
      type: "success",
      timestamp: "1 day ago",
      read: true
    }
  ];

  const supportTickets = [
    {
      id: "TKT-001",
      subject: "Damage claim for shipment ORD-2024-003",
      status: "Open",
      priority: "High",
      created: "2024-01-14",
      lastUpdate: "2024-01-15",
      assignee: "Sarah Johnson"
    },
    {
      id: "TKT-002",
      subject: "Request for expedited shipping",
      status: "In Progress",
      priority: "Medium",
      created: "2024-01-13",
      lastUpdate: "2024-01-15",
      assignee: "Mike Chen"
    },
    {
      id: "TKT-003",
      subject: "Invoice discrepancy inquiry",
      status: "Resolved",
      priority: "Low",
      created: "2024-01-10",
      lastUpdate: "2024-01-12",
      assignee: "Lisa Rodriguez"
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return <Badge className="bg-red-100 text-red-800 border-red-300">{status}</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">{status}</Badge>;
      case "Resolved":
        return <Badge className="bg-green-100 text-green-800 border-green-300">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-100 text-red-800 border-red-300">{priority}</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">{priority}</Badge>;
      case "Low":
        return <Badge className="bg-green-100 text-green-800 border-green-300">{priority}</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="flex items-center gap-2">
          <MessageCircle className="w-6 h-6" />
          Communication Center
        </h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Phone className="w-4 h-4 mr-2" />
            Call Support
          </Button>
          <Button variant="outline">
            <Mail className="w-4 h-4 mr-2" />
            Email Support
          </Button>
        </div>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList>
          <TabsTrigger value="chat">Live Chat</TabsTrigger>
          <TabsTrigger value="notifications">
            Notifications
            <Badge className="ml-2 bg-red-500 text-white">
              {notifications.filter(n => !n.read).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Card className="h-96">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <h3>Support Chat</h3>
                <p className="text-sm text-muted-foreground">Connected to LogiPortal Support Team</p>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.isSupport ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[70%] p-3 rounded-lg ${
                        msg.isSupport 
                          ? 'bg-muted text-foreground' 
                          : 'bg-primary text-primary-foreground'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && setNewMessage("")}
                  />
                  <Button onClick={() => setNewMessage("")}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3>Notifications</h3>
              <Button variant="outline" size="sm">Mark All Read</Button>
            </div>
            
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className={`p-4 rounded-lg border ${
                  notification.read ? 'bg-muted/50' : 'bg-card'
                }`}>
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={notification.read ? 'opacity-70' : ''}>{notification.title}</h4>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{notification.timestamp}</span>
                        </div>
                      </div>
                      <p className={`text-sm mt-1 ${notification.read ? 'text-muted-foreground' : ''}`}>
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3>Support Tickets</h3>
              <Button className="bg-primary">Create New Ticket</Button>
            </div>
            
            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm">{ticket.id}</span>
                      {getStatusBadge(ticket.status)}
                      {getPriorityBadge(ticket.priority)}
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                  <h4 className="mb-2">{ticket.subject}</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Assigned to: {ticket.assignee}</p>
                    <p>Created: {ticket.created} | Last update: {ticket.lastUpdate}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}