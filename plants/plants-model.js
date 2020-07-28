const db = require('../data/dbConfig');

module.exports = {
	add,
	find,
	findByUser,
	findById,
	update,
	remove,
};

function find() {
	return db('plants').select('id', 'nickname', 'species', 'h2ofrequency', 'user_id');
}

function findByUser(userid) {
	return db('plants').where('user_id', userid);
}

async function add(plant, userid) {
    plant.user_id = userid; 
	const [id] = await db('plants').insert(plant);
	return findById(id);
}

function findById(id) {
	return db('plants')
		.where({ id }).first();
}

function update(id, changes) {
	return db('plants').where({ id }).update(changes);
}


async function remove(id){
    const found = await findById(id)
    return db("plants")
        .where({ id })
        .delete()
        .then(() => {
            return found  
        })
}