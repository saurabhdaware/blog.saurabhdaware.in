const faunadb = require('faunadb');

const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET_KEY });
const q = faunadb.query;

async function create(collection, data) {
  return client.query(q.Create(q.Collection(collection), {data}));
}

function addSunflowers(blogUrl, sunflowerCount = 1) {
  if (sunflowerCount > 50) {
    throw new Error('Too much positivity');
  }

  return client.query(
    q.Update(
      q.Select(['ref'], q.Get(q.Match(q.Index("sunflowers_by_blog"), blogUrl))),
      { 
        data: { 
          sunflowerCount: q.Add(
            q.Select(
              ['data','sunflowerCount'],
              q.Get(q.Match(q.Index("sunflowers_by_blog"), blogUrl))
            ),
            sunflowerCount
          )
        }
      }
    )
  )
}

async function read(index, value) {
	let result;
	try{
		result = await client.query(q.Get(q.Match(q.Index(index), value)));
	} catch(err) {
		result = { data: { sunflowerCount: null } };
	}

	return result;
}


module.exports = {
  create,
  read,
  addSunflowers
}