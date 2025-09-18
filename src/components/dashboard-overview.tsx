import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Package, TrendingUp, Clock, AlertTriangle } from "lucide-react";

interface DashboardOverviewProps {
  userData: {
    name: string;
    role: string;
    company: string;
  };
}

export function DashboardOverview({ userData }: DashboardOverviewProps) {
  const stats = [
    {
      title: "Total Inventory",
      value: "2,847",
      change: "+12%",
      icon: Package,
      color: "bg-primary"
    },
    {
      title: "Pending Orders",
      value: "23",
      change: "-3%",
      icon: Clock,
      color: "bg-secondary"
    },
    {
      title: "In Transit",
      value: "156",
      change: "+8%",
      icon: TrendingUp,
      color: "bg-accent"
    },
    {
      title: "Urgent Issues",
      value: "4",
      change: "+2",
      icon: AlertTriangle,
      color: "bg-destructive"
    }
  ];

  const recentActivity = [
    { action: "Order #ORD-2024-001 shipped", time: "2 hours ago", status: "success" },
    { action: "Inventory updated for SKU-12345", time: "4 hours ago", status: "info" },
    { action: "Delayed shipment reported", time: "6 hours ago", status: "warning" },
    { action: "New order received", time: "8 hours ago", status: "success" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-primary p-6 rounded-lg">
        <h1 className="text-primary-foreground mb-2">Welcome back, {userData.name}</h1>
        <p className="text-primary-foreground/80">{userData.role} at {userData.company}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-2">{stat.title}</p>
                <p className="text-3xl">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.change} from last month</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} />
                  <span className="text-sm">{activity.action}</span>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Inventory Status */}
        <Card className="p-6">
          <h3 className="mb-4">Inventory Status</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Warehouse A</span>
                <span className="text-sm">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Warehouse B</span>
                <span className="text-sm">62%</span>
              </div>
              <Progress value={62} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Warehouse C</span>
                <span className="text-sm">91%</span>
              </div>
              <Progress value={91} className="h-2" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}