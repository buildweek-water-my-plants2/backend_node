const db = require("../data/dbConfig.js");

module.exports = {
    add,
    find,
    findBy,
    findById,
    // update,
    // remove,
};

function find() {
    return db('users').select(
		'id',
		'username',
		'password',
		'phonenumber'
	);
}

function findBy(filter) {
    return db('users').where(filter);
}

async function add(user) {
    try {
        const [id] = await db("users").insert(user, "id");

        return findById(id);
    } catch (error) {
        throw error;
    }
}

function findById(id) {
    return db("users").where({ id }).first();
}



// function update(id, changes) {
// 	return db('users').where({ id }).update(changes);
// }

// function remove(id) {
//     return db('users').where(id).del();
// }
