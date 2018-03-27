const database = require("./database_connections");

module.exports = {
    getRunners() {
        return database('runners');
    },
    read(id) {
        return database('runners')
            .where('id', id)
            .first();
    },
    create(runner) {
        return database('runners')
            .insert(runner)
            .returning('*')
            .then(record => record[0]);
    },
    update(id, runner) {
        return database('runners')
            .update(runner)
            .where('id', id)
            .returning('*')
            .then(record => record[0]);
    },
    delete(id) {
        return database('runners')
            .delete()
            .where('id', id);
    }
}