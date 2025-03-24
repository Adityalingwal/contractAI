
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Download, 
  FileText, 
  Filter, 
  PieChart,
  Calendar,
  TrendingUp,
  DollarSign,
  Users
} from "lucide-react";
import { useSidebar } from "@/hooks/use-sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart as RechartPieChart,
  Pie,
  Cell
} from "recharts";

// Dummy data for the reports
const monthlyPaymentData = [
  { month: "Jan", onTime: 42, late: 5, unmatched: 2 },
  { month: "Feb", onTime: 45, late: 3, unmatched: 1 },
  { month: "Mar", onTime: 40, late: 7, unmatched: 3 },
  { month: "Apr", onTime: 43, late: 6, unmatched: 0 },
  { month: "May", onTime: 44, late: 4, unmatched: 2 },
  { month: "Jun", onTime: 47, late: 2, unmatched: 1 },
];

const paymentStatusData = [
  { name: "On-time", value: 83, color: "#34D399" },
  { name: "Late", value: 12, color: "#F97316" },
  { name: "Unmatched", value: 5, color: "#EF4444" },
];

const financialHealthData = [
  { score: "90-100", count: 22, color: "#10B981" },
  { score: "80-89", count: 18, color: "#6EE7B7" },
  { score: "70-79", count: 10, color: "#FCD34D" },
  { score: "60-69", count: 5, color: "#F97316" },
  { score: "Below 60", count: 3, color: "#EF4444" },
];

const revenueData = [
  { month: "Jan", revenue: 52500 },
  { month: "Feb", revenue: 53200 },
  { month: "Mar", revenue: 54100 },
  { month: "Apr", revenue: 53800 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 56500 },
];

const buildingPerformanceData = [
  { name: "Building A", occupancy: 95, revenue: 22500, score: 88 },
  { name: "Building B", occupancy: 90, revenue: 18200, score: 82 },
  { name: "Building C", occupancy: 97, revenue: 24800, score: 91 },
  { name: "Building D", occupancy: 88, revenue: 17500, score: 79 },
  { name: "Building E", occupancy: 93, revenue: 21000, score: 86 },
];

const Reports = () => {
  const sidebarWidth = useSidebar();
  const [dateRange, setDateRange] = useState("last6months");
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div 
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <Header sidebarWidth={sidebarWidth} />
        
        <main className="pt-24 pb-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-semibold">Reports</h1>
                  <p className="text-muted-foreground mt-1">
                    Analyze payment trends and tenant financial health.
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Time Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last3months">Last 3 Months</SelectItem>
                      <SelectItem value="last6months">Last 6 Months</SelectItem>
                      <SelectItem value="lastyear">Last Year</SelectItem>
                      <SelectItem value="alltime">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
              
              <div className="mt-8 grid gap-6">
                <Tabs defaultValue="payment" className="w-full">
                  <TabsList className="w-full mb-6 grid grid-cols-4 h-auto p-1 bg-muted/50">
                    <TabsTrigger 
                      value="payment" 
                      className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      Payment Trends
                    </TabsTrigger>
                    <TabsTrigger 
                      value="financial" 
                      className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      Financial Health
                    </TabsTrigger>
                    <TabsTrigger 
                      value="revenue" 
                      className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      Revenue Analysis
                    </TabsTrigger>
                    <TabsTrigger 
                      value="buildings" 
                      className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      Building Performance
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="payment" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <Card className="lg:col-span-2">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-muted-foreground" />
                            Payment Status Trends
                          </CardTitle>
                          <CardDescription>
                            Monthly breakdown of payment statuses
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={monthlyPaymentData}
                                margin={{
                                  top: 20,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,
                                }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="onTime" name="On-time" stackId="a" fill="#34D399" />
                                <Bar dataKey="late" name="Late" stackId="a" fill="#F97316" />
                                <Bar dataKey="unmatched" name="Unmatched" stackId="a" fill="#EF4444" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <PieChart className="h-5 w-5 text-muted-foreground" />
                            Current Payment Status
                          </CardTitle>
                          <CardDescription>
                            Distribution of payment statuses
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                              <RechartPieChart>
                                <Pie
                                  data={paymentStatusData}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                  outerRadius={90}
                                  fill="#8884d8"
                                  dataKey="value"
                                >
                                  {paymentStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </RechartPieChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="financial" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <Card className="border shadow-sm p-4 bg-white">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                            <Users className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Total Tenants</p>
                            <h3 className="text-2xl font-semibold">58</h3>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="border shadow-sm p-4 bg-white">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <TrendingUp className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Avg. Health Score</p>
                            <h3 className="text-2xl font-semibold">84.2</h3>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="border shadow-sm p-4 bg-white">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                            <FileText className="h-6 w-6 text-amber-600" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">High Risk Tenants</p>
                            <h3 className="text-2xl font-semibold">8</h3>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="border shadow-sm p-4 bg-white">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Payment Consistency</p>
                            <h3 className="text-2xl font-semibold">92%</h3>
                          </div>
                        </div>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-muted-foreground" />
                          Financial Health Distribution
                        </CardTitle>
                        <CardDescription>
                          Breakdown of tenants by financial health score
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[350px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={financialHealthData}
                              margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="score" />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey="count" name="Tenants" fill="#8884d8">
                                {financialHealthData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="revenue" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="border shadow-sm p-4 bg-white">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                            <DollarSign className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Total Revenue (6mo)</p>
                            <h3 className="text-2xl font-semibold">$325,100</h3>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="border shadow-sm p-4 bg-white">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <TrendingUp className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Monthly Average</p>
                            <h3 className="text-2xl font-semibold">$54,183</h3>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="border shadow-sm p-4 bg-white">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">YoY Growth</p>
                            <h3 className="text-2xl font-semibold">+7.2%</h3>
                          </div>
                        </div>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-muted-foreground" />
                          Monthly Revenue Trend
                        </CardTitle>
                        <CardDescription>
                          Total revenue collected per month
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[350px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={revenueData}
                              margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                              <Line 
                                type="monotone" 
                                dataKey="revenue" 
                                name="Revenue" 
                                stroke="#8884d8" 
                                activeDot={{ r: 8 }} 
                                strokeWidth={2}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="buildings" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-muted-foreground" />
                          Building Performance
                        </CardTitle>
                        <CardDescription>
                          Overview of key metrics by property
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Building</TableHead>
                              <TableHead>Occupancy</TableHead>
                              <TableHead>Monthly Revenue</TableHead>
                              <TableHead>Health Score</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {buildingPerformanceData.map((building) => (
                              <TableRow key={building.name}>
                                <TableCell className="font-medium">{building.name}</TableCell>
                                <TableCell>{building.occupancy}%</TableCell>
                                <TableCell>${building.revenue.toLocaleString()}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div 
                                        className={`h-2 rounded-full ${
                                          building.score >= 80 ? 'bg-green-500' : 
                                          building.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                        }`}
                                        style={{ width: `${building.score}%` }}
                                      ></div>
                                    </div>
                                    <span>{building.score}</span>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
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

export default Reports;
