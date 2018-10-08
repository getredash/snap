const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
import {exists as _exists, createReadStream} from 'fs';
import {x} from 'tar';
import {launch} from 'puppeteer';
import {
  executablePath as _executablePath,
  launchOptionForLambda,
  localChromePath,
  setupChromePath,
  remoteChromeS3Bucket,
  remoteChromeS3Key,
  DEBUG,
} from './config';

export const getBrowser = (() => {
  let browser;
  return async () => {
    if (typeof browser === 'undefined' || !await isBrowserAvailable(browser)) {
      await setupChrome();
      browser = await launch({
        headless: true,
        executablePath: _executablePath,
        args: launchOptionForLambda,
        dumpio: !!DEBUG,
      });
      debugLog(async (b) => `launch done: ${await browser.version()}`);
    }
    return browser;
  };
})();

const isBrowserAvailable = async (browser) => {
  try {
    await browser.version();
  } catch (e) {
    debugLog(e); // not opened etc.
    return false;
  }
  return true;
};

const setupChrome = async () => {
  if (!await existsExecutableChrome()) {
    if (await existsLocalChrome()) {
      debugLog('setup local chrome');
      await setupLocalChrome();
    } else {
      debugLog('setup s3 chrome');
      await setupS3Chrome();
    }
    debugLog('setup done');
  }
};

const existsLocalChrome = () => {
  return new Promise((resolve, reject) => {
    _exists(localChromePath, (exists) => {
      resolve(exists);
    });
  });
};

const existsExecutableChrome = () => {
  return new Promise((resolve, reject) => {
    _exists(_executablePath, (exists) => {
      resolve(exists);
    });
  });
};

const setupLocalChrome = () => {
  return new Promise((resolve, reject) => {
    createReadStream(localChromePath)
        .on('error', (err) => reject(err))
        .pipe(x({
          C: setupChromePath,
        }))
        .on('error', (err) => reject(err))
        .on('end', () => resolve());
  });
};

const setupS3Chrome = () => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: remoteChromeS3Bucket,
      Key: remoteChromeS3Key,
    };
    s3.getObject(params)
        .createReadStream()
        .on('error', (err) => reject(err))
        .pipe(x({
          C: setupChromePath,
        }))
        .on('error', (err) => reject(err))
        .on('end', () => resolve());
  });
};

const debugLog = (log) => {
  if (DEBUG) {
    let message = log;
    if (typeof log === 'function') message = log();
    Promise.resolve(message).then(
        (message) => console.log(message)
    );
  }
};
