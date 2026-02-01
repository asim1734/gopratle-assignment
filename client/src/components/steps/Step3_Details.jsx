import useFormStore from '@/store/useFormStore';

// --- LUX STYLING ---
const inputStyles = "mt-2 block w-full rounded-none border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-0 outline-none bg-transparent transition-colors";

// Editorial style labels
const Label = ({ children }) => (
  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
    {children} <span className="text-red-500">*</span>
  </label>
);

// --- Sub-Component: Planner Form ---
const PlannerForm = ({ data, onChange }) => (
  <div className="space-y-6 animation-fade-in">
    <div>
      <Label>Planning Type</Label>
      <select
        value={data.planningType || ''}
        onChange={(e) => onChange('planningType', e.target.value)}
        className={inputStyles}
      >
        <option value="">SELECT TYPE</option>
        <option value="Full Service">FULL SERVICE</option>
        <option value="Day-of Coordination">DAY-OF COORDINATION</option>
        <option value="Partial Planning">PARTIAL PLANNING</option>
      </select>
    </div>
    <div>
      <Label>Guest Count</Label>
      <input
        type="number"
        placeholder="150"
        value={data.guestCount || ''}
        onChange={(e) => onChange('guestCount', Number(e.target.value))}
        className={inputStyles}
      />
    </div>
  </div>
);

// --- Sub-Component: Performer Form ---
const PerformerForm = ({ data, onChange }) => (
  <div className="space-y-6 animation-fade-in">
    <div>
      <Label>Performance Type</Label>
      <input
        type="text"
        placeholder="JAZZ BAND, STANDUP COMIC"
        value={data.performanceType || ''}
        onChange={(e) => onChange('performanceType', e.target.value)}
        className={inputStyles}
      />
    </div>
    <div className="grid grid-cols-2 gap-6">
        <div>
            <Label>Duration (Minutes)</Label>
            <input
                type="number"
                placeholder="60"
                value={data.performanceDuration || ''}
                onChange={(e) => onChange('performanceDuration', Number(e.target.value))}
                className={inputStyles}
            />
        </div>
        <div>
            <Label>Vibe</Label>
            <input
                type="text"
                placeholder="HIGH ENERGY"
                value={data.vibe || ''}
                onChange={(e) => onChange('vibe', e.target.value)}
                className={inputStyles}
            />
        </div>
    </div>
  </div>
);

// --- Sub-Component: Crew Form ---
const CrewForm = ({ data, onChange }) => (
  <div className="space-y-6 animation-fade-in">
    <div>
      <Label>Department</Label>
      <select
        value={data.department || ''}
        onChange={(e) => onChange('department', e.target.value)}
        className={inputStyles}
      >
        <option value="">SELECT DEPARTMENT</option>
        <option value="Sound">SOUND</option>
        <option value="Lighting">LIGHTING</option>
        <option value="Camera">CAMERA</option>
        <option value="Stage Management">STAGE MANAGEMENT</option>
      </select>
    </div>
    <div className="grid grid-cols-2 gap-6">
        <div>
            <Label>Crew Count</Label>
            <input
                type="number"
                placeholder="2"
                value={data.crewCount || 1}
                onChange={(e) => onChange('crewCount', Number(e.target.value))}
                className={inputStyles}
            />
        </div>
        <div>
            <Label>Hours Required</Label>
            <input
                type="number"
                placeholder="8"
                value={data.hoursRequired || ''}
                onChange={(e) => onChange('hoursRequired', Number(e.target.value))}
                className={inputStyles}
            />
        </div>
    </div>
  </div>
);


// --- Main Step 3 Container ---
export default function Step3_Details() {
  const { formData, updateFormData } = useFormStore();
  const { roleType, specificDetails } = formData;

  const handleDetailChange = (field, value) => {
    updateFormData({
      specificDetails: {
        ...specificDetails,
        [field]: value,
      },
    });
  };

  return (
    <div className="w-full animation-fade-in">
      <h2 className="text-3xl font-serif mb-8 text-black tracking-tight">
        Specific Details for {roleType ? roleType.charAt(0).toUpperCase() + roleType.slice(1) : '...'}
      </h2>
      
      {/* Container removed to blend with parent Lux card */}
      <div className="pt-2">
        {roleType === 'planner' && <PlannerForm data={specificDetails} onChange={handleDetailChange} />}
        {roleType === 'performer' && <PerformerForm data={specificDetails} onChange={handleDetailChange} />}
        {roleType === 'crew' && <CrewForm data={specificDetails} onChange={handleDetailChange} />}
        
        {!roleType && <div className="text-red-500 font-bold tracking-wide">ERROR: NO ROLE SELECTED</div>}
      </div>
    </div>
  );
}