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

function add(plant, userid) {
    plant.user_id = userid; 
	return db('plants').insert(plant);

}

function findById(id) {
	return db('plants')
		.where({ id }).first();
}

function update(id, changes) {
	return db('plants').where({ id }).update(changes);
}


function remove(id){
    return db("plants")
        .where({ id })
        .delete()
     
}