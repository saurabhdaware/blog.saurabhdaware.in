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

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 200,
      headers,
      body: '{}'
    }
  }

  const body = JSON.parse(event.body)
  body.sunflowerCount = Number(body.sunflowerCount);
  
  try {
    await actions.addSunflowers(body.blog, body.sunflowerCount);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'UPDATE_EXISTING_RECORD'
      })
    };
  } catch (err) {
    if (err.description === 'Set not found.') {
      await actions.create('sunflowers', {
        blog: body.blog,
        sunflowerCount: body.sunflowerCount
      })
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'CREATE_NEW_RECORD'
        })
      };
    } else {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          err: err.description
        })
      }
    }
  } 
}