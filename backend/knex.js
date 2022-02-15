const knex = require('knex');
import * as config from './config.json';

const knexDB = knex({
    client: 'pg',
    connection: {
        host: config.db.host,
        user: config.db.user,
        password: config.db.pass,
        database: config.db.db
    }
});

export default knexDB;
