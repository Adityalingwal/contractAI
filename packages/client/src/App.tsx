import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Index";
import Contractors from "./pages/Contractors";
import PaymentLogs from "./pages/PaymentLogs";
import Reports from "./pages/Reports";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import BusinessDashboard from "./pages/BusinessDashboard";
import ContractorDashboard from "./pages/ContractorDashboard";
import DashboardSelector from "./pages/DashboardSelector";
import ExploreContractors from './pages/ExploreContractors';


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contractors" element={<Contractors />} />
          <Route path="/payment-logs" element={<PaymentLogs />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/business" element={<BusinessDashboard />} />
          <Route path="/contractor" element={<ContractorDashboard />} />
          <Route path="/dashboard-selector" element={<DashboardSelector />} /> 
          <Route path="/explore-contractors" element={<ExploreContractors />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
