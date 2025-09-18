import { useState } from "react";
import { Card } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Search, Eye, Truck, Plus, MapPin } from "lucide-react";

export function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const orders = [
    {
      orderNumber: "ORD-2024-001",
      customer: "ABC Manufacturing",
      products: "Industrial Bearings, Steel Components",
      quantity: 150,
      status: "In Transit",
      origin: "Hamburg, DE",
      destination: "Rotterdam, NL",
      eta: "2024-01-18",
      ets: "2024-01-15",
      trackingNumber: "TRK-001-2024",
      value: "€45,230"
    },
    {
      orderNumber: "ORD-2024-002",
      customer: "TechCorp Solutions",
      products: "Electronic Components",
      quantity: 75,
      status: "Processing",
      origin: "Amsterdam, NL",
      destination: "Berlin, DE",
      eta: "2024-01-20",
      ets: "2024-01-17",
      trackingNumber: "TRK-002-2024",
      value: "€28,900"
    },
    {
      orderNumber: "ORD-2024-003",
      customer: "BuildCo Ltd",
      products: "Safety Equipment",
      quantity: 200,
      status: "Delivered",
      origin: "Brussels, BE",
      destination: "Paris, FR",
      eta: "2024-01-12",
      ets: "2024-01-10",
      trackingNumber: "TRK-003-2024",
      value: "€15,650"
    },
    {
      orderNumber: "ORD-2024-004",
      customer: "MegaCorp Industries",
      products: "Machinery Parts",
      quantity: 50,
      status: "Delayed",
      origin: "Antwerp, BE",
      destination: "Milan, IT",
      eta: "2024-01-22",
      ets: "2024-01-19",
      trackingNumber: "TRK-004-2024",
      value: "€67,800"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Processing":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">{status}</Badge>;
      case "In Transit":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-300">{status}</Badge>;
      case "Delivered":
        return <Badge className="bg-green-100 text-green-800 border-green-300">{status}</Badge>;
      case "Delayed":
        return <Badge className="bg-red-100 text-red-800 border-red-300">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="flex items-center gap-2">
          <Truck className="w-6 h-6" />
          Order Management
        </h2>
        <Button className="bg-primary">
          <Plus className="w-4 h-4 mr-2" />
          New Order
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active Orders</TabsTrigger>
          <TabsTrigger value="history">Order History</TabsTrigger>
          <TabsTrigger value="tracking">Track & Trace</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {/* Filters */}
          <Card className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by order number or customer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="In Transit">In Transit</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Orders Table */}
          <Card>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order Number</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>ETA</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">{order.orderNumber}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.products}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="w-3 h-3" />
                          {order.origin} → {order.destination}
                        </div>
                      </TableCell>
                      <TableCell>{order.eta}</TableCell>
                      <TableCell>{order.value}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="p-6">
            <h3>Order History</h3>
            <p className="text-muted-foreground">View completed and archived orders with detailed history.</p>
            <div className="mt-4">
              <Button variant="outline">Load Order History</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4">
          <Card className="p-6">
            <h3>Track & Trace</h3>
            <div className="space-y-4 mt-4">
              <Input placeholder="Enter tracking number..." className="max-w-md" />
              <Button>Track Shipment</Button>
            </div>
            
            {/* Sample tracking info */}
            <div className="mt-6 space-y-4">
              <h4>Tracking: TRK-001-2024</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p>Package delivered to destination</p>
                    <p className="text-sm text-muted-foreground">Rotterdam, NL - 15:30</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <p>Out for delivery</p>
                    <p className="text-sm text-muted-foreground">Rotterdam, NL - 08:00</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <div>
                    <p>Package arrived at distribution center</p>
                    <p className="text-sm text-muted-foreground">Amsterdam, NL - 22:15</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}