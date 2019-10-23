const router = require('express').Router();
const Users = require('../user/user-model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('./secrets.js');

function generateToken(user) {
    const payload = {
        username: user.name,
        id: user.id,
    };
    const options = {
        expiresIn: '1d',
    };
    return jwt.sign(payload, secrets.jwtSecret, options);
}

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    Users.insert({ username, password: bcrypt.hashSync(password, 10) })
        .then(id => {
            res.status(200).json({ message: 'Registration Succesful', id })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Error Registering User' })
        })
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    Users.findByUsername(username)
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ 
                    message: 'Welcome To NANDA!',
                    token
                })
            } else {
                res.status(500).json({ error: 'Invalid Credentials' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'error loging in' })
        })
})

module.exports = router;