import { useState } from 'react';
import useFormStore from '@/store/useFormStore';
import api from '@/utils/api'; 

export default function Step4_Review() {
  const { formData } = useFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // POST request to our Backend (Fixed endpoint to include /api)
      const response = await api.post('/api/requirements', formData);
      
      console.log("Server Response:", response.data);
      setSubmitStatus('success');
      
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- LUX SUCCESS STATE ---
  if (submitStatus === 'success') {
    return (
      <div className="text-center py-12 animation-fade-in flex flex-col items-center justify-center h-full">
        <div className="text-6xl mb-6 text-black">✦</div>
        <h2 className="text-4xl font-serif text-black mb-4 tracking-tight">Request Received.</h2>
        <p className="text-gray-500 tracking-widest uppercase text-xs mb-10">
            We have received your requirements for a {formData.roleType}.
        </p>
        <button 
            onClick={() => window.location.reload()} 
            className="bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all rounded-none"
        >
            Create Another
        </button>
      </div>
    );
  }

  // --- HELPER FOR DATA ROWS ---
  const ReviewRow = ({ label, value }) => (
    <div className="border-b border-gray-100 pb-2">
      <dt className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">{label}</dt>
      <dd className="text-lg font-serif text-black">{value || '-'}</dd>
    </div>
  );

  return (
    <div className="w-full animation-fade-in">
      <h2 className="text-3xl font-serif mb-10 text-black tracking-tight">Review & Confirm</h2>
      
      {/* Summary Grid */}
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-12">
        
        <ReviewRow label="Full Name" value={`${formData.firstName} ${formData.lastName}`} />
        <ReviewRow label="Email" value={formData.email} />
        
        <ReviewRow label="Event Name" value={formData.eventName} />
        <ReviewRow label="Event Type" value={formData.eventType} />
        
        <ReviewRow label="Date" value={formData.eventDate} />
        <ReviewRow label="Location" value={formData.location} />
        
        <ReviewRow label="Role Required" value={formData.roleType?.toUpperCase()} />
        <ReviewRow label="Budget" value={`$${formData.budget}`} />

      </dl>

      {/* Dynamic Details Section */}
      <div className="mb-12">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
            Specific Requirements
        </h3>
        <div className="bg-stone-50 border-l-2 border-black p-6">
          <ul className="space-y-2">
             {Object.entries(formData.specificDetails || {}).map(([key, value]) => (
                <li key={key} className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-serif text-black text-lg">
                        {value}
                    </span>
                </li>
             ))}
          </ul>
        </div>
      </div>

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 border border-red-200 bg-red-50 text-red-800 text-sm font-serif">
            ⚠ Submission failed. Please check your connection and try again.
        </div>
      )}

      {/* Lux Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`w-full py-5 text-white text-xs font-bold uppercase tracking-[0.2em] transition-all rounded-none
            ${isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-black hover:bg-zinc-800'}`}
      >
        {isSubmitting ? 'Processing...' : 'Confirm & Post Requirement'}
      </button>
    </div>
  );
}