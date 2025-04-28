import { useEffect, useState } from "react";

export default function AboutPage() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a0c10] via-[#0f172a] to-[#0a0c10] overflow-hidden">
      {/* Left and Right glowing beams */}
      <div className="absolute top-0 left-0 w-28 h-full bg-purple-500/10 blur-3xl" />
      <div className="absolute top-0 right-0 w-28 h-full bg-pink-500/10 blur-3xl" />

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center text-center px-6 py-24 transition-all duration-1000 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight animate-gradient-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
          Empower Your Journey
        </h1>

        <p className="mt-10 text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
          JobChain AI was born out of a real battle — the exhausting grind of
          creating new resumes, fresh cover letters, and cold emails for every
          job application.
        </p>

        <p className="mt-6 text-md md:text-lg text-gray-400 max-w-2xl leading-relaxed">
          Built by{" "}
          <a
            href="https://www.linkedin.com/in/prarthan-christian/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent underline underline-offset-4 hover:text-white transition-colors"
          >
            Prarthan Christian
          </a>
          , someone who's been there — endlessly tweaking resumes to match job
          descriptions, rewriting cover letters from scratch, hustling for every
          opportunity.
        </p>

        <p className="mt-6 text-md md:text-lg text-gray-400 max-w-2xl leading-relaxed">
          I built this platform because searching for a job shouldn't feel like
          a second full-time job.
          <br />
          You deserve tools that move fast — just like you.
        </p>

        <div className="mt-20">
          <a
            href="/"
            className="inline-block text-md md:text-lg font-semibold text-gray-400 hover:text-white underline underline-offset-4 transition-all duration-300"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
