const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const projectController = require('../controllers/projectController');

//crear proyectos | api/project
router.post('/',
    projectController.createProject
);

module.exports = router;