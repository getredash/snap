import puppeteer from 'puppeteer';
import restyleDashboard from '../styling/dashboard';
import config from 'config';

const baseUrl = config.get('redash.baseUrl');

export async function dashboardPdf(dashboardId, apiKey) {
  const url = `${baseUrl}/dashboard/${dashboardId}`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({"Authorization": apiKey})
  await page.goto(url, {waitUntil: 'networkidle2'});
  await page.evaluate(restyleDashboard);
  const data = await page.pdf({format: 'A4'});
  await page.close();
  return data;
}
