import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import { useEffect } from "react";
import "./index.css";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Add space-themed styling to body
  useEffect(() => {
    document.body.classList.add("min-h-screen", "text-white", "font-sans");
    document.body.style.backgroundColor = "#0c0c1d";
    document.body.style.backgroundImage = 
      "radial-gradient(circle at 20% 35%, rgba(106, 70, 193, 0.15) 0%, transparent 50%), " +
      "radial-gradient(circle at 75% 75%, rgba(255, 77, 140, 0.1) 0%, transparent 50%)";
    document.body.style.backgroundAttachment = "fixed";
    
    return () => {
      document.body.classList.remove("min-h-screen", "text-white", "font-sans");
      document.body.style.backgroundColor = "";
      document.body.style.backgroundImage = "";
      document.body.style.backgroundAttachment = "";
    };
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
