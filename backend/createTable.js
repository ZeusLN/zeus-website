import knex from './knex';
import * as config from './config.json';

async function createTable() {
    console.log('creating table');
    await knex.schema.createTableIfNotExists('sponsors', function(table) {
        table.increments('id').primary();
        table.string('handle');
        table.string('invoice');
        table.string('status');
    });
};

export default createTable;
