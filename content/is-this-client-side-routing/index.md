Hiiii! so if you came from Twitter, you must have reached here after navigating from the homepage. 

Before we begin, I want you all to answer one simple poll without reloading the page. Don't worry it's not about getting the right answer.

**The routing between blog's homepage to this page, was it a client-side or browser's default navigation?**

<details>
<summary>Explain client-side routing and browser navigation</summary>

**Client-side routing** is when the navigation happens on JavaScript on the client-side. This does not require any page-reload and is instant.

**Browser's default navigation** is the default behaviour when we click a link. It requests a new document and waits for the page to load and then navigates to the page.

</details>

<style>
  summary {
    cursor: pointer;
  }
  #poll-1 button {
    background-color: #D8E6FBaa !important;
    padding: 10px 20px;
    display: block;
    width: 300px;
    margin: 12px auto;
    cursor: pointer;
    border-radius: 8px;
    font-size: 0.9rem;
    color: #0E6CFB;
  }
  body.dark #poll-1 button {
    background-color: #D8E6FBdd !important;
    color: #3E5CFB;
    font-weight: bold;
  }
  #poll-1 button:not(:disabled):hover {
    background-color: #D8E6FB !important;
  }
  #poll-1 button.selected {
    cursor: default;
  }
  #poll-1 button.selected:after {
    content: ' ✓';
  }
  #poll-1 button:not(.selected):disabled {
    cursor: default;
    opacity: 0.5;
  }
  #poll-1 {
    text-align: center;
    padding: 12px 0px;
  }
</style>
<script>
  function select(el) {
    try {
      if (el.classList.contains('selected')) {
        document.querySelector('.hidden-article').classList.remove('hidden');
        return;
      };
      const tracker = ga.getAll()[0];
      if (tracker) {
        tracker.send('event', 'Is this SPA - Routing Type', 'Click', el.innerText);
        document.querySelectorAll('#poll-1 button')
          .forEach(button => button.disabled = true);
        el.classList.add('selected');
        document.querySelector('.hidden-article').classList.remove('hidden');
      }
    } catch (err) {
      document.querySelector('.hidden-article').classList.remove('hidden');
    }
  }
</script>
<div id="poll-1">
  <button onclick="select(this)">Client-Side Routing</button>
  <button onclick="select(this)">Default Browser Navigation</button>
  <button onclick="select(this)">Skip This Poll</button>
</div>

Select any option in the poll to continue reading this article...

<style>
  .hidden-article {
    opacity: 1;
  }
  .hidden-article.hidden {
    opacity: 0;
  }
</style>
<div class="hidden-article">

So the correct answer is **Default Browser Navigation** 🎉 

Though I'll be more happy if you have selected Client-Side Routing because in this blog, I am going to talk about how we can improve the browser navigation performance without client-side routing.



</div>