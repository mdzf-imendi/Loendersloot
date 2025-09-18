import { useState } from "react";
import { Card } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search, Download, Filter, Package } from "lucide-react";

export function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const inventoryItems = [
    {
      sku: "SKU-001",
      product: "Industrial Bearings Set",
      category: "Machinery Parts",
      quantity: 450,
      location: "Warehouse A - Section 1",
      status: "In Stock",
      customs: "Cleared",
      barcode: "123456789012",
      lastUpdated: "2024-01-15"
    },
    {
      sku: "SKU-002",
      product: "Steel Pipes 2m",
      category: "Construction",
      quantity: 120,
      location: "Warehouse B - Section 3",
      status: "Low Stock",
      customs: "Pending",
      barcode: "123456789013",
      lastUpdated: "2024-01-14"
    },
    {
      sku: "SKU-003",
      product: "Electronic Components Kit",
      category: "Electronics",
      quantity: 0,
      location: "Warehouse A - Section 2",
      status: "Out of Stock",
      customs: "Cleared",
      barcode: "123456789014",
      lastUpdated: "2024-01-13"
    },
    {
      sku: "SKU-004",
      product: "Safety Equipment Bundle",
      category: "Safety",
      quantity: 89,
      location: "Warehouse C - Section 1",
      status: "In Stock",
      customs: "Cleared",
      barcode: "123456789015",
      lastUpdated: "2024-01-15"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-green-100 text-green-800 border-green-300">{status}</Badge>;
      case "Low Stock":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">{status}</Badge>;
      case "Out of Stock":
        return <Badge className="bg-red-100 text-red-800 border-red-300">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCustomsBadge = (customs: string) => {
    return customs === "Cleared" 
      ? <Badge className="bg-green-100 text-green-800 border-green-300">{customs}</Badge>
      : <Badge className="bg-orange-100 text-orange-800 border-orange-300">{customs}</Badge>;
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="flex items-center gap-2">
          <Package className="w-6 h-6" />
          Inventory Management
        </h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by product name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="In Stock">In Stock</SelectItem>
              <SelectItem value="Low Stock">Low Stock</SelectItem>
              <SelectItem value="Out of Stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Inventory Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Customs</TableHead>
                <TableHead>Barcode</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono">{item.sku}</TableCell>
                  <TableCell>{item.product}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>{getCustomsBadge(item.customs)}</TableCell>
                  <TableCell className="font-mono text-sm">{item.barcode}</TableCell>
                  <TableCell>{item.lastUpdated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h4>Total Products</h4>
          <p className="text-2xl mt-2">{inventoryItems.length}</p>
        </Card>
        <Card className="p-4">
          <h4>Low Stock Items</h4>
          <p className="text-2xl mt-2 text-yellow-600">
            {inventoryItems.filter(item => item.status === "Low Stock").length}
          </p>
        </Card>
        <Card className="p-4">
          <h4>Out of Stock</h4>
          <p className="text-2xl mt-2 text-red-600">
            {inventoryItems.filter(item => item.status === "Out of Stock").length}
          </p>
        </Card>
      </div>
    </div>
  );
}