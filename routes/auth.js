// rutas para crear usuarios
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');
const authController = require('../controllers/authController');

//crear usuario | api/users
router.post('/',
    [
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser mínimo de 6 caracteres').isLength({ min: 6 })
    ],
    authController.auth
);

//obtener usuario autenticado
router.get('/',
    auth,
    authController.userAuth
)

module.exports = router;