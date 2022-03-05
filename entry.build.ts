import { Route } from 'abell';
import index from './index.abell';
const markdownContent = import.meta.globEager('./content/**/index.md');

const pathToSlug = (mdPath: string): string => 
  mdPath.replace('./content/', '').replace('/index.md', '');

type BlogInfo = {
  slug: string;
  attributes: Record<string, unknown>
}[]

const blogInfo: BlogInfo = Object.keys(markdownContent)
  .map((mdPath: string) => ({
    slug: pathToSlug(mdPath),
    attributes: markdownContent[mdPath].attributes
  }));


export const makeRoutes = (): Route[] => {
  return [
    {
      path: '/',
      render: () => index({blogInfo}),
    }
  ]
}