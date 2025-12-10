import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Test from "./pages/Test";
import NotFound from "./pages/NotFound";
import { Layout } from "./components/Layout";
import { ErrorBoundary } from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const ProductDetailPlaceholder = () => (
  <Layout>
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <h1 className="text-3xl font-bold">Product Details</h1>
      <p className="text-muted-foreground mt-2">
        Product detail page coming soon. Use the back button to continue
        shopping.
      </p>
    </div>
  </Layout>
);

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
            <Route path="/home" element={<ErrorBoundary><Home /></ErrorBoundary>} />
            <Route path="/browse" element={<ErrorBoundary><Browse /></ErrorBoundary>} />
            <Route path="/product/:id" element={<ErrorBoundary><ProductDetailPlaceholder /></ErrorBoundary>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
