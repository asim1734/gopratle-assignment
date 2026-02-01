import { create } from 'zustand';

const useFormStore = create((set) => ({
  // Current step of the wizard
  step: 1,

  // The big object holding all data
  formData: {
    // Step 1: User & Event Basics
    firstName: '',
    lastName: '',
    email: '',
    eventName: '',
    eventType: '',
    eventDate: '',
    location: '',
    budget: '',

    // Step 2: The Switch
    roleType: '', // 'planner', 'performer', or 'crew'

    // Step 3: Dynamic Data
    specificDetails: {} 
  },

  // Actions
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),

  // Generic updater: pass { firstName: 'John' } or { roleType: 'crew' }
  updateFormData: (newData) => set((state) => ({
    formData: { ...state.formData, ...newData }
  })),

  // Reset after submission
  resetForm: () => set({
    step: 1,
    formData: {
        firstName: '', lastName: '', email: '',
        eventName: '', eventType: '', eventDate: '', location: '',
        budget: '', roleType: '', specificDetails: {}
    }
  })
}));

export default useFormStore;