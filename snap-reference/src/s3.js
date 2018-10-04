const AWS = require('aws-sdk');
const randomstring = require('randomstring');

export async function upload(data) {
  const bucket = new AWS.S3({params: {Bucket: 'cdn-preview.redash.io'}});
  const key = randomstring.generate(6) + '/' + randomstring.generate() + '.png';

  const params = {
    ACL: 'public-read',
    Bucket: 'cdn-preview.redash.io',
    ContentType: 'image/png',
    Key: key,
    Body: data,
  };

  const response = await bucket.upload(params).promise();
  return response.Location;
}
