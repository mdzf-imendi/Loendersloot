import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Settings, User, Shield, Bell, Globe, Save } from "lucide-react";

export function UserSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [language, setLanguage] = useState("en");

  const userProfile = {
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Logistics Manager",
    company: "ABC Manufacturing",
    phone: "+31 20 123 4567",
    avatar: "/placeholder-avatar.jpg"
  };

  const teamMembers = [
    {
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-01-15 14:30"
    },
    {
      name: "Mike Chen",
      email: "mike.chen@company.com",
      role: "Editor",
      status: "Active",
      lastLogin: "2024-01-15 10:15"
    },
    {
      name: "Lisa Rodriguez",
      email: "lisa.rodriguez@company.com",
      role: "Viewer",
      status: "Inactive",
      lastLogin: "2024-01-12 16:45"
    }
  ];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return <Badge className="bg-red-100 text-red-800 border-red-300">{role}</Badge>;
      case "Editor":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">{role}</Badge>;
      case "Viewer":
        return <Badge className="bg-green-100 text-green-800 border-green-300">{role}</Badge>;
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "Active" 
      ? <Badge className="bg-green-100 text-green-800 border-green-300">{status}</Badge>
      : <Badge className="bg-gray-100 text-gray-800 border-gray-300">{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="flex items-center gap-2">
          <Settings className="w-6 h-6" />
          Settings & Preferences
        </h2>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="language">Language & Region</TabsTrigger>
          <TabsTrigger value="team">Team Management</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-6 mb-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={userProfile.avatar} />
                <AvatarFallback className="text-lg">
                  {userProfile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3>{userProfile.name}</h3>
                <p className="text-muted-foreground">{userProfile.role}</p>
                <Button variant="outline" className="mt-2">Change Avatar</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={userProfile.name} />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={userProfile.email} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue={userProfile.phone} />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" defaultValue={userProfile.company} />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue={userProfile.role} />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="europe/amsterdam">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="europe/amsterdam">Europe/Amsterdam</SelectItem>
                      <SelectItem value="europe/berlin">Europe/Berlin</SelectItem>
                      <SelectItem value="europe/london">Europe/London</SelectItem>
                      <SelectItem value="europe/paris">Europe/Paris</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button className="bg-primary">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4">Notification Preferences</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4>Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4>Push Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                </div>
                <Switch 
                  checked={pushNotifications} 
                  onCheckedChange={setPushNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4>SMS Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive urgent updates via SMS</p>
                </div>
                <Switch 
                  checked={smsNotifications} 
                  onCheckedChange={setSmsNotifications}
                />
              </div>
            </div>

            <div className="mt-8">
              <h4 className="mb-4">Notification Types</h4>
              <div className="space-y-3">
                {[
                  "Order status updates",
                  "Shipment delays",
                  "Inventory alerts",
                  "Document uploads",
                  "System maintenance"
                ].map((type, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{type}</span>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="language" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Language & Regional Settings
            </h3>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="language">Interface Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="nl">Nederlands (Dutch)</SelectItem>
                    <SelectItem value="de">Deutsch (German)</SelectItem>
                    <SelectItem value="fr">Français (French)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="dateFormat">Date Format</Label>
                <Select defaultValue="dd/mm/yyyy">
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select defaultValue="eur">
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eur">Euro (€)</SelectItem>
                    <SelectItem value="usd">US Dollar ($)</SelectItem>
                    <SelectItem value="gbp">British Pound (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="units">Unit System</Label>
                <Select defaultValue="metric">
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">Metric (kg, km, °C)</SelectItem>
                    <SelectItem value="imperial">Imperial (lbs, miles, °F)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3>Team Members</h3>
              <Button className="bg-primary">
                <User className="w-4 h-4 mr-2" />
                Invite User
              </Button>
            </div>

            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4>{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                      <p className="text-xs text-muted-foreground">Last login: {member.lastLogin}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getRoleBadge(member.role)}
                    {getStatusBadge(member.status)}
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Settings
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="mb-2">Change Password</h4>
                <div className="space-y-3 max-w-md">
                  <Input type="password" placeholder="Current password" />
                  <Input type="password" placeholder="New password" />
                  <Input type="password" placeholder="Confirm new password" />
                  <Button>Update Password</Button>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="mb-4">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p>Add an extra layer of security to your account</p>
                    <p className="text-sm text-muted-foreground">Currently disabled</p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="mb-4">Active Sessions</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p>Current session</p>
                      <p className="text-sm text-muted-foreground">Chrome on Windows • Amsterdam, NL</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-300">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p>Mobile session</p>
                      <p className="text-sm text-muted-foreground">Safari on iPhone • 2 days ago</p>
                    </div>
                    <Button variant="outline" size="sm">Revoke</Button>
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