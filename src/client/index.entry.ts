import './home.css';

const prefetchMap: Record<string, boolean> = {};

function prefetch(url: string): Promise<void> {
  if (prefetchMap[url]) return;
  return new Promise((resolve, reject) => {
    const link = document.createElement(`link`);
    link.rel = `prefetch`;
    link.href = url;

    link.onload = () => {
      prefetchMap[url] = true;
      resolve();
    };
    link.onerror = reject;

    document.head.appendChild(link);
  });
}

const articleAnchors = document.querySelectorAll<HTMLAnchorElement>('.article-container article > a.article-anchor');
articleAnchors.forEach((articleAnchor, index) => {
  if (index < 2) {
    // prefetch first 2 articles
    prefetch(articleAnchor.href)
  } else {
    // prefetch other articles on hover
    articleAnchor.addEventListener('mouseover', () => {
      prefetch(articleAnchor.href);
    })
  }
})
