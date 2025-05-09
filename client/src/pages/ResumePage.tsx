import { useState } from "react";

export default function ResumePage() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    skills: "",
    experience: "",
    education: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setShowSuccess(false);
    setShowError(false);

    try {
      const response = await fetch(
        `https://resume-ai-generator.onrender.com/api/generate-resume`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            skills: formData.skills.split(",").map((s) => s.trim()),
          }),
        }
      );

      if (!response.ok) throw new Error("API call failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${formData.name}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      setShowSuccess(true);
    } catch (err) {
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a0c10] via-[#0f172a] to-[#0a0c10] overflow-y-auto py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-500/30 p-10 space-y-8 animate-flyIn">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 animate-gradient-x animate-bounceIn">
          Build Your Dream Resume
        </h1>

        <div className="space-y-5">
          <input
            className="w-full p-4 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:border-purple-500"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />
          <input
            className="w-full p-4 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:border-purple-500"
            name="title"
            placeholder="Professional Title"
            onChange={handleChange}
          />
          <input
            className="w-full p-4 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:border-purple-500"
            name="skills"
            placeholder="Skills (comma-separated)"
            onChange={handleChange}
          />
          <textarea
            className="w-full p-4 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:border-purple-500"
            name="experience"
            placeholder="Experience Details"
            rows={4}
            onChange={handleChange}
          />
          <textarea
            className="w-full p-4 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:border-purple-500"
            name="education"
            placeholder="Educational Background"
            rows={2}
            onChange={handleChange}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 active:scale-95"
        >
          {loading ? "Generating..." : "Generate Resume"}
        </button>

        {showSuccess && (
          <div className="flex flex-col items-center animate-fadeInSlow">
            <div className="text-green-400 text-4xl mt-4 animate-bounce-soft">
              🎉
            </div>
            <p className="text-white mt-2 text-lg">
              Your resume is ready! Check your downloads folder.
            </p>
          </div>
        )}

        {showError && (
          <div className="flex justify-center animate-fadeInSlow">
            <div className="text-red-400 text-4xl mt-4 animate-bounce-soft">
              ❌
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
