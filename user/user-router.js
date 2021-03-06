const router = require('express').Router();
const Users = require('./user-model.js');
const authorize = require('../auth/auth-middleware.js')
//get users
router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'error getting user' })
        })
})
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Users.findByUserId(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "erro getting user" })
        })
})
//registering nanny
router.post('/:user_id/nanny', (req, res) => {
    const { user_id } = req.params;
    const { name, email, zip_code, availability_start, availability_end } = req.body;
    Users.insertNanny({ name, email, zip_code, availability_start, availability_end, user_id })
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
router.get('/:user_id/nanny', (req, res) => {
    const user_id = req.params.user_id;
    Users.findByNannyId(user_id)
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
//delete nanny
router.delete('/nanny/:id', (req, res) => {
    const { id } = req.params;
    Users.removeNanny(id)
        .then(deleted => {
            if(deleted) {
                res.status(204).end()
            } else {
                res.status(404).json({ error: 'User with Id does not exist' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Error deleting User' })
        })
})
//update nanny
router.put('/nanny/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, zip_code, availability_start, availability_end } = req.body;
    if(!name && !email && !zip_code && !availability_start && !availability_end) {
        res.status(400).json({ error: 'Required Feilds not met'})
    }
    Users.updateParent(id, { name, email, zip_code, availability_start, availability_end })
        .then(updated => {
            if(updated) {
                Users.findByParentId(id)
                    .then(user => res.status(200).json(user))
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: 'Error getting user' })
                    })
            } else {
                res.status(404).json({ error: 'User with Id not Found' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Error updateing user' })
        })
})
//post parent
router.post('/:user_id/parent', (req, res) => {
    const { user_id } = req.params;
    const { name, kids, email, zip_code } = req.body;
    if(!name && !kids && !email && !zip_code) {
        res.status(400).json({ error: 'Required Feilds not met'})
    }
    Users.insertParent({ name, kids, email, zip_code, user_id })
        .then(id => {
            res.status(200).json({ message: 'Signup Succesful', id })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Error Registering' })
        })
});
//get parents
router.get('/parent', authorize, (req, res) => {
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
router.get('/:id/parent', (req, res) => {
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
//delete parent
router.delete('/parent/:id', (req, res) => {
    const { id } = req.params;
    Users.removeParent(id)
        .then(deleted => {
            if(deleted) {
                res.status(204).end()
            } else {
                res.status(404).json({ error: 'User with Id does not exist' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Error deleting User' })
        })
})
//update parent
router.put('/parent/:id', (req, res) => {
    const { id } = req.params;
    const { name, kids, email, zip_code } = req.body;
    if(!name && !kids && !email && !zip_code) {
        res.status(400).json({ error: 'Required Feilds not met'})
    }
    Users.updateParent(id, { name, kids, email, zip_code })
        .then(updated => {
            if(updated) {
                Users.findByNannyId(id)
                    .then(user => res.status(200).json(user))
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: 'Error getting user' })
                    })
            } else {
                res.status(404).json({ error: 'User with Id not Found' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Error updateing user' })
        })
})

module.exports = router