import { useState } from "react";

export default function CoverLetterPage() {
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    companyName: "",
    skills: "",
    achievements: "",
  });

  const [generatedCoverLetter, setGeneratedCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/generate-coverletter",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      setGeneratedCoverLetter(data.coverLetter || "Something went wrong.");
    } catch (err) {
      setGeneratedCoverLetter("Failed to generate cover letter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0d0c1d] via-[#1d1a39] to-[#0d0c1d] overflow-hidden flex flex-col items-center justify-center px-4 py-16">
      {/* ✉️ Cover Letter Form Card */}
      <div className="max-w-3xl w-full bg-white/5 backdrop-blur-lg border border-purple-300/20 rounded-3xl p-10 shadow-2xl space-y-8 animate-flyIn">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-700 via-purple-400 to-blue-400 animate-gradient-x animate-bounceIn">
          Create Your Cover Letter
        </h1>

        <div className="space-y-5">
          <input
            className="w-full p-4 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:border-pink-500 transition-all duration-300"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
          />
          <input
            className="w-full p-4 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:border-pink-500 transition-all duration-300"
            name="jobTitle"
            placeholder="Target Job Title"
            onChange={handleChange}
          />
          <input
            className="w-full p-4 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:border-pink-500 transition-all duration-300"
            name="companyName"
            placeholder="Company Name"
            onChange={handleChange}
          />
          <input
            className="w-full p-4 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:border-pink-500 transition-all duration-300"
            name="skills"
            placeholder="Your Key Skills (comma-separated)"
            onChange={handleChange}
          />
          <textarea
            className="w-full p-4 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:border-pink-500 transition-all duration-300"
            name="achievements"
            placeholder="Briefly describe your top achievements"
            rows={4}
            onChange={handleChange}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-pink-500/40"
        >
          {loading ? "Generating..." : "Generate Cover Letter"}
        </button>

        {generatedCoverLetter && (
          <div className="mt-10 bg-white/10 p-6 rounded-lg text-white border border-purple-300/20 animate-fadeInSlow">
            <h2 className="text-2xl font-bold text-purple-300 mb-4 text-center">
              Your Cover Letter
            </h2>
            <p className="whitespace-pre-line text-gray-300">
              {generatedCoverLetter}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
