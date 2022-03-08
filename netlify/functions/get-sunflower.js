const actions = require('./_actions.js');

exports.handler = async function(event, context) {
  const isDev = event.multiValueHeaders.host[0] === 'localhost:8888';
  let headers = {}

  if (isDev) {
    headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 200,
      headers,
      body: '{}'
    }
  }

  const sunflowers = await actions.read('sunflowers_by_blog', event.queryStringParameters.blog);
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(sunflowers.data)
  }
}