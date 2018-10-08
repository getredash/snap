import puppeteer from 'puppeteer';
import restyleDashboard from '../styling/dashboard';

export async function dashboardPdf(dashboardId, apiKey) {
  const url = `http://localhost:8080/dashboard/${dashboardId}?api_key=${apiKey}`;
  console.log(`Trying to generate PDF for url ${url}`);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle0'});
  await page.evaluate(restyleDashboard);
  const data = await page.pdf({format: 'A4'});
  await page.close();
  return data;
}
