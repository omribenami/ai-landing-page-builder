import { useState } from 'react';
import axios from 'axios';

function App() {
  const [form, setForm] = useState({
    occupation: '',
    location: '',
    hours: '',
    contact: '',
    vibe: '',
    colors: '',
    fonts: '',
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        'http://localhost:4000/api/generate',
        form
      );
      setPreview(data.html);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const buttonClasses = loading
    ? 'w-full py-2 px-4 rounded-lg text-white font-semibold bg-gray-400 cursor-not-allowed'
    : 'w-full py-2 px-4 rounded-lg text-white font-semibold bg-indigo-600 hover:bg-indigo-700';

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          AI Landing Page Builder
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="occupation"
            placeholder="Occupation"
            onChange={handleChange}
            className="border border-gray-300 rounded p-2"
          />
          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="border border-gray-300 rounded p-2"
          />
          <input
            name="hours"
            placeholder="Working hours"
            onChange={handleChange}
            className="border border-gray-300 rounded p-2"
          />
          <input
            name="contact"
            placeholder="Contact methods"
            onChange={handleChange}
            className="border border-gray-300 rounded p-2"
          />
          <input
            name="vibe"
            placeholder="Describe the vibe you want"
            onChange={handleChange}
            className="border border-gray-300 rounded p-2"
          />
          <input
            name="colors"
            placeholder="Preferred colors"
            onChange={handleChange}
            className="border border-gray-300 rounded p-2"
          />
          <input
            name="fonts"
            placeholder="Preferred fonts"
            onChange={handleChange}
            className="border border-gray-300 rounded p-2"
          />
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={buttonClasses}
            >
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </form>
        {preview && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Preview:</h2>
            <div
              className="border rounded p-4 bg-gray-50"
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
