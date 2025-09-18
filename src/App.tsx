import { useState } from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider,
  SidebarTrigger
} from "./components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  FileText, 
  MessageCircle, 
  Settings, 
  LogOut,
  Bell
} from "lucide-react";

import { DashboardOverview } from "./components/dashboard-overview";
import { InventoryManagement } from "./components/inventory-management";
import { OrderManagement } from "./components/order-management";
import { DocumentManagement } from "./components/document-management";
import { CommunicationCenter } from "./components/communication-center";
import { UserSettings } from "./components/user-settings";
import { LoginPage } from "./components/login-page";
import { RegisterPage } from "./components/register-page";
import logoImage from 'figma:asset/59fb364822fadb28f07b26489a97e01352252e68.png';

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [authState, setAuthState] = useState<"login" | "register" | "authenticated">("login");
  const [authError, setAuthError] = useState<string>("");

  const [userData, setUserData] = useState({
    name: "John Doe",
    role: "Logistics Manager",
    company: "ABC Manufacturing"
  });

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "orders", label: "Orders", icon: Truck },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "communication", label: "Support", icon: MessageCircle },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const handleLogin = (email: string, password: string) => {
    // Simulate authentication - in real app, this would call your API
    if (email === "demo@loendersloot.com" && password === "demo123") {
      setUserData({
        name: "John Doe",
        role: "Logistics Manager", 
        company: "ABC Manufacturing"
      });
      setAuthState("authenticated");
      setAuthError("");
    } else {
      setAuthError("Invalid email or password. Try demo@loendersloot.com / demo123");
    }
  };

  const handleRegister = (formData: any) => {
    // Simulate registration - in real app, this would call your API
    setUserData({
      name: `${formData.firstName} ${formData.lastName}`,
      role: formData.role,
      company: formData.company
    });
    setAuthState("authenticated");
    setAuthError("");
  };

  const handleLogout = () => {
    setAuthState("login");
    setActiveTab("dashboard");
    setAuthError("");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview userData={userData} />;
      case "inventory":
        return <InventoryManagement />;
      case "orders":
        return <OrderManagement />;
      case "documents":
        return <DocumentManagement />;
      case "communication":
        return <CommunicationCenter />;
      case "settings":
        return <UserSettings />;
      default:
        return <DashboardOverview userData={userData} />;
    }
  };

  // Show login/register pages if not authenticated
  if (authState === "login") {
    return (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToRegister={() => setAuthState("register")}
        error={authError}
      />
    );
  }

  if (authState === "register") {
    return (
      <RegisterPage
        onRegister={handleRegister}
        onSwitchToLogin={() => setAuthState("login")}
        error={authError}
      />
    );
  }

  // Main application (authenticated state)
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar>
          <SidebarHeader>
            <div className="p-4">
              <img 
                src={logoImage} 
                alt="Loendersloot Global Logistics" 
                className="h-10 mb-2"
              />
              <p className="text-sm text-sidebar-foreground/70">Supply Chain Management</p>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveTab(item.id)}
                    isActive={activeTab === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {item.id === "communication" && (
                      <Badge className="ml-auto bg-red-500 text-white">2</Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            <div className="p-4 border-t border-sidebar-border">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-sidebar-foreground truncate">{userData.name}</p>
                  <p className="text-xs text-sidebar-foreground/70 truncate">{userData.role}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-card border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-xl">
                    {menuItems.find(item => item.id === activeTab)?.label || "Dashboard"}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Welcome to your logistics management portal
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white p-0 flex items-center justify-center">
                    4
                  </Badge>
                </Button>
                <Avatar>
                  <AvatarFallback>
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}