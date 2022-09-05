import { Route } from 'abell';
import index from './index.abell';
import blog from './blog.abell';
const markdownContent = import.meta.glob('./content/**/index.md', { eager: true });

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
  const routes = [
    {
      path: '/',
      render: () => index({blogInfo}),
    },
    ...Object.entries(markdownContent).map(
      ([blogPath, blogImport]): Route => {
        const slug = pathToSlug(blogPath)
        return {
          path: `/${slug}`,
          render: () => {
            if (blogImport.attributes.published !== false) {
              return blog({
                blogInfo,
                slug,
                attributes: blogImport.attributes,
                content: blogImport.default,
              })
            }
  
            return undefined;
          },
          routeOptions: {
            outputPathPattern: '[route]/index.html'
          }
        }
      }
    )
  ]
  return routes;
}