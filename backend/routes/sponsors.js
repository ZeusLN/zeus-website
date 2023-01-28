import { Router } from 'express';
import knex from './../knex';

const router = new Router();

const getCommunitySponsors = async () => {
    const results = await knex('sponsors')
        .select('handle')
        .select('type')
        .where({ status: 'DISPLAY' })
        .sum('amount')
        .max({ latest: 'id' })
        .groupBy('handle')
        .groupBy('type')
        .orderBy('sum')
        .orderBy('latest', 'desc');

    return results;
};

router.get('/getCommunitySponsors', async (req, res) => {
    const results = await knex('sponsors')
        .select('handle')
        .where({ status: 'DISPLAY' });
    res.send(results);
});

router.get('/getSponsors', async (req, res) => {
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

// v1 (don't show Nostr)

router.get('/getMortals', async (req, res) => {
    const results = await getCommunitySponsors();
    const filter = results.filter(
        (entry) =>
            entry.sum >= 100000 &&
            entry.sum < 1000000 &&
            entry.type === 'Twitter'
    );
    res.send(filter);
});

router.get('/getGods', async (req, res) => {
    const results = await getCommunitySponsors();
    const filter = results.filter(
        (entry) =>
            entry.sum >= 1000000 &&
            entry.sum < 100000000 &&
            entry.type === 'Twitter'
    );
    res.send(filter);
});

router.get('/getOlympians', async (req, res) => {
    const results = await getCommunitySponsors();
    const filter = results.filter(
        (entry) => entry.sum >= 100000000 && entry.type === 'Twitter'
    );
    res.send(filter);
});

// v2

router.get('/v2/getMortals', async (req, res) => {
    const results = await getCommunitySponsors();
    const filter = results.filter(
        (entry) => entry.sum >= 100000 && entry.sum < 1000000
    );
    res.send(filter);
});

router.get('/v2/getGods', async (req, res) => {
    const results = await getCommunitySponsors();
    const filter = results.filter(
        (entry) => entry.sum >= 1000000 && entry.sum < 100000000
    );
    res.send(filter);
});

router.get('/v2/getOlympians', async (req, res) => {
    const results = await getCommunitySponsors();
    const filter = results.filter((entry) => entry.sum >= 100000000);
    res.send(filter);
});

export default router;
