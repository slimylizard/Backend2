const db = require('../data/db.js');
//registration
function insert(user) {
    return db('users')
        .insert(user, 'id')
        .then(([id]) => id)
}
function findByUsername(username) {
    return db('users')
        .where({ username }).first();
}
function find() {
    return db('users');
}
function findByUserId(id) {
    return db('users')
        .where({ id }).first();
}
//nannys
function insertNanny(user) {
    return db('nannys')
        .insert(user, 'id')
        .then(([id]) => id)
}
function findNannys() {
    return db('nannys')
}
function findByNannyId(user_id) {
    return db('nannys')
        .where({ user_id })
}
function updateNanny(id, user) {
    return db('nannys')
        .where('id', Number(id))
        .update(user)
}
function removeNanny(id) {
    return db('nannys')
        .where('id', Number(id))
        .del();
}
//parents
function insertParent(user) {
    return db('parents')
        .insert(user, 'id')
        .then(([id]) => id)
}
function findParents() {
    return db('parents')
}
function findByParentId(id) {
    return db('parents')
        .where({ "user_id": id }).first()
}
function updateParent(id, user) {
    return db('parents')
        .where('id', Number(id))
        .update(user)
}
function removeParent(id) {
    return db('parents')
        .where('id', Number(id))
        .del();
}
module.exports = {
    insert,
    findByUsername,
    find,
    findByUserId,
    findNannys,
    insertNanny,
    findByNannyId,
    updateNanny,
    removeNanny,
    findParents,
    insertParent,
    findByParentId,
    updateParent,
    removeParent
}