const {screenshot} = require('./screenshot');
const {upload} = require('./s3');

function getEmbedPropertiesFromPath(path) {
  const matches = path.match(/\/p\/(.*)\/(\d*)\/(\d*)\/(.*)\.png/);
  return {
    slug: matches[1],
    queryId: matches[2],
    visualizationId: matches[3],
    apiKey: matches[4],
  };
}

function jsonResponse(callback, statusCode, body) {
  callback(null, {
    statusCode,
    isBase64Encoded: false,
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'},
  });
}

function binaryResponse(callback, data) {
  callback(null, {
    statusCode: 200,
    body: data.toString('base64'),
    isBase64Encoded: true,
    headers: {'Content-Type': 'image/png'},
  });
}

exports.generatePreview = async (event, context, callback) => {
  // For keeping the browser launch
  context.callbackWaitsForEmptyEventLoop = false;
  // TODO: write stats
  const {
    protocol = 'https',
    path,
    queryId,
    visualizationId,
    apiKey,
  } = event.queryStringParameters;

  const embedUrl = `${protocol}://${path}/embed/query/${queryId}/visualization/${visualizationId}?api_key=${apiKey}`;

  try {
    const data = await screenshot(embedUrl);
    const url = await upload(data);
    jsonResponse(callback, 200, {url});
  } catch (err) {
    console.log(err);
    jsonResponse(callback, 500, {
      error: 'Failed generating preview. Please retry.',
    });
  }
};

exports.handler = async (event, context, callback) => {
  // For keeping the browser launch
  context.callbackWaitsForEmptyEventLoop = false;
  const {slug, queryId, visualizationId, apiKey} = getEmbedPropertiesFromPath(
    event.path
  );
  const url = `https://app.redash.io/${slug}/embed/query/${queryId}/visualization/${visualizationId}?api_key=${apiKey}`;

  try {
    const data = await screenshot(url);
    binaryResponse(callback, data);
  } catch (err) {
    console.log(err);
    jsonResponse(callback, 500, {error: 'Failed generating preview.'});
  }
};
