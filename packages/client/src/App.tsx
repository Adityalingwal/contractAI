import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import BusinessDashboard from "./pages/BusinessDashboard";
import DashboardSelector from "./pages/DashboardSelector";
import ContractorForm from "./pages/ContractorForm";
import ContractorDashboard from "./pages/ContractorDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/business" element={<BusinessDashboard />} />
          <Route path="/contractor" element={<ContractorForm />} />
          <Route path="/dashboard-selector" element={<DashboardSelector />} /> 
          <Route path="/explore-contractors" element={<ContractorDashboard />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
