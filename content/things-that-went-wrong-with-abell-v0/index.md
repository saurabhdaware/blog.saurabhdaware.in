---
title: Things That Went Wrong With Abell v0
description: "This blog talks about the mess ups I did while building Abell v0"
createdAt: "7 Mar 2022"
published: false
---
## Background

When I started Abell, the idea was to create a static-site-generator where you don't have to go through the documentation or learn new things. Something that you can figure out from your intuition.

For example, you don't have to know anything about the Abell to figure out what the following syntax is doing-
```abell
{{
  const a = 3;
  const b = 2;
}}

<body>{{ a + b }}</body>
```

This is of course an easy example. Lets see something complicated-
```abell
{{
  const fs = require('fs');
  const renderMarkdown = require('markdown-to-html-lib');
}}

<body>{{ renderMarkdown(fs.readFileSync('./content.md', 'utf-8')) }}</body>
```

This is again something that we can understand without knowing anything about abell.


## So where did things go wrong?

**New Features!!**

After the initial setup, I decided to add some features to abell. Features like components, scoped css, way to execute client-side JavaScript  felt necessary (and I guess they actually are!)

With every new feature, came a new syntax-

E.g. Components in Abell v0 -
```abell
// Importing component
{{
  const Navbar = require('./components/Navbar.abell');
}}
<body>
  <Navbar props={hello: 'hi'} />
</body>
```

```abell
// Component
<AbellComponent>
<template>
  <nav>hello</nav>
</template>

<style scoped>
nav { color: red }
</style>

<script>
scopedSelector('nav').innerHTML = 'hieee';
</script>
</AbellComponent>
```

This breaks the earlier philosophy of figuring out things intuitively. What is `scopedSelector`, what is `scoped` attribute in style, why `props={}` attribute in component, which all attribute does the `style` tag supports? 

It didn't end here. To make that `<script>` work properly, I have to handle bundling of that script, transforms of any custom syntax, minification, handling it in dev-server, and simply making it work with edge-cases has been a big deal in itself (Check [The issues with Abell Component](https://github.com/abelljs/abell/discussions/126) for details) 

New syntax brings new questions that need to be answered in the documentation. So more documentation and a larger learning curve! 

It also brings new code that needs to be maintained so you have to spend more time into open-source which isn't possible because... life??


## How to solve this?

Alright so to summarise, the problem is that with new features came new syntax. How do you avoid this?

Well, 1 solution is to not add features but then I might as well not build this project altogether 🙈

Another solution is to make the tool integratable with the rest of the ecosystem. This will allow users to use whichever library they are familiar with to do things like scoped css, and client-side javascript with those tools.

So far the Abell v0 has been doing the work of bundler, dev-server, compiler, and transpiler. This will mean, to make it integrate with ecosystem, Abell would've needed manual changes in every part of it. This was definitely not the solution I was looking for since it is practically impossible to rebuild everything and make it work with existing libraries.

After brainstorming, experimentation, a vacation, a large break from coding, and binge-watching kdrama on Netflix, I finally decided to use a bundler. In the JavaScript ecosystem, bundlers are a central piece that can connect to everything. They can handle dev-server, hot reloads, they have configs and plugins that we can use, Frameworks can connect to them well, and its easier to integrate things like babel, typescript in them.

Using bundler for SSG wasn't very easy few years back when I started the project. Webpack configurations are hard and confusing. There were not much of the SSGs I could find who were using webpack. It also majorly deals with JavaScript. I needed something that can also deal with HTML.

But now we have Vite!! Andd not to sound dramatic but Vite is probably the best piece of software I've ever seen!! Vite allows to set multiple HTML entry files and most things like TypeScript, JSX-to-JS, work out of the box!! The plugins are absolute bestt! I was surprised to see how many things 'just worked' without any efforts.

## Vite-based SSG

By using Vite as base, I could just delete half of the abell codebase. The dev-server, live-reload, integration with frameworks, bundling, minification, transpiling, everything is handled by vite.

If you've been following the abell v0's progress, you might know that abell v0 repo is currently split into 2 npm packages, `abell` and `abell-renderer` where `abell-renderer` is a template engine and `abell` is an SSG. 

With Vite, the code has gotten so easy that I just deleted the entire `abell` codebase and moved `abell-renderer` to `abell` for v1. Check out `one` branch on `abell` repo. `abell-renderer` will be deprecated after release of v1.

One more change that was made in the internal implementation was that now instead of compiling to HTML, Abell compiles to JS.

### In v0
```abell
// input
{{
  const path = require('path');
}}
<body>{{ path.join('hi', 'hello') }}</body>

// output
<body>hi/hello</body>
```

### In v1
```abell
// input
{{
  import path from 'path';
}}
<body>{{ path.join('hi', 'hello') }}</body>
```

```js
// output
import { evaluateAbellBlock as e } from 'abell/dist/internal-utils';
import path from 'path';

export const html = (props) => `<body>${e(path.join('hi', 'hello'))}</body>`
export default html;
```

Since most of our tools are built for JavaScript and not for HTML, this change in target language opens up a lot of opportunities for abell to integrate with rest of the libraries. This is also one of the reasons why `import` is working now and even allows vite plugins to work.

Check out the [First Abell v1 Draft Release](https://github.com/abelljs/abell/releases/tag/abell-v1.0.0-alpha.10) for more information on v1.

Since the target is to make the Abell integratable, we'll be dropping Abell Components from v1. There will be a way to write component but it may not cover lots of features and will be a bit low-level.

Currently, in Abell v1, you can write basic components like this-
```abell
// importing of the component
{{
  import navbar from './navbar.abell';
}}
<body>
  {{ navbar }} // without props
  {{ navbar({hello: 'hi'}) }} // with props
</body>
```

```abell
// component code
<nav>{{ 'hello'.toUpperCase() }}</nav>
```

This is an attempt to go back to the initial philosophy of having a syntax that does not need documentation (though it will have one, don't worry 🙈)

## Closing Thoughts

I am really not sure how the information in this post is going to help but I hope it does? 

A hugeeee shoutout to Vite team!! Do check out [Vite](https://vitejs.dev/) and if you're using it in your projects, try sponsoring someone from their team if possible.
