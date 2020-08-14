const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } =  require('express-validator');
const taskController = require('../controllers/taskController');

//crear tarea | api/tasks
router.post('/',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty(),
    ],
    taskController.createTask
);

//obtener tareas por poryecto
router.get('/',
    auth,
    taskController.getTasks
);

//actualizar tarea
router.put('/:id',
    auth,
    taskController.refreshTask
);

//eliminar tarea
router.delete('/:id',
    auth,
    taskController.deleteTask
);

module.exports = router;