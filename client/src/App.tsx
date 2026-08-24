/**
 * Shopfront Studio / Market Signal
 * App shell keeps the retail editorial experience in a warm, light theme.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import TargetCursor from "./components/TargetCursor";
import { SiteSoundProvider } from "./contexts/SiteSoundContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <SiteSoundProvider>
        <ThemeProvider
          defaultTheme="light"
          // switchable
        >
          <TooltipProvider>
            <TargetCursor targetSelector="a, button, input, select, textarea, label, [role='button'], [tabindex]:not([tabindex='-1'])" spinDuration={2} hideDefaultCursor parallaxOn cursorColor="#f4f0e8" cursorColorOnTarget="#d5e668" />
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </SiteSoundProvider>
    </ErrorBoundary>
  );
}

export default App;
