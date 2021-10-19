Hiiii! so if you came from Twitter, you must have reached here after navigating from the homepage. 

Before we begin, I want you all to answer one simple poll without reloading the page. Don't worry it's not about getting the answer right.

**Was the routing between blog's homepage to this page, client-side or browser's default?**

<details>
<summary>Explain client-side routing and browser navigation</summary>

**Client-side routing** is when the navigation happens on JavaScript on the client-side. This does not require any page-reload and is instant.

**Browser's default navigation** is the default behaviour when we click a link. It requests a new document and waits for the page to load and then navigates to the page.

</details>

<style>
  #poll-1 button {
    background-color: #eee;
    padding: 10px 20px;
    display: block;
    width: 300px;
    margin: 8px auto;
    cursor: pointer;
  }
  #poll-1 button.selected {
    border: 1px solid #0f06;
  }
  #poll-1 button:disabled {
    cursor: default;
  }
  #poll-1 {
    text-align: center;
  }
</style>
<script>
  function select(el) {
    const tracker = ga.getAll()[0];
    if (tracker) {
      tracker.send('event', 'Is this SPA - Routing Type', 'Click', el.innerText);
      document.querySelectorAll('#poll-1 button')
        .forEach(button => button.disabled = true);
      el.classList.add('selected');
    }
  }
</script>
<div id="poll-1">
  <button onclick="select(this)">Client-Side Routing</button>
  <button onclick="select(this)">Full Browser Navigation</button>
</div>