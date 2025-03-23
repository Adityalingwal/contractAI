
import { Bell, CreditCard, Lock, Settings as SettingsIcon, Shield, Smartphone } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useSidebar } from "@/hooks/use-sidebar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Settings = () => {
  const sidebarWidth = useSidebar();
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div 
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <Header sidebarWidth={sidebarWidth} />
        
        <main className="pt-24 pb-16 px-8 w-full">
          <div className="w-full">
            <div className="flex flex-col">
              <h1 className="text-3xl font-semibold">Settings</h1>
              <p className="text-muted-foreground mt-1">
                Configure system preferences and account settings.
              </p>
              
              <div className="mt-8 w-full">
                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="grid grid-cols-5 gap-4 mb-8">
                    <TabsTrigger value="general" className="flex flex-col gap-1 py-3 h-auto">
                      <SettingsIcon className="h-5 w-5" />
                      <span>General</span>
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="flex flex-col gap-1 py-3 h-auto">
                      <Bell className="h-5 w-5" />
                      <span>Notifications</span>
                    </TabsTrigger>
                    <TabsTrigger value="payment" className="flex flex-col gap-1 py-3 h-auto">
                      <CreditCard className="h-5 w-5" />
                      <span>Payment</span>
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex flex-col gap-1 py-3 h-auto">
                      <Shield className="h-5 w-5" />
                      <span>Security</span>
                    </TabsTrigger>
                    <TabsTrigger value="api" className="flex flex-col gap-1 py-3 h-auto">
                      <Lock className="h-5 w-5" />
                      <span>API</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="general">
                    <Card>
                      <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                        <CardDescription>
                          Configure basic system preferences.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="company-name">Company Name</Label>
                            <Input 
                              id="company-name" 
                              defaultValue="Skyline Properties"
                              className="max-w-md mt-1.5"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="timezone">Time Zone</Label>
                            <select 
                              id="timezone" 
                              className="flex h-10 w-full max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              defaultValue="America/New_York"
                            >
                              <option value="America/New_York">Eastern Time (UTC-05:00)</option>
                              <option value="America/Chicago">Central Time (UTC-06:00)</option>
                              <option value="America/Denver">Mountain Time (UTC-07:00)</option>
                              <option value="America/Los_Angeles">Pacific Time (UTC-08:00)</option>
                            </select>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="auto-refresh">Auto Refresh</Label>
                              <p className="text-sm text-muted-foreground">
                                Update dashboard data automatically.
                              </p>
                            </div>
                            <Switch id="auto-refresh" defaultChecked />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button>Save Changes</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="notifications">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Settings</CardTitle>
                        <CardDescription>
                          Configure how and when you receive alerts.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="email-notifications">Email Notifications</Label>
                              <p className="text-sm text-muted-foreground">
                                Receive important alerts via email.
                              </p>
                            </div>
                            <Switch id="email-notifications" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="sms-notifications">SMS Notifications</Label>
                              <p className="text-sm text-muted-foreground">
                                Receive critical alerts via SMS.
                              </p>
                            </div>
                            <Switch id="sms-notifications" />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="push-notifications">Push Notifications</Label>
                              <p className="text-sm text-muted-foreground">
                                Receive alerts on your mobile device.
                              </p>
                            </div>
                            <Switch id="push-notifications" defaultChecked />
                          </div>
                          
                          <div className="pt-2">
                            <Label htmlFor="notification-frequency">Notification Frequency</Label>
                            <p className="text-sm text-muted-foreground mb-4">
                              How often would you like to receive batched notifications?
                            </p>
                            <select 
                              id="notification-frequency" 
                              className="flex h-10 w-full max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              defaultValue="immediate"
                            >
                              <option value="immediate">Immediately</option>
                              <option value="hourly">Hourly</option>
                              <option value="daily">Daily Digest</option>
                              <option value="weekly">Weekly Summary</option>
                            </select>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button>Save Changes</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="payment">
                    <Card>
                      <CardHeader>
                        <CardTitle>Payment Settings</CardTitle>
                        <CardDescription>
                          Configure payment reconciliation preferences.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Label htmlFor="health-score-threshold">
                                Financial Health Score Threshold
                              </Label>
                              <span className="text-sm font-medium">60</span>
                            </div>
                            <Slider
                              id="health-score-threshold"
                              defaultValue={[60]}
                              max={100}
                              step={1}
                              className="max-w-md"
                            />
                            <p className="text-sm text-muted-foreground mt-1.5">
                              Tenants with scores below this threshold will trigger alerts.
                            </p>
                          </div>
                          
                          <div>
                            <Label htmlFor="grace-period">Payment Grace Period (Days)</Label>
                            <Input 
                              id="grace-period" 
                              type="number" 
                              defaultValue={3}
                              min={0}
                              max={15}
                              className="max-w-xs mt-1.5"
                            />
                            <p className="text-sm text-muted-foreground mt-1.5">
                              Number of days after due date before a payment is marked late.
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="auto-reconciliation">Automatic Reconciliation</Label>
                              <p className="text-sm text-muted-foreground">
                                Automatically match incoming payments with expected payments.
                              </p>
                            </div>
                            <Switch id="auto-reconciliation" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="partial-payments">Allow Partial Payments</Label>
                              <p className="text-sm text-muted-foreground">
                                Accept payments that are less than the full amount due.
                              </p>
                            </div>
                            <Switch id="partial-payments" defaultChecked />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button>Save Changes</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="security">
                    <Card>
                      <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription>
                          Configure account security and login preferences.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Two-Factor Authentication</Label>
                              <p className="text-sm text-muted-foreground">
                                Add an extra layer of security to your account.
                              </p>
                            </div>
                            <Button variant="outline" className="h-8 px-3">Enable</Button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="session-timeout">Session Timeout</Label>
                              <p className="text-sm text-muted-foreground">
                                Automatically log out after period of inactivity.
                              </p>
                            </div>
                            <select 
                              id="session-timeout" 
                              className="flex h-10 w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              defaultValue="30"
                            >
                              <option value="15">15 minutes</option>
                              <option value="30">30 minutes</option>
                              <option value="60">1 hour</option>
                              <option value="120">2 hours</option>
                              <option value="0">Never</option>
                            </select>
                          </div>
                          
                          <div className="pt-2">
                            <Button variant="outline" className="gap-2">
                              <Lock className="h-4 w-4" />
                              Change Password
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button>Save Changes</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="api">
                    <Card>
                      <CardHeader>
                        <CardTitle>API Integration</CardTitle>
                        <CardDescription>
                          Configure Payman AI API connection settings.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="api-key">API Key</Label>
                            <div className="flex gap-2 mt-1.5">
                              <Input 
                                id="api-key" 
                                defaultValue="pay_1a2b3c4d5e6f7g8h9i0j" 
                                type="password"
                                className="max-w-md font-mono" 
                              />
                              <Button variant="outline">Show</Button>
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="api-endpoint">API Endpoint</Label>
                            <Input 
                              id="api-endpoint" 
                              defaultValue="https://api.paymanai.com/v1" 
                              className="max-w-md mt-1.5" 
                            />
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Label>Sync Frequency</Label>
                              <span className="text-sm text-muted-foreground">
                                Every 15 minutes
                              </span>
                            </div>
                            <Slider
                              defaultValue={[15]}
                              max={60}
                              step={5}
                              className="max-w-md"
                            />
                            <p className="text-sm text-muted-foreground mt-1.5">
                              How often to sync data with Payman AI (in minutes).
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="background-sync">Background Sync</Label>
                              <p className="text-sm text-muted-foreground">
                                Sync data even when dashboard is not open.
                              </p>
                            </div>
                            <Switch id="background-sync" defaultChecked />
                          </div>
                          
                          <div className="pt-2">
                            <div className="bg-muted/50 rounded-lg p-4 max-w-md">
                              <div className="flex items-center mb-2">
                                <Smartphone className="h-5 w-5 text-muted-foreground mr-2" />
                                <h3 className="text-sm font-medium">Last Sync Status</h3>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Successfully synced 5 minutes ago
                              </p>
                            </div>
                          </div>
                          
                          <div className="pt-2">
                            <Button variant="outline" className="gap-2">
                              <SettingsIcon className="h-4 w-4" />
                              Test Connection
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button>Save Changes</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
