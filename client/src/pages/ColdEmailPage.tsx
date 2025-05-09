import { useState } from "react";

export default function ColdEmailPage() {
  const [formData, setFormData] = useState({
    name: "",
    recipient: "",
    position: "",
    skills: "",
    reason: "",
  });

  const [generatedEmail, setGeneratedEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/generate-coldemail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setGeneratedEmail(data.email || "Something went wrong.");
    } catch (err) {
      setGeneratedEmail("Failed to generate email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a0c10] via-[#0f172a] to-[#1e293b] overflow-y-auto p-8 flex items-center justify-center">
      {/* ⚡️ Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1d23,transparent)] opacity-20 -z-10"></div>

      {/* ✉️ Floating Email Icon */}
      <div className="absolute top-10 left-10 animate-float text-pink-400 text-5xl opacity-70">
        📧
      </div>

      {/* 🧊 Cold Email Form */}
      <div className="max-w-2xl w-full bg-white/5 backdrop-blur-md border border-pink-500/20 rounded-2xl p-10 shadow-2xl animate-fadeInSlow">
        <h1 className="text-4xl font-bold text-white text-center mb-8 animate-shimmer-text">
          Send the Perfect Cold Email
        </h1>

        <div className="space-y-5">
          <input
            className="w-full p-4 bg-transparent border border-pink-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600 transition"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
          />
          <input
            className="w-full p-4 bg-transparent border border-pink-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600 transition"
            name="recipient"
            placeholder="Recipient Name or Company"
            onChange={handleChange}
          />
          <input
            className="w-full p-4 bg-transparent border border-pink-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600 transition"
            name="position"
            placeholder="Desired Position"
            onChange={handleChange}
          />
          <input
            className="w-full p-4 bg-transparent border border-pink-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600 transition"
            name="skills"
            placeholder="Your Skills (comma-separated)"
            onChange={handleChange}
          />
          <textarea
            className="w-full p-4 bg-transparent border border-pink-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600 transition"
            name="reason"
            placeholder="Why are you reaching out?"
            rows={4}
            onChange={handleChange}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-pink-500/30 transition-all duration-300"
        >
          {loading ? "Sending..." : "Generate Cold Email"}
        </button>

        {/* 📬 Email Output */}
        {generatedEmail && (
          <div className="mt-8 p-6 bg-white/10 rounded-lg text-white border border-pink-400/20 animate-fadeInSlow">
            <h2 className="text-2xl font-bold mb-4 text-pink-400 text-center">
              Your Cold Email
            </h2>
            <p className="whitespace-pre-line text-gray-300">
              {generatedEmail}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
