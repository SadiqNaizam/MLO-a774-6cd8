import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // Renamed to avoid conflict
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import newly generated pages
import DashboardPage from "./pages/DashboardPage";
import JointAccountIntroPage from "./pages/JointAccountIntroPage";
import JointAccountPartyDetailsPage from "./pages/JointAccountPartyDetailsPage";
import JointAccountConfigurationPage from "./pages/JointAccountConfigurationPage";
import JointAccountReviewSubmitPage from "./pages/JointAccountReviewSubmitPage";

import NotFound from "./pages/NotFound"; // Assuming this exists as per instructions

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner /> {/* Use the renamed import */}
      <BrowserRouter>
        <Routes>
          {/* Set DashboardPage as the index route for this user journey */}
          <Route path="/" element={<DashboardPage />} /> 
          
          {/* Routes for the new pages */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/joint-account-intro" element={<JointAccountIntroPage />} />
          <Route path="/joint-account-party-details" element={<JointAccountPartyDetailsPage />} />
          <Route path="/joint-account-configuration" element={<JointAccountConfigurationPage />} />
          <Route path="/joint-account-review-submit" element={<JointAccountReviewSubmitPage />} />
          
          {/* Keep other existing routes if any before NotFound Page*/}
          {/* For example: <Route path="/login" element={<LoginPage />} /> */}

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;