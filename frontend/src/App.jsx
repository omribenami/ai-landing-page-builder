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
    fonts: ''
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/generate', form);
      setPreview(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <input name="occupation" value={form.occupation} onChange={handleChange} placeholder="Occupation" className="border p-2" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="border p-2" />
        <input name="hours" value={form.hours} onChange={handleChange} placeholder="Hours" className="border p-2" />
        <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact" className="border p-2" />
        <input name="vibe" value={form.vibe} onChange={handleChange} placeholder="Vibe" className="border p-2" />
        <input name="colors" value={form.colors} onChange={handleChange} placeholder="Colors" className="border p-2" />
        <input name="fonts" value={form.fonts} onChange={handleChange} placeholder="Fonts" className="border p-2" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Generate</button>
      </form>
      {preview && (
        <div className="mt-8 border">
          <div dangerouslySetInnerHTML={{ __html: preview.html }} />
        </div>
      )}
    </div>
  );
}

export default App;
