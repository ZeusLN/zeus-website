const axios = require('axios');
const fs = require('fs');
const path = require('path');
const request = require('request');
const puppeteer = require('puppeteer');
import knex from './knex';

// TODO set in config file
const tokenAuth = 'token ' + '04fb321904ee65c26137becad91113cc12d80cb1';

const checkInvoices = async () => {
    const results = await knex('sponsors')
        .select('id', 'invoice', 'handle')
        .where({ status: 'PENDING' });

    results.forEach((donation, index) => {
        console.log(donation.invoice);

        axios
            .get(
                `https://testnet.demo.btcpayserver.org/api/v1/stores/5J6vS34vyhnEw9qQZ59PASrYWm9ZmhHoWpSErULdLThV/invoices/${donation.invoice}`,
                {
                    headers: {
                        Authorization: tokenAuth
                    }
                }
            )
            .then(async (res) => {
                // Debug
                console.log(`Status: ${res.status}`);
                console.log('Body: ', res.data);

                if (res.data.status === 'Expired') {
                    await knex('sponsors').delete().where({
                        id: donation.id
                    });
                } else if (res.data.status === 'Settled') {
                    await scrapeTwitterProfilePic(donation.handle);
                    await knex('sponsors').update({ status: 'PAID' }).where({
                        id: donation.id
                    });
                }
            })
            .catch(async (err) => {
                console.log('error').console.error(err);
            });
    });
};

const scrapeTwitterProfilePic = async (handle) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('response', async (response) => {
        let url = response.url();
        if (response.request().resourceType() === 'image') {
            /**
             * Filter to only collect profile pictures
             */
            console.log(url);
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
            }
        }
    });

    await page.setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:97.0) Gecko/20100101 Firefox/97.0'
    );
    await page.goto('https://twitter.com/' + handle + '/photo');
    await page.waitFor(1000);
    // debug
    // await page.screenshot({ path: 'example.png' });
    await browser.close();
};

export default checkInvoices;
