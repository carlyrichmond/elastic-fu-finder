const fs = require('fs');
const { Client } = require('@elastic/elasticsearch')
const { firefox } = require('playwright');

const imageFolder = 'public/screenshots';

async function run () {

    // Remove old image files
    fs.rmSync(`${imageFolder}`, { recursive: true, force: true });

    const client = new Client({
        cloud: { id: process.env.ELASTIC_CLOUD_ID },
        auth: { apiKey: process.env.ELASTIC_API_KEY }
    });
  
    // Let's search!
    const result = await client.search({
      index: 'vector-search-elastic-fu-finder-pages',
      _source: ['url'],
      size: 101
    });

    console.log('Number of results obtained: ' + result.hits.hits.length);
  
    getScreenshotsFromHits(result.hits.hits);
  }

  async function getScreenshotsFromHits(hits) {
    let browser = await firefox.launch();
    let page = await browser.newPage();
    await page.viewportSize({ width: 3840, height: 1080 });

    for (const hit of hits ) {
      const id = hit._id;
      const url = hit._source.url;

      console.log(`Obtaining screenshot for ${url}`);
      
      try {
        await page.goto(url);
        await page.screenshot({ path: `${imageFolder}/${id}.png`, fullPage: true , clip: { x: 0, y: 0, width: 3840, height: 1080 }}); 
      }
      catch(e) {
        console.log(`Timeout received for ${url}`);
        continue;
      }
    }

    await browser.close();
  }
  
  run().catch(console.log)