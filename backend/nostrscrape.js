const fs = require('fs');
const path = require('path');
const request = require('request');
const puppeteer = require('puppeteer');

console.log('getting scrape');

const npub = 'npub1xnf02f60r9v0e5kty33a404dm79zr7z2eepyrk5gsq3m7pwvsz2sazlpr5';

(async () => {
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
    // const imgExt = img.split(/[#?]/)[0].split('.').pop().trim();
    request.head(img, function (err, res, body) {
        const npubPath = `public/nostr-images/`;
        if (!fs.existsSync(npubPath)) {
            fs.mkdirSync(npubPath);
        }
        const filePath = path.resolve(npubPath, `${npub}.jpg`);
        request(img).pipe(fs.createWriteStream(filePath));
    });
    // debug
    // await page.screenshot({ path: 'example.png' });
    await browser.close();
})();
