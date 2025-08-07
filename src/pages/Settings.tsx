import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProfileEditor } from "@/components/dashboard/ProfileEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/hooks/useTheme";
import { Bell, Database, Download, Palette, Shield, User } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "profile";

  // Handle tab change
  const handleTabChange = (newTab) => {
    setSearchParams({ tab: newTab });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in-up max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-stone-700 dark:text-gradient">Settings</h1>
          <p className="text-stone-500  font-semibold  dark:text-amber-100/80 mt-1">Manage your account and application preferences</p>
        </div>

        <Tabs value={tab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="glass-light border-0">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="data">Data & Export</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-charcoal">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your personal information and profile settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ProfileEditor />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-charcoal">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Configure how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-light-gray">Receive notifications via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Campaign Alerts</Label>
                      <p className="text-sm text-light-gray">Get notified about campaign performance</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Weekly Reports</Label>
                      <p className="text-sm text-light-gray">Receive weekly performance summaries</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Budget Warnings</Label>
                      <p className="text-sm text-light-gray">Alert when campaigns near budget limits</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-charcoal">
                  <Palette className="w-5 h-5" />
                  Appearance Settings
                </CardTitle>
                <CardDescription>
                  Customize the look and feel of your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Dark Mode</Label>
                      <p className="text-sm text-light-gray">Switch between light and dark themes</p>
                    </div>
                    <Switch
                      checked={theme === 'dark'}
                      onCheckedChange={toggleTheme}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger className="glass-light border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger className="glass-light border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">Eastern Time</SelectItem>
                        <SelectItem value="pst">Pacific Time</SelectItem>
                        <SelectItem value="cet">Central European Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-charcoal">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security and authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base">Change Password</Label>
                    <div className="space-y-2 mt-2">
                      <Input type="password" placeholder="Current password" className="glass-light border-0" />
                      <Input type="password" placeholder="New password" className="glass-light border-0" />
                      <Input type="password" placeholder="Confirm new password" className="glass-light border-0" />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Two-Factor Authentication</Label>
                      <p className="text-sm text-light-gray">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" className="glass-light">Enable</Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Login Notifications</Label>
                      <p className="text-sm text-light-gray">Get notified of new login attempts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Button className="glass-accent">Update Security Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-charcoal">
                  <Database className="w-5 h-5" />
                  Data Management
                </CardTitle>
                <CardDescription>
                  Export your data and manage data retention settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base">Export Data</Label>
                    <p className="text-sm text-light-gray mb-4">Download your analytics data in various formats</p>
                    <div className="flex gap-2">
                      <Button variant="outline" className="glass-light">
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                      </Button>
                      <Button variant="outline" className="glass-light">
                        <Download className="w-4 h-4 mr-2" />
                        Export JSON
                      </Button>
                      <Button variant="outline" className="glass-light">
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF Report
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Data Retention</Label>
                    <Select defaultValue="1year">
                      <SelectTrigger className="glass-light border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3months">3 Months</SelectItem>
                        <SelectItem value="6months">6 Months</SelectItem>
                        <SelectItem value="1year">1 Year</SelectItem>
                        <SelectItem value="2years">2 Years</SelectItem>
                        <SelectItem value="forever">Forever</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}