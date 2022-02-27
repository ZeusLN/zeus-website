const axios = require('axios');

import { Router } from 'express';
const router = new Router();

import knex from './../knex';
import * as config from './../config.json';

router.route('/makeDonation').post(async (req, res) => {
    const data = {
        amount: config.supportAmtSats,
        currency: 'sats',
        checkout: {
            redirectURL: 'https://zeusln.app/about'
        }
    };

    axios
        .post(`${config.btcPay.store}/invoices`, data, {
            headers: {
                Authorization: config.btcPay.token
            }
        })
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
