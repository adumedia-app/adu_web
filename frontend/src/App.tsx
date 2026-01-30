// src/App.tsx
/**
 * Main Application Component
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages
import Index from "./pages/Index";
import Digest from "./pages/Digest";
import Archive from "./pages/Archive";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Admin pages
import { AuthProvider } from "./lib/auth";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminEditEdition from "./pages/admin/EditEdition";
import AdminEditArticle from "./pages/admin/EditArticle";

// Configure React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: true,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/digest/:date" element={<Digest />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/about" element={<About />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/edition/:date" element={<AdminEditEdition />} />
            <Route path="/admin/article/:id" element={<AdminEditArticle />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;