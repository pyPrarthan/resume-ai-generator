import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import ResumePage from "./pages/ResumePage";
import CoverLetterPage from "./pages/CoverLetterPage";
import ColdEmailPage from "./pages/ColdEmailPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/cover-letter" element={<CoverLetterPage />} />
        <Route path="/cold-email" element={<ColdEmailPage />} />
      </Routes>
    </Router>
  );
}
