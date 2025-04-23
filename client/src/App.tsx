import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import ResumePage from "./pages/ResumePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/cover-letter" element={<div className="text-center mt-20 text-3xl">Cover Letter Page (Coming Soon)</div>} />
        <Route path="/cold-email" element={<div className="text-center mt-20 text-3xl">Cold Email Page (Coming Soon)</div>} />
      </Routes>
    </Router>
  );
}
