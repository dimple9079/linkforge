import { BrowserRouter , Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Dashboard  from "../pages/Dashboard";
import Analytics from "../pages/Analytics";
import URLShortener from "../pages/URLShortener";
import QRGenerator from "../pages/QRGenerator";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/url-shortener" element={<URLShortener />} />
            <Route path="/qr" element={<QRGenerator />} />

        </Routes>
    </BrowserRouter>
  );
}

export default App;
