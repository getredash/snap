import launchChrome from '@serverless-chrome/lambda';
import request from 'superagent';

export async function getChrome() {
  const chrome = await launchChrome({flags: ['--no-sandbox', '--headless']});

  const response = await request
      .get(`${chrome.url}/json/version`)
      .set('Content-Type', 'application/json');

  const endpoint = response.body.webSocketDebuggerUrl;

  return {
    endpoint,
    instance: chrome,
  };
}
