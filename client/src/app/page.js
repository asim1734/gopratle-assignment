'use client';

import { useEffect } from 'react';
import useFormStore from '@/store/useFormStore';
import Step1_BasicInfo from '@/components/steps/Step1_BasicInfo';
import Step2_RoleSelection from '@/components/steps/Step2_RoleSelection';
import Step3_Details from '@/components/steps/Step3_Details';
import Step4_Review from '@/components/steps/Step4_Review';
import toast from 'react-hot-toast';

export default function Home() {
  const { step, nextStep, prevStep, formData } = useFormStore();

  const validateStep = () => {
    // --- STEP 1: Basic Info ---
    if (step === 1) {
      const { firstName, lastName, email, eventName, eventType, eventDate, location, budget } = formData;
      // Check if any field is empty or 0
      if (!firstName || !lastName || !email || !eventName || !eventType || !eventDate || !location || !budget) {
        toast.error("Please fill in all fields.");
        return false;
      }
    }

    // --- STEP 2: Role Selection ---
    if (step === 2) {
      if (!formData.roleType) {
        toast.error("Please select a role to hire.");
        return false;
      }
    }

    // --- STEP 3: Specific Details (The missing part) ---
    if (step === 3) {
      const { roleType, specificDetails } = formData;
      const details = specificDetails || {};

      // Validation logic for PLANNER
      if (roleType === 'planner') {
        if (!details.planningType) {
            toast.error("Please select a Planning Type.");
            return false;
        }
        if (!details.guestCount || details.guestCount <= 0) {
            toast.error("Please enter a valid Guest Count.");
            return false;
        }
      } 
      
      // Validation logic for PERFORMER
      else if (roleType === 'performer') {
        if (!details.performanceType) {
            toast.error("Please enter the Performance Type.");
            return false;
        }
        if (!details.performanceDuration || details.performanceDuration <= 0) {
            toast.error("Please enter a valid Duration.");
            return false;
        }
        if (!details.vibe) {
            toast.error("Please specify the Vibe.");
            return false;
        }
      } 
      
      // Validation logic for CREW
      else if (roleType === 'crew') {
        if (!details.department) {
            toast.error("Please select a Department.");
            return false;
        }
        if (!details.crewCount || details.crewCount <= 0) {
            toast.error("Please enter a valid Crew Count.");
            return false;
        }
        if (!details.hoursRequired || details.hoursRequired <= 0) {
            toast.error("Please enter Required Hours.");
            return false;
        }
      }
    }

    return true; // All checks passed
  };

  const handleNext = () => { if (validateStep()) nextStep(); };

  // --- LUX STEPPER: Diamonds & Lines ---
  const Stepper = () => (
    <div className="flex justify-center items-center mb-16">
        {[1, 2, 3, 4].map((num, index) => (
            <div key={num} className="flex items-center">
                {/* The Diamond Shape */}
                <div className={`
                    w-3 h-3 transform rotate-45 border transition-all duration-500
                    ${step >= num ? 'bg-black border-black' : 'bg-transparent border-gray-300'}
                `}></div>
                
                {/* The Line */}
                {index < 3 && (
                    <div className={`w-20 h-[1px] mx-1 transition-all duration-500 ${step > num ? 'bg-black' : 'bg-gray-300'}`}></div>
                )}
            </div>
        ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center py-16 px-4 bg-stone-50 min-h-screen">
      
      {/* Editorial Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-serif font-medium text-gray-900 mb-4 tracking-tight">
          The Requirement.
        </h1>
        <p className="text-gray-500 font-sans tracking-widest text-xs uppercase">
          Curate your perfect team
        </p>
      </div>

      <Stepper />

      {/* Main Container: Sharp edges, heavy border, no shadow */}
      <div className="w-full max-w-3xl bg-white border border-black p-12 relative min-h-[500px]">
        
        {step === 1 && <Step1_BasicInfo />}
        {step === 2 && <Step2_RoleSelection />}
        {step === 3 && <Step3_Details />}
        {step === 4 && <Step4_Review />}

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
            <button 
                onClick={prevStep} 
                disabled={step === 1}
                className={`text-sm uppercase tracking-widest font-bold transition-colors ${step === 1 ? 'text-gray-200' : 'text-gray-500 hover:text-black'}`}
            >
                Previous
            </button>

            {step < 4 && (
                <button 
                    onClick={handleNext}
                    className="bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-amber-700 transition-colors"
                >
                    Continue
                </button>
            )}
        </div>
      </div>
    </div>
  );
}