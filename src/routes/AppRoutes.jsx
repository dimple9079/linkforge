import { BrowserRouter , Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard  from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import URLShortner from "./pages/URLShortner";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/url-shortner" element={<URLShortner />} />
            <Route path="/qr" element={<QRGenerator />} />

        </Routes>
    </BrowserRouter>
  );
}

export default App;
