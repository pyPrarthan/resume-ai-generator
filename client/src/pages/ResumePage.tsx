import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ResumePage() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    skills: "",
    experience: "",
    education: "",
  });

  const [generatedResume, setGeneratedResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const resumeRef = useRef<HTMLDivElement>(null);

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
        "http://localhost:5000/api/generate-resume",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            skills: formData.skills.split(",").map((s) => s.trim()),
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setGeneratedResume(data.resume || "Something went wrong.");
        setShowSuccess(true);
      } else {
        throw new Error("API call failed");
      }
    } catch (err) {
      setShowError(true);
      setGeneratedResume("Failed to generate resume.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (resumeRef.current) {
      const canvas = await html2canvas(resumeRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a0c10] via-[#0f172a] to-[#0a0c10] overflow-y-auto py-12 px-6">
      
      {/* 🧾 Resume Builder Card */}
      <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-500/30 p-10 space-y-8 animate-flyIn">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 animate-gradient-x animate-bounceIn">
          Build Your Dream Resume
        </h1>

        {/* Form Inputs */}
        <div className="space-y-5">
          <input
            className="w-full p-4 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:border-purple-500 transition-all duration-300"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />
          <input
            className="w-full p-4 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:border-purple-500 transition-all duration-300"
            name="title"
            placeholder="Professional Title"
            onChange={handleChange}
          />
          <input
            className="w-full p-4 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:border-purple-500 transition-all duration-300"
            name="skills"
            placeholder="Skills (comma-separated)"
            onChange={handleChange}
          />
          <textarea
            className="w-full p-4 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:border-purple-500 transition-all duration-300"
            name="experience"
            placeholder="Experience Details"
            rows={4}
            onChange={handleChange}
          />
          <textarea
            className="w-full p-4 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:border-purple-500 transition-all duration-300"
            name="education"
            placeholder="Educational Background"
            rows={2}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-pink-500/40 active:scale-95"
        >
          {loading ? "Generating..." : "Generate Resume"}
        </button>

        {/* Success Animation */}
        {showSuccess && (
          <div className="flex justify-center animate-fadeInSlow">
            <div className="text-green-400 text-4xl mt-4 animate-bounce-soft">
              🎉
            </div>
          </div>
        )}

        {/* Error Animation */}
        {showError && (
          <div className="flex justify-center animate-fadeInSlow">
            <div className="text-red-400 text-4xl mt-4 animate-bounce-soft">
              ❌
            </div>
          </div>
        )}

        {/* Output Resume + Download Button */}
        {generatedResume && (
          <div className="mt-10 space-y-6">
            {/* Resume Content */}
            <div
              ref={resumeRef}
              className="bg-white/10 rounded-lg p-6 text-white border border-purple-400/30 shadow-lg animate-fadeInSlow"
            >
              <h2 className="text-2xl font-bold mb-4 text-purple-300 text-center">
                Your Generated Resume
              </h2>
              <p className="whitespace-pre-line text-gray-300">
                {generatedResume}
              </p>
            </div>

            {/* Download Button */}
            <div className="flex justify-center">
              <button
                onClick={handleDownloadPDF}
                className="py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-400 text-white font-bold rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-emerald-500/40 active:scale-95"
              >
                Download PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
