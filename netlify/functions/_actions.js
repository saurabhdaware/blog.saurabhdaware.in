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


async function readAll(index) {
	return client.query(
		q.Map(
      q.Paginate(q.Match(q.Index(index))),
      q.Lambda(x => q.Get(x))
    )
	);
}


module.exports = {
  create,
  readAll,
  addSunflowers
}