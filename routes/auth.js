// rutas para crear usuarios
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');
const authController = require('../controllers/authController');

//crear usuario | api/users
router.post('/',
    authController.auth
);

//obtener usuario autenticado
router.get('/',
    auth,
    authController.userAuth
)

module.exports = router;