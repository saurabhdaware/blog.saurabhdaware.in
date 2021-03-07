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

  return {
      statusCode: 200,
      headers,
      body: JSON.stringify({success: true})
  };
}