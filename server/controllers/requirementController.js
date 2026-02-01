const Requirement = require('../models/Requirement');

// @desc    Create a new requirement posting
// @route   POST /api/requirements
// @access  Public
const createRequirement = async (req, res) => {
    try {
        const { 
            firstName, lastName, email, 
            eventName, eventType, eventDate, location, 
            budget, // <--- Don't forget this new common field!
            roleType, 
            specificDetails 
        } = req.body;

        // Construct the document based on the roleType
        const newRequirement = new Requirement({
            firstName,
            lastName,
            email,
            eventName,
            eventType,
            eventDate,
            location,
            budget,
            roleType,
            // Conditionally spread the details into the correct field
            ...(roleType === 'planner' && { plannerDetails: specificDetails }),
            ...(roleType === 'performer' && { performerDetails: specificDetails }),
            ...(roleType === 'crew' && { crewDetails: specificDetails }),
        });

        const savedRequirement = await newRequirement.save();

        res.status(201).json({ 
            success: true, 
            message: "Requirement Posted Successfully", 
            data: savedRequirement 
        });

    } catch (error) {
        console.error("Submission Error:", error);
        
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ success: false, error: messages });
        }

        res.status(500).json({ success: false, error: "Server Error" });
    }
};

module.exports = { createRequirement };