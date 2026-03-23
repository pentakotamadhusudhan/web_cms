import { useState, useEffect } from 'react';
import { Save, Globe, Phone, MapPin, Mail, Info, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

// Use the Model we created earlier
import type { ClinicModel } from '../models/clinics_models';

export default function ClinicDetailsAdmin() {
  const [formData, setFormData] = useState<Partial<ClinicModel>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  // 1. Initial Load
  useEffect(() => {
    fetch('http://192.168.1.8:8000/clinic/clinics/1/')
      .then(res => res.json())
      .then(data => setFormData(data));
  }, []);

  // 2. Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. PUT API Call (Update)
 const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSaving(true);

  // 1. Create a FormData object
  const data = new FormData();

  // 2. Append all text fields from your state
  // formData is the state object containing your clinic details
  Object.keys(formData).forEach((key) => {
    const value = (formData as any)[key];
    if (value !== null && value !== undefined) {
      data.append(key, value);
    }
  });

  // 3. If you have a file input for the logo, append the file object here
  // if (selectedLogoFile) { data.append('logo', selectedLogoFile); }

  try {
    const response = await fetch('http://192.168.1.8:8000/clinic/clinics/1/', {
      method: 'PUT',
      // IMPORTANT: DO NOT set 'Content-Type' header. 
      // The browser will automatically set it to 'multipart/form-data' with the correct boundary.
      body: data, 
    });

    const result = await response.json();

    if (response.ok) {
      setMessage("Clinic updated successfully!");
    } else {
      console.error("Server validation errors:", result);
      setMessage("Update failed. Check console for details.");
    }
  } catch (error) {
    console.error("Connection error:", error);
  } finally {
    setIsSaving(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Clinic Profile</h1>
            <p className="text-slate-500">Manage your clinic's public information and contact details.</p>
          </div>
          <button
            form="clinic-form"
            disabled={isSaving}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-200 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : <><Save size={18} /> Save Changes</>}
          </button>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-emerald-100 text-emerald-700 rounded-xl border border-emerald-200 font-medium">
            {message}
          </div>
        )}

        <form id="clinic-form" onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Media & Primary Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
              <div className="w-32 h-32 bg-slate-100 rounded-2xl mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-slate-300">
                {formData.logo_url ? <img src={formData.logo_url} alt="Logo" /> : <Plus className="text-slate-400" />}
              </div>
              <button type="button" className="text-sm font-bold text-indigo-600 hover:text-indigo-700">Change Logo</button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2"><Phone size={18} /> Contact Details</h3>
              <input name="mobile" value={formData.mobile || ''} onChange={handleChange} placeholder="Mobile" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20" />
              <input name="email" value={formData.email || ''} onChange={handleChange} placeholder="Email" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20" />
              <input name="website" value={formData.website || ''} onChange={handleChange} placeholder="Website URL" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
          </div>

          {/* Right Column: General Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><Info size={18} /> General Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Clinic Name</label>
                  <input name="clinic_name" value={formData.clinic_name || ''} onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 text-lg font-semibold" />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Registration No</label>
                  <input name="regno" value={formData.regno || ''} onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Subtitle / Tagline</label>
                  <input name="subtitle" value={formData.subtitle || ''} onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Description</label>
                  <textarea name="description" rows={4} value={formData.description || ''} onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase mb-1 block flex items-center gap-1"><MapPin size={14} /> Full Address</label>
                  <input name="address" value={formData.address || ''} onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}