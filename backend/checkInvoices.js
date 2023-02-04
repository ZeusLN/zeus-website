const axios = require('axios');
const fs = require('fs');
const path = require('path');
const request = require('request');
const puppeteer = require('puppeteer');
import knex from './knex';

import config from './config.json';

const checkInvoices = async () => {
    const pendingResults = await knex('sponsors')
        .select('id', 'invoice', 'handle')
        .where({ status: 'PENDING' });

    pendingResults.forEach((donation, index) => {
        console.log(donation.invoice);
        axios
            .get(`${config.btcPay.store}/invoices/${donation.invoice}`, {
                headers: {
                    Authorization: config.btcPay.token
                }
            })
            .then(async (res) => {
                // Debug
                // console.log(`Status: ${res.status}`);
                // console.log('Body: ', res.data);

                if (res.data.status === 'Expired') {
                    await knex('sponsors').delete().where({
                        id: donation.id
                    });
                } else if (res.data.status === 'Settled') {
                    await knex('sponsors').update({ status: 'PAID' }).where({
                        id: donation.id
                    });
                }
            })
            .catch(async (err) => {
                console.log('error').console.error(err);
            });
    });

    const paidResults = await knex('sponsors')
        .select('id', 'invoice', 'handle', 'type')
        .where({ status: 'PAID' });

    paidResults.forEach(async (donation) => {
        console.log(donation);
        if (donation.type === 'Twitter')
            await scrapeTwitterProfilePic(donation.handle, donation.id);
        if (donation.type === 'Nostr')
            await scrapeNostrProfilePic(donation.handle, donation.id);
    });
};

const scrapeTwitterProfilePic = async (handle, donationId) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    console.log('Attempting to scrape Twitter picture for', handle);

    page.on('response', async (response) => {
        let url = response.url();
        if (response.request().resourceType() === 'image') {
            /**
             * Filter to only collect profile pictures
             */
            if (url.match('(https://pbs.twimg.com/profile_images/(.*))')) {
                console.log(url);
                request.head(url, function (err, res, body) {
                    const twitterUsernamePath = `public/twitter-images/`;
                    if (!fs.existsSync(twitterUsernamePath)) {
                        fs.mkdirSync(twitterUsernamePath);
                    }
                    const filePath = path.resolve(
                        twitterUsernamePath,
                        `${handle}.jpg`
                    );
                    request(url).pipe(fs.createWriteStream(filePath));
                });

                await knex('sponsors').update({ status: 'DISPLAY' }).where({
                    id: donationId
                });
            }
        }
    });

    await page.setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:97.0) Gecko/20100101 Firefox/97.0'
    );
    await page.goto('https://twitter.com/' + handle + '/photo');
    await page.waitForTimeout(1000);
    // Debug
    // await page.screenshot({ path: 'example.png' });
    await browser.close();
};

const scrapeNostrProfilePic = async (npub, donationId) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:97.0) Gecko/20100101 Firefox/97.0'
    );
    await page.goto('https://iris.to/#/profile/' + npub);
    await page.waitForTimeout(10000);
    const imgs = await page.$$eval('.profile-picture', (imgs) =>
        imgs.map((img) => img.getAttribute('src'))
    );
    const img = imgs[0];
    if (img) {
        console.log('img', img);
        // const imgExt = img.split(/[#?]/)[0].split('.').pop().trim();
        request.head(img, function (err, res, body) {
            const npubPath = `public/nostr-images/`;
            if (!fs.existsSync(npubPath)) {
                fs.mkdirSync(npubPath);
            }
            const filePath = path.resolve(npubPath, `${npub}.jpg`);
            request(img).pipe(fs.createWriteStream(filePath));
        });

        await knex('sponsors').update({ status: 'DISPLAY' }).where({
            id: donationId
        });
    }
    // debug
    // await page.screenshot({ path: 'example.png' });
    await browser.close();
};

export default checkInvoices;
