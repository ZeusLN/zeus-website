import { Router } from 'express';
import knex from './../knex';

const router = new Router();

const getCommunitySponsors = async () => {
    const results = await knex('sponsors')
        .select('handle')
        .where({ status: 'DISPLAY' })
        .sum('amount')
        .max({ latest: 'id' })
        .groupBy('handle')
        .orderBy('sum')
        .orderBy('latest', 'desc');

    return results;
};

router.get('/getCommunitySponsors', async (req, res) => {
    const results = await getCommunitySponsors();
    const mortals = results.filter(
        (entry) => entry.sum >= 100000 && entry.sum < 1000000
    );
    const gods = results.filter(
        (entry) => entry.sum >= 1000000 && entry.sum < 100000000
    );
    const olympians = results.filter((entry) => entry.sum >= 100000000);
    res.send({ mortals, gods, olympians });
});

router.get('/getMortals', async (req, res) => {
    const results = await getCommunitySponsors();
    const filter = results.filter(
        (entry) => entry.sum >= 100000 && entry.sum < 1000000
    );
    res.send(filter);
});

router.get('/getGods', async (req, res) => {
    const results = await getCommunitySponsors();
    const filter = results.filter(
        (entry) => entry.sum >= 1000000 && entry.sum < 100000000
    );
    res.send(filter);
});

router.get('/getOlympians', async (req, res) => {
    const results = await getCommunitySponsors();
    const filter = results.filter((entry) => entry.sum >= 100000000);
    res.send(filter);
});

export default router;
