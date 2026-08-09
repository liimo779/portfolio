import { BrowserRouter, Routes, Route } from "react-router-dom";
import PortfolioPage from "./pages/PortfolioPage.jsx";
import AdminApp from "./pages/admin/AdminApp.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
