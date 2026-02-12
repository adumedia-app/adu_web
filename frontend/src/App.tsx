import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/auth";
import { LanguageProvider } from "@/lib/language";

// Pages
import Index from "./pages/Index";
import Archive from "./pages/Archive";
import Digest from "./pages/Digest";
import ArticlePage from "./pages/Article";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

// Admin pages
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import EditEdition from "./pages/admin/EditEdition";
import EditArticle from "./pages/admin/EditArticle";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/archive" element={<Archive />} />
      <Route path="/digest/:date" element={<Digest />} />
      <Route path="/article/:date/:slug" element={<ArticlePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<Privacy />} />

      {/* Admin routes */}
      <Route 
        path="/admin" 
        element={isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Login />} 
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/editions/:editionId"
        element={
          <ProtectedRoute>
            <EditEdition />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/articles/:articleId"
        element={
          <ProtectedRoute>
            <EditArticle />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;