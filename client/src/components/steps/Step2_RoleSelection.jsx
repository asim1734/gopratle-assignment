import useFormStore from '@/store/useFormStore';

export default function Step2_RoleSelection() {
  const { formData, updateFormData } = useFormStore();
  const { roleType } = formData;

  const roles = [
    {
      id: 'planner',
      title: 'Event Planner',
      description: 'Logistics, timelines, and vendor management.',
      icon: '📋'
    },
    {
      id: 'performer',
      title: 'Performer',
      description: 'Bands, DJs, Speakers, or Entertainers.',
      icon: '🎤'
    },
    {
      id: 'crew',
      title: 'Production Crew',
      description: 'Sound, lighting, camera, and stage ops.',
      icon: '🎥'
    }
  ];

  return (
    <div className="w-full animation-fade-in">
      <h2 className="text-3xl font-serif mb-10 text-black text-center tracking-tight">
        Who are you hiring?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div
            key={role.id}
            onClick={() => updateFormData({ roleType: role.id, specificDetails: {} })} // Reset details on switch
            className={`
              cursor-pointer p-8 border transition-all duration-300 flex flex-col items-center justify-center text-center space-y-4 rounded-none group
              ${roleType === role.id 
                ? 'bg-black text-white border-black shadow-xl' 
                : 'bg-white text-gray-900 border-gray-200 hover:border-black hover:bg-stone-50'}
            `}
          >
            {/* Icon - Grayscale to fit the Lux theme */}
            <div className="text-4xl filter grayscale mb-2 transition-transform duration-300 group-hover:scale-110">
                {role.icon}
            </div>
            
            <div className="space-y-3">
              <h3 className="font-bold uppercase tracking-widest text-xs">
                {role.title}
              </h3>
              <p className={`text-xs font-serif italic ${roleType === role.id ? 'text-gray-300' : 'text-gray-500'}`}>
                {role.description}
              </p>
            </div>
            
            {/* Selection Indicator: Diamond Shape */}
            <div className={`w-3 h-3 transform rotate-45 border transition-all duration-300 mt-6
                ${roleType === role.id ? 'bg-white border-white' : 'border-gray-300 group-hover:border-black'}`}>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}