# blog.saurabhdaware

Personal blog of [@saurabhdaware](https://github.com/saurabhdaware) Built using [Abell](https://abelljs.org)

This blog is WIP so the code is not the best quality neither the site is optimized. More information will be added to README once the work is done.

## Use this as a Template

```sh
npx create-abell-app my-cool-blog --template saurabhdaware/blog.saurabhdaware.in
```

You will have to follow the [Setup For Backend](#for-backend) for sunflower button to work.

## Setup Repository

In most of the cases, frontend setup should be enough to get things going.

Backend is needed for the sunflower button to work.

### For Frontend

```sh
git clone <repository-url>
cd blog.saurabhdaware.in/
npm install
npm run dev
```

### For Backend

1. Setup FaunaDB Secret Key
  i. Create Secret Key from your FaunaDB Security Tab.
  ii. Create `.env` file in project root with following content
```
FAUNADB_SECRET_KEY=<Your Fauna Secret Key>
```

2. Install Netlify CLI
```sh
npm i -g netlify-cli
```

3. Run Serverless Function
```sh
netlify dev
```

Thanks!