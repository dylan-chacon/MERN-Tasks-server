const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    try {
        // crear proyecto
        const project = new Project(req.body);
        project.save();
        res.json(project);
    } catch (error) {
        console.log();
        res.status(500).send('Hubo un error')
    }
}