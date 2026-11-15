import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import ConceptMap from "./pages/ConceptMap";
import Review from "./pages/Review";
import Insights from "./pages/Insights";
import AppSettings from "./pages/AppSettings";
import About from "./pages/About";
import Science from "./pages/Science";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import { Tutorial } from "./components/Tutorial";

const queryClient = new QueryClient();

const TutorialWrapper = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Only show tutorial on app pages (not landing page or info pages)
    const infoPages = ["/", "/about", "/science", "/pricing"];
    const isAppPage = !infoPages.includes(location.pathname);
    
    if (isAppPage && new URLSearchParams(location.search).get("tour") === "1") {
      setShowTutorial(true);
    } else if (!isAppPage) {
      setShowTutorial(false);
    }
  }, [location.pathname, location.search]);

  const completeTutorial = () => {
    setShowTutorial(false);
  };

  if (!showTutorial) return null;

  return <Tutorial onComplete={completeTutorial} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <div style={{padding: '10px 16px', background: '#eee7ff', color: '#392667', fontSize: 14, textAlign: 'center'}}>
          Interactive demo · Study suggestions run locally, without AI. Notes stay in this browser.{' '}
          <a href="/case-study/neuranote/" style={{textDecoration: 'underline'}}>Back to case study</a>
        </div>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/concept-map" element={<ConceptMap />} />
          <Route path="/review" element={<Review />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/settings" element={<AppSettings />} />
          <Route path="/about" element={<About />} />
          <Route path="/science" element={<Science />} />
          <Route path="/pricing" element={<Pricing />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <TutorialWrapper />
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
