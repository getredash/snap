import puppeteer from 'puppeteer';
import restyleDashboard from '../styling/dashboard';
import config from 'config';
import {getChrome} from '../chrome/setup';

const baseUrl = config.get('redash.baseUrl');

export async function dashboardPdf(dashboardId, apiKey) {
  const url = `${baseUrl}/dashboard/${dashboardId}`;
  const chrome = await getChrome();
  const browser = await puppeteer.connect({browserWSEndpoint: chrome.endpoint});
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({'Authorization': apiKey});
  await page.goto(url, {waitUntil: 'networkidle2'});
  await page.evaluate(restyleDashboard);
  
  const data = await page.pdf();
  await page.close();
  return data;
}
