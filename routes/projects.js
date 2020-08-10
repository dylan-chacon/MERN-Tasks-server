const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } =  require('express-validator');
const projectController = require('../controllers/projectController');

//crear proyectos | api/project
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    projectController.createProject
);

router.get('/',
    auth,
    projectController.getProjects
);

router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    projectController.refreshProject
)

module.exports = router;