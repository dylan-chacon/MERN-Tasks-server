const User =  require('../models/User');
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator') 
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    //extrart email/password
    const {email, password} = req.body;
    //errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }
        //crear usuario
        user = new User(req.body);
        //Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        // guardar usuario
        await user.save();
        //crear JWT
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
        // res.send({ msg: 'Usuario creado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}