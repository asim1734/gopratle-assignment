import useFormStore from '@/store/useFormStore';

export default function Step1_BasicInfo() {
  const { formData, updateFormData } = useFormStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Handle number inputs specifically
    const val = name === 'budget' ? Number(value) : value;
    updateFormData({ [name]: val });
  };

  // --- LUX STYLING ---
  // rounded-none: Sharp edges
  // focus:border-black: High contrast active state
  // focus:ring-0: Removes the default browser glow
  const inputStyles = "mt-2 block w-full rounded-none border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-0 outline-none bg-transparent transition-colors";
  
  // Editorial style labels
  const labelStyles = "block text-xs font-bold uppercase tracking-widest text-gray-500";

  return (
    <div className="w-full animation-fade-in">
      <h2 className="text-3xl font-serif mb-8 text-black tracking-tight">Event Essentials</h2>
      
      <div className="space-y-6">
        {/* Row 1: User Info */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={labelStyles}>First Name</label>
            <input
              name="firstName"
              type="text"
              required
              value={formData.firstName || ''}
              onChange={handleChange}
              className={inputStyles}
              placeholder="JONATHAN"
            />
          </div>
          <div>
            <label className={labelStyles}>Last Name</label>
            <input
              name="lastName"
              type="text"
              required
              value={formData.lastName || ''}
              onChange={handleChange}
              className={inputStyles}
              placeholder="DOE"
            />
          </div>
        </div>

        <div>
          <label className={labelStyles}>Email Address</label>
          <input
            name="email"
            type="email"
            required
            value={formData.email || ''}
            onChange={handleChange}
            className={inputStyles}
            placeholder="john@example.com"
          />
        </div>

        {/* Minimal Divider */}
        <div className="border-t border-gray-100 my-2"></div>

        {/* Row 2: Event Info */}
        <div>
          <label className={labelStyles}>Event Name</label>
          <input
            name="eventName"
            type="text"
            required
            value={formData.eventName || ''}
            onChange={handleChange}
            className={inputStyles}
            placeholder="ANNUAL TECH GALA"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
            <div>
                <label className={labelStyles}>Event Date</label>
                <input
                    name="eventDate"
                    type="date"
                    required
                    value={formData.eventDate ? new Date(formData.eventDate).toISOString().split('T')[0] : ''}
                    onChange={handleChange}
                    className={inputStyles}
                />
            </div>
             <div>
                <label className={labelStyles}>Event Type</label>
                <select
                    name="eventType"
                    value={formData.eventType || ''}
                    onChange={handleChange}
                    className={inputStyles}
                >
                    <option value="">SELECT TYPE</option>
                    <option value="Corporate">CORPORATE</option>
                    <option value="Wedding">WEDDING</option>
                    <option value="Concert">CONCERT</option>
                    <option value="Private Party">PRIVATE PARTY</option>
                </select>
            </div>
        </div>

        <div>
          <label className={labelStyles}>Location (Venue)</label>
          <input
            name="location"
            type="text"
            required
            value={formData.location || ''}
            onChange={handleChange}
            className={inputStyles}
            placeholder="CITY HALL, NEW YORK"
          />
        </div>

        <div>
            <label className={labelStyles}>Total Budget ($)</label>
            <input
                name="budget"
                type="number"
                required
                value={formData.budget || ''}
                onChange={handleChange}
                className={inputStyles}
                placeholder="5000"
            />
        </div>

      </div>
    </div>
  );
}