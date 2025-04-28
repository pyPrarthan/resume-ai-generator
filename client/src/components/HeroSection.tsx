import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const rotatingWords = ["Resumes", "Cover Letters", "Cold Emails"];

export default function HeroSection() {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [showHero, setShowHero] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fullText = rotatingWords[loopNum % rotatingWords.length];
    const handleType = () => {
      setDisplayedText((prev) =>
        isDeleting
          ? fullText.substring(0, prev.length - 1)
          : fullText.substring(0, prev.length + 1)
      );
      if (!isDeleting && displayedText === fullText) {
        setTimeout(() => setIsDeleting(true), 800);
        setTypingSpeed(100);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
        setTypingSpeed(150);
      }
    };
    const typingInterval = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(typingInterval);
  }, [displayedText, isDeleting, loopNum, typingSpeed]);

  useEffect(() => {
    const timer = setTimeout(() => setShowHero(true), 1300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0c10] overflow-hidden">
      {!showHero && (
        <div className="absolute inset-0 z-50 bg-[#0a0c10] flex items-center justify-center fade-out-loader">
          <span className="text-white text-xl opacity-70 animate-pulse">
            Launching JobChain AI...
          </span>
        </div>
      )}

      {/* 🔥 Smooth top & bottom beams */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="beam-fade top" />
        <div className="beam-fade bottom" />
      </div>

      <section
        className={`relative z-20 flex flex-col justify-center items-center px-6 text-center min-h-screen overflow-hidden transition-opacity duration-1000 ${
          showHero ? "opacity-100 fade-in-hero" : "opacity-0"
        }`}
      >
        {/* Background Glow */}
        <div className="absolute -inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-100px] left-[10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl animate-ping-slow"></div>
          <div className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-purple-700/20 to-pink-500/20 blur-[150px] rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="z-20 space-y-8 max-w-3xl pt-20 md:pt-0">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-white">
            Job-ready AI to help you with{" "}
            <span className="text-purple-400 relative after:content-['|'] after:animate-blink after:absolute after:left-full after:ml-1 after:text-white">
              {displayedText}
            </span>
          </h1>

          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Struggling to write the perfect resume, cover letter, or cold email
            for a recruiter? This AI-powered tool helps you craft tailored,
            professional outputs — instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <button
              onClick={() => navigate("/resume")}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-semibold"
            >
              Create a Resume
            </button>
            <button
              onClick={() => navigate("/cover-letter")}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-semibold"
            >
              Create a Cover Letter
            </button>
            <button
              onClick={() => navigate("/cold-email")}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-semibold"
            >
              Create a Cold Email
            </button>
          </div>

          {/* Centered About button */}
          <div className="flex justify-center pt-0 ">
            <button
              onClick={() => navigate("/about")}
              className="px-5 py-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-300 text-sm font-semibold backdrop-blur-md border border-white/10 transition-all duration-300"
            >
              About JobChain AI
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
