// src/pages/ResumePage.tsx
import { useState } from "react";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
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
      setGeneratedResume(data.resume || "Something went wrong.");
    } catch (err) {
      setGeneratedResume("Failed to generate resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold text-center text-purple-700">
          Resume AI Generator ✨
        </h1>

        <input
          className="w-full p-2 border rounded"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border rounded"
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border rounded"
          name="skills"
          placeholder="Skills (comma-separated)"
          onChange={handleChange}
        />
        <textarea
          className="w-full p-2 border rounded"
          name="experience"
          placeholder="Experience"
          rows={4}
          onChange={handleChange}
        />
        <textarea
          className="w-full p-2 border rounded"
          name="education"
          placeholder="Education"
          rows={2}
          onChange={handleChange}
        />

        <button
          onClick={handleSubmit}
          className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
        >
          {loading ? "Generating..." : "Generate Resume"}
        </button>

        {generatedResume && (
          <div className="mt-6 bg-white p-4 border rounded whitespace-pre-line">
            <h2 className="text-xl font-semibold mb-2">Generated Resume:</h2>
            <p>{generatedResume}</p>
          </div>
        )}
      </div>
    </div>
  );
}
