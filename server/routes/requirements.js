const express = require('express');
const router = express.Router();
const { createRequirement } = require('../controllers/requirementController');

router.post('/', createRequirement);

module.exports = router;