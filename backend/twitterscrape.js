const fs = require('fs');
const path = require('path');
const request = require('request');
const puppeteer = require('puppeteer');

console.log('getting scrape');

const twitterUsername = 'ZeusLN';

(async () => {
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
                        `${twitterUsername}.jpg`
                    );
                    request(url).pipe(fs.createWriteStream(filePath));
                });
            }
        }
    });

    await page.setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:97.0) Gecko/20100101 Firefox/97.0'
    );
    await page.goto('https://twitter.com/' + twitterUsername + '/photo');
    await page.waitForTimeout(1000);
    // debug
    // await page.screenshot({ path: 'example.png' });
    await browser.close();
})();
