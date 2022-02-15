const axios = require('axios');

import { Router } from 'express';
const router = new Router();

import knex from './../knex';

// TODO set in config file
const tokenAuth = 'token ' + '04fb321904ee65c26137becad91113cc12d80cb1';

router.route('/makeDonation').post(async (req, res) => {
    console.log(' -Post -');
    console.log(req.body.handle);

    const data = {
        // TODO make amount configurable
        // amount: '1000000',
        amount: '10000',
        currency: 'sats'
    };

    // TODO set in config
    axios
        .post(
            'https://testnet.demo.btcpayserver.org/api/v1/stores/5J6vS34vyhnEw9qQZ59PASrYWm9ZmhHoWpSErULdLThV/invoices',
            data,
            {
                headers: {
                    Authorization: tokenAuth
                }
            }
        )
        .then(async (response) => {
            console.log(`Status: ${response.status}`);
            console.log('Body: ', response.data);
            await knex('sponsors').insert({
                handle: req.body.handle,
                invoice: response.data.id,
                status: 'PENDING'
            });
            res.json({
                success: true,
                checkoutLink: response.data.checkoutLink
            });
        })
        .catch((err) => {
            console.error(err);
            res.json({ success: false, error: 'Please try again later' });
        });
});

export default router;
