// TODO fix set-up Here
// CREATE TABLE SPONSORS(
//    ID SERIAL PRIMARY KEY,
//    HANDLE           TEXT,
//    INVOICE          TEXT,
//    STATUS           TEXT
// );

import knex from './knex';
import * as config from './config.json';

async function createTable() {
    console.log('creating table');
    await knex.schema.createTableIfNotExists('sponsors', function (table) {
        table.increments('id').primary();
        table.string('handle');
        table.string('invoice');
        table.string('status');
        table.decimal('amount', 10, 3);
    });
}

export default createTable;
