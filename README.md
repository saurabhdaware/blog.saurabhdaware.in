# Source Code of blog.saurabhdaware.in

***Warning: This blog uses unstable version of Abell***

Things I realised that are missing in Abell as of now which I'll have to fix in future versions of abell -
- Can't refer to local images from blog content directly. 
- CSS solution is not good enough. No out of the box scoped CSS.
- No Auto-complete in Editor
- `entry.build.ts` becomes too verbose in dynamic paths.
- Too many files in root. (Can add cli param to define root and make src default root)
- CSS inlining not working in Vite.
- No control over bundling.
- Can't use props in first block.
- Can't define variable after first blocks so if there is a usecase of using props to define a variable, we can get blocked.

**Small Bugs**
- This prints null on screen but it shouldn't
```vue
<body>{{ () => null }}</body>
```
