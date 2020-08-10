const Project = require('../models/Project');
const { validationResult } = require('express-validator')

exports.createProject = async (req, res) => {
    try {
        //errores
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        // crear proyecto
        const project = new Project(req.body);
        // creador proyecto
        project.creador = req.user.id;
        //guardar proyecto
        project.save();
        res.json(project);
    } catch (error) {
        console.log();
        res.status(500).send('Hubo un error')
    }
}