import { useState } from 'react';
import api from './services/apiClient';

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/generate', form);
      setPreview(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI‑Powered Landing Page Builder</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <input name="occupation" placeholder="Occupation" onChange={handleChange} className="border p-2" />
        <input name="location" placeholder="Location" onChange={handleChange} className="border p-2" />
        <input name="hours" placeholder="Working Hours" onChange={handleChange} className="border p-2" />
        <input name="contact" placeholder="Contact Methods" onChange={handleChange} className="border p-2" />
        <input name="vibe" placeholder="Describe the vibe" onChange={handleChange} className="border p-2" />
        <input name="colors" placeholder="Preferred Colors" onChange={handleChange} className="border p-2" />
        <input name="fonts" placeholder="Preferred Fonts" onChange={handleChange} className="border p-2" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded col-span-2">Generate</button>
      </form>
      {preview && (
        <div className="mt-8 border p-4">
          <div dangerouslySetInnerHTML={{ __html: preview.html }} />
        </div>
      )}
    </div>
  );
}

export default App;
