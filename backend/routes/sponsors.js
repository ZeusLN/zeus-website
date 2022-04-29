import { Router } from 'express';
import knex from './../knex';

const router = new Router();

router.get('/getCommunitySponsors', async (req, res) => {
    const results = await knex('sponsors')
        .select('handle')
        .where({ status: 'DISPLAY' })
        .sum('amount')
        .max({ latest: 'id' })
        .groupBy('handle')
        .orderBy('sum')
        .orderBy('latest', 'desc');
    res.send(results);
});

export default router;
