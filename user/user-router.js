const router = require('express').Router();
const Users = require('./user-model.js');

//registering nanny
router.post('/nanny', (req, res) => {
    const { name, email, zip_code, availability_start, availability_end } = req.body;
    Users.insertNanny({ name, email, zip_code, availability_start, availability_end })
        .then(id => {
            res.status(200).json({ message: 'Congradulations You are signed up!', id })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Error Registering' })
        })
});
//get nannys
router.get('/nanny', (req, res) => {
    Users.findNannys()
        .then(nannys => {
            res.status(200).json(nannys)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Error getting Nannys' })
        })
})
//get nannyId
router.get('/nanny/:id', (req, res) => {
    const id = req.params.id;
    Users.findByNannyId(id)
        .then(user => {
            if(user) {
               res.status(200).json(user) 
            } else {
                res.status(404).json({ error: 'User with Id not Found' })
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Error getting User' })
        })
})
//post parent
router.post('/parent', (req, res) => {
    const { name, kids, email, zip_code, selected, user_id } = req.body;
    Users.insertParent({ name, kids, email, zip_code, selected, user_id })
        .then(id => {
            res.status(200).json({ message: 'Signup Succesful', id })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Error Registering' })
        })
});
//get parents
router.get('/parent', (req, res) => {
    Users.findParents()
        .then(parents => {
            res.status(200).json(parents)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Error getting parents' })
        })
})
//get parentId
router.get('/parent/:id', (req, res) => {
    const id = req.params.id;
    Users.findByParentId(id)
        .then(user => {
            if(user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ error: 'Could not Find User with Id'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Error getting User' })
        })
})

module.exports = router