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

//obtener proyectos
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ creador: req.user.id }).sort({ creado: -1 });
        res.json({ projects });
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

//actualizar proyecto
exports.refreshProject = async (req, res) => {
    //errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    //info proyecto
    const { nombre } = req.body;
    const newProject = {};

    if (nombre) {
        newProject.nombre = nombre;
    }

    try {
        //revisar id
        let project = await Project.findById(req.params.id);
        //existencia del proyecto
        if(!project) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }
        //creador del proyecto
        if (project.creador.toString() !== req.user.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }
        //actualizar
        project = await Project.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: newProject},
            {new: true}
        );
        res.json({project});
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
}

//elminar proyect
exports.deleteProject = async (req, res) => {
    //errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        //revisar id
        let project = await Project.findById(req.params.id);
        //existencia del proyecto
        if(!project) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }
        //creador del proyecto
        if (project.creador.toString() !== req.user.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }
        //eliminar
        await Project.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Proyecto eliminado'});
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
}