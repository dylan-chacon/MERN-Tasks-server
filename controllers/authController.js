const User =  require('../models/User');
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator') 
const jwt = require('jsonwebtoken');

exports.auth = async (req, res) => {
    //errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    //extraer
    const { email, password } = req.body;

    try {
        //validar existencia de usuario
        let user = await  User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }
        //revisar password
        const correctPass = await bcrypt.compare(password, user.password);
        if (!correctPass) {
            return res.status(400).json({msg: 'Password incorrecto' })
        }
        //Token
        const payload = {
            user: {
                id: user.id
            }
        };
        //firmar JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;
            //confirmación
            res.json({token});
        })

    } catch (error) {
        console.log(error);
    }
}