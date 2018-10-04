const setup = require('./starter-kit/setup');
const hideElements = require('./hide-elements').default;

module.exports.screenshot = async function screenshot(url) {
  const browser = await setup.getBrowser();
  const page = await browser.newPage();
  await page.setViewport({width: 900, height: 50});
  await page.goto(url, {waitUntil: 'networkidle0'});
  await page.evaluate(hideElements);
  const data = await page.screenshot({fullPage: true});
  await page.close();
  return data;
};
