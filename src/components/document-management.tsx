import { useState } from "react";
import { Card } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { FileText, Download, Upload, Search, Eye, Camera, AlertCircle } from "lucide-react";

export function DocumentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const documents = [
    {
      id: "DOC-001",
      name: "CMR-ORD-2024-001.pdf",
      type: "CMR",
      orderNumber: "ORD-2024-001",
      uploadDate: "2024-01-15",
      size: "2.4 MB",
      status: "Verified",
      description: "Transport document for industrial bearings shipment"
    },
    {
      id: "DOC-002",
      name: "Damage-Report-001.pdf",
      type: "Damage Report",
      orderNumber: "ORD-2024-003",
      uploadDate: "2024-01-14",
      size: "1.8 MB",
      status: "Under Review",
      description: "Minor packaging damage reported during transit"
    },
    {
      id: "DOC-003",
      name: "Loading-Manifest-ORD-001.pdf",
      type: "Loading Document",
      orderNumber: "ORD-2024-001",
      uploadDate: "2024-01-13",
      size: "890 KB",
      status: "Verified",
      description: "Complete loading manifest and checklist"
    },
    {
      id: "DOC-004",
      name: "Customs-Declaration-002.pdf",
      type: "Customs",
      orderNumber: "ORD-2024-002",
      uploadDate: "2024-01-12",
      size: "1.2 MB",
      status: "Pending",
      description: "Customs clearance documentation for electronics"
    },
    {
      id: "DOC-005",
      name: "Product-Photos-SKU-001.zip",
      type: "Photos",
      orderNumber: "ORD-2024-001",
      uploadDate: "2024-01-11",
      size: "15.7 MB",
      status: "Verified",
      description: "Product condition photos before shipping"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return <Badge className="bg-green-100 text-green-800 border-green-300">{status}</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">{status}</Badge>;
      case "Under Review":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-300">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Photos":
        return <Camera className="w-4 h-4" />;
      case "Damage Report":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || doc.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const documentTypes = ["CMR", "Damage Report", "Loading Document", "Customs", "Photos"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="flex items-center gap-2">
          <FileText className="w-6 h-6" />
          Document Management
        </h2>
        <Button className="bg-primary">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="cmr">CMR Documents</TabsTrigger>
          <TabsTrigger value="customs">Customs</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Filters */}
          <Card className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by document name or order number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {documentTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Documents Table */}
          <Card>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Order Number</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {getTypeIcon(doc.type)}
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">{doc.description}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell className="font-mono">{doc.orderNumber}</TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Quick Upload Area */}
          <Card className="p-6">
            <h3>Quick Upload</h3>
            <div className="mt-4 border-2 border-dashed border-muted rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
              <p className="text-sm text-muted-foreground">Supported formats: PDF, DOC, JPG, PNG (Max 25MB)</p>
              <Button className="mt-4" variant="outline">
                Choose Files
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="cmr" className="space-y-4">
          <Card className="p-6">
            <h3>CMR Documents</h3>
            <p className="text-muted-foreground">International road transport documents for cross-border shipments.</p>
            <div className="mt-4">
              {filteredDocuments.filter(doc => doc.type === "CMR").map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg mb-2">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5" />
                    <span>{doc.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="customs" className="space-y-4">
          <Card className="p-6">
            <h3>Customs Documentation</h3>
            <p className="text-muted-foreground">Import/export declarations and customs clearance documents.</p>
            <div className="mt-4">
              {filteredDocuments.filter(doc => doc.type === "Customs").map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg mb-2">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5" />
                    <span>{doc.name}</span>
                    {getStatusBadge(doc.status)}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="p-6">
            <h3>Reports & Inspections</h3>
            <p className="text-muted-foreground">Damage reports, loading/unloading documents, and inspection records.</p>
            <div className="mt-4">
              {filteredDocuments.filter(doc => doc.type.includes("Report") || doc.type.includes("Loading")).map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg mb-2">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(doc.type)}
                    <span>{doc.name}</span>
                    {getStatusBadge(doc.status)}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Download</Button>
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