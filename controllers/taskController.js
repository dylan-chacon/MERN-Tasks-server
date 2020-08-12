const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createTask = async (req, res) => {
    //errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    //verificar proyecto
    const { project } = req.body;

    try {
        const actualProject = await Project.findById(project);
        if (!actualProject) {
            return  res.status(404).json({msg: 'Proyecto no encontrado'})
        }
        //revisar si proyecto pertenece al usuario
        if (actualProject.creador.toString() !== req.user.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }
        //crear Tarea
        const task = new Task(req.body);
        await task.save();
        res.json({task});
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

//obtener tareas por proyecto
exports.getTasks = async (req, res) => {
    //verificar proyecto
    const { project } = req.body;
    try {
        const actualProject = await Project.findById(project);
        if (!actualProject) {
            return  res.status(404).json({msg: 'Proyecto no encontrado'})
        }
        //revisar si proyecto pertenece al usuario
        if (actualProject.creador.toString() !== req.user.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }
        //obtener tareas por poryecto
        const tasks = await tareas.find({project});
        res.json({tasks});
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

//actualizar tarea
exports.refreshTask = async (req, res) => {
    const { project, nombre, estado } = req.body;
    try {
        //existe tarea
        let actualTask = await Task.findById(req.params.id);
        if (!actualTask) {
            return  res.status(404).json({msg: 'No existe tarea'});
        }
        //existe proyecto
        const actualProject = await Project.findById(project);
        if (!actualProject) {
            return  res.status(404).json({msg: 'Proyecto no encontrado'})
        }
        //revisar si proyecto pertenece al usuario
        if (actualProject.creador.toString() !== req.user.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }
        //nuevo objeto con la nueva info
        const newTask = {};
        if (nombre) newTask.nombre = nombre;
        if (estado) newTask.estado = estado;
        //guardar tarea
        actualTask = await Task.findOneAndUpdate(
            {_id: req.params.id},
            newTask,
            {new: true}
        );
        res.json({actualTask});
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

//eliminar tarea
exports.deleteTask = async (req, res) => {
    const { project } = req.body;
    try {
        //existe tarea
        let actualTask = await Task.findById(req.params.id);
        if (!actualTask) {
            return  res.status(404).json({msg: 'No existe tarea'});
        }
        //existe proyecto
        const actualProject = await Project.findById(project);
        if (!actualProject) {
            return  res.status(404).json({msg: 'Proyecto no encontrado'})
        }
        //revisar si proyecto pertenece al usuario
        if (actualProject.creador.toString() !== req.user.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }
        //eliminar tarea
        await Task.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Tarea eliminada'})
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}