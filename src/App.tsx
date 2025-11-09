import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Biographie from "./pages/Biographie";
import Equipe from "./pages/Equipe";
import Bilan from "./pages/Bilan";
import Programme from "./pages/Programme";
import Auth from "./pages/Auth";
import Procurations from "./pages/Procurations";
import Divers from "./pages/Divers";
import Pgest from "./pages/Pgest";
import Pgestcom from "./pages/Pgestcom";
import Prh from "./pages/Prh";
import Penv from "./pages/Penv";
import Psecu from "./pages/Psecu";
import Peduc from "./pages/Peduc";
import Purba from "./pages/Purba";
import Psoc from "./pages/Psoc";
import Pcom from "./pages/Pcom";
import Psport from "./pages/Psport";
import Pcult from "./pages/Pcult";
import Plegal from "./pages/Plegal";
import Psante from "./pages/Psante";
import Bilan_1 from "./pages/Bilan_1";
import Bilan_2 from "./pages/Bilan_2";
import Bilan_3_4 from "./pages/Bilan_3-4";
import Bilan_5_6 from "./pages/Bilan_5-6";
import Bilan_7_8 from "./pages/Bilan_7-8";
import Bilan_9_10 from "./pages/Bilan_9-10";
import Bilan_10_11 from "./pages/Bilan_10-11";
import Bilan_12_13 from "./pages/Bilan_12-13";
import Bilan_14_15 from "./pages/Bilan_14-15";
import Bilan_16_17 from "./pages/Bilan_16-17";
import Act1 from "./pages/Act1";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/biographie" element={<ProtectedRoute><Biographie /></ProtectedRoute>} />
          <Route path="/equipe" element={<ProtectedRoute><Equipe /></ProtectedRoute>} />
          <Route path="/bilan" element={<ProtectedRoute><Bilan /></ProtectedRoute>} />
          <Route path="/programme" element={<ProtectedRoute><Programme /></ProtectedRoute>} />
          <Route path="/procurations" element={<ProtectedRoute><Procurations /></ProtectedRoute>} />
          <Route path="/divers" element={<ProtectedRoute><Divers /></ProtectedRoute>} />
          <Route path="/pgest" element={<ProtectedRoute><Pgest /></ProtectedRoute>} />
          <Route path="/pgestcom" element={<ProtectedRoute><Pgestcom /></ProtectedRoute>} />
          <Route path="/prh" element={<ProtectedRoute><Prh /></ProtectedRoute>} />
          <Route path="/penv" element={<ProtectedRoute><Penv /></ProtectedRoute>} />
          <Route path="/psecu" element={<ProtectedRoute><Psecu /></ProtectedRoute>} />
          <Route path="/peduc" element={<ProtectedRoute><Peduc /></ProtectedRoute>} />
          <Route path="/purba" element={<ProtectedRoute><Purba /></ProtectedRoute>} />
          <Route path="/psoc" element={<ProtectedRoute><Psoc /></ProtectedRoute>} />
          <Route path="/pcom" element={<ProtectedRoute><Pcom /></ProtectedRoute>} />
          <Route path="/psport" element={<ProtectedRoute><Psport /></ProtectedRoute>} />
          <Route path="/pcult" element={<ProtectedRoute><Pcult /></ProtectedRoute>} />
          <Route path="/plegal" element={<ProtectedRoute><Plegal /></ProtectedRoute>} />
          <Route path="/psante" element={<ProtectedRoute><Psante /></ProtectedRoute>} />
          <Route path="/bilan_1" element={<ProtectedRoute><Bilan_1 /></ProtectedRoute>} />
          <Route path="/bilan_2" element={<ProtectedRoute><Bilan_2 /></ProtectedRoute>} />
          <Route path="/bilan_3-4" element={<ProtectedRoute><Bilan_3_4 /></ProtectedRoute>} />
          <Route path="/bilan_5-6" element={<ProtectedRoute><Bilan_5_6 /></ProtectedRoute>} />
          <Route path="/bilan_7-8" element={<ProtectedRoute><Bilan_7_8 /></ProtectedRoute>} />
          <Route path="/bilan_9-10" element={<ProtectedRoute><Bilan_9_10 /></ProtectedRoute>} />
          <Route path="/bilan_10-11" element={<ProtectedRoute><Bilan_10_11 /></ProtectedRoute>} />
          <Route path="/bilan_12-13" element={<ProtectedRoute><Bilan_12_13 /></ProtectedRoute>} />
          <Route path="/bilan_14-15" element={<ProtectedRoute><Bilan_14_15 /></ProtectedRoute>} />
          <Route path="/bilan_16-17" element={<ProtectedRoute><Bilan_16_17 /></ProtectedRoute>} />
          <Route path="/act1" element={<ProtectedRoute><Act1 /></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
