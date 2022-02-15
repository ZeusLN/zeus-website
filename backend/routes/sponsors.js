import { Router } from 'express';
const router = new Router();

import knex from './../knex';

router.get('/getCommunitySponsors', async (req, res) => {
    const results = await knex('sponsors').select('handle', 'imageUrl');
    res.send(results);
});

export default router;
