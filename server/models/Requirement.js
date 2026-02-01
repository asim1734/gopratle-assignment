const mongoose = require('mongoose');

// --- Sub-Schemas (The "Specifics") ---

const PlannerSchema = new mongoose.Schema({
    planningType: { 
        type: String, 
        enum: ['Full Service', 'Day-of Coordination', 'Partial Planning'], 
        required: true 
    },
    guestCount: { type: Number, required: true } 
}, { _id: false });

const PerformerSchema = new mongoose.Schema({
    performanceType: { type: String, required: true }, // e.g., "Jazz Band", "Clown"
    performanceDuration: { type: Number, required: true }, // Minutes (e.g. 60, 90)
    vibe: { type: String } // e.g., "High Energy", "Background Music"
}, { _id: false });

const CrewSchema = new mongoose.Schema({
    department: { type: String, required: true }, // e.g., Sound, Lighting
    crewCount: { type: Number, default: 1 }, // "Need 2 Camera operators"
    hoursRequired: { type: Number, required: true } // "For a 10 hour shift"
}, { _id: false });


// --- Main Schema ---

const RequirementSchema = new mongoose.Schema({
   
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },

    eventName: { type: String, required: true },
    eventType: { type: String, required: true },
    eventDate: { type: Date, required: true },
    location: { type: String, required: true },
    
    budget: { type: Number, required: true },

    roleType: { 
        type: String, 
        enum: ['planner', 'performer', 'crew'], 
        required: true 
    },

    plannerDetails: PlannerSchema,
    performerDetails: PerformerSchema,
    crewDetails: CrewSchema,

}, { timestamps: true });

RequirementSchema.pre('validate', function() {
    if (this.roleType === 'planner' && !this.plannerDetails) {
        throw new Error('Planner details are required for Planner roles.');
    } 
    
    if (this.roleType === 'performer' && !this.performerDetails) {
        throw new Error('Performer details are required for Performer roles.');
    } 
    
    if (this.roleType === 'crew' && !this.crewDetails) {
        throw new Error('Crew details are required for Crew roles.');
    }
});

module.exports = mongoose.model('Requirement', RequirementSchema);