import puppeteer from 'puppeteer';
import restyleQuery from '../styling/query';

export async function queryPng(queryId, visualizationId, apiKey) {
  const url = `http://localhost:8080/embed/query/${queryId}/visualization/${visualizationId}?api_key=${apiKey}`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 900, height: 50});
  await page.goto(url, {waitUntil: 'networkidle0'});
  await page.evaluate(restyleQuery);
  const data = await page.screenshot({fullPage: true});
  await page.close();
  return data;
}
