const axios = require('axios');

import { Router } from 'express';
const router = new Router();

import knex from './../knex';
import * as config from './../config.json';

router.route('/makeDonation').post(async (req, res) => {
    const amount = req.body.amount;
    if (isNaN(amount)) {
        res.json({
            success: false,
            error: 'Invalid amount'
        });
    }
    if (!Number.isInteger(Number(amount))) {
        res.json({
            success: false,
            error: 'Whole sats only. Sorry.'
        });
    }
    if (Number(amount) < 10000) {
        res.json({
            success: false,
            error: 'Amount too small for tracking. Please make anonymous donation at https://pay.zeusln.app'
        });
    }

    const data = {
        amount,
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
                // remove spaces and at-sign
                handle: req.body.handle.trim().replace('@', ''),
                invoice: response.data.id,
                amount,
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
