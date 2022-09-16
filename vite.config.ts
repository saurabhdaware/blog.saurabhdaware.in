import { defineConfig } from 'abell';
import vitePluginMdToHTML from 'vite-plugin-md-to-html';
const abellHighlighter = (e) => {
  return {
    name: "abell",
    aliases: ["Abell", "abell"],
    subLanguage: ["xml"],
    contains: [
      e.C_LINE_COMMENT_MODE,
      e.C_BLOCK_COMMENT_MODE,
      {
        className: "abell",
        begin: "{{",
        end: "}}",
        subLanguage: ["javascript", "xml"],
        contains: [
          {
            className: 'abell',
            begin: '/* html */ `',
            end: '`',
            subLanguage: ['xml']
          },
        ]
      },
      {
        className: "abell",
        begin: "props={",
        end: "'}",
        subLanguage: ["javascript", "xml"],
      },
    ],
  };
}

export default defineConfig({
  plugins: [
    vitePluginMdToHTML({
      syntaxHighlighting: true,
      resolveImageLinks: true,
      highlightJs: {
        register: {
          'abell': abellHighlighter
        }
      }
    })
  ],
  // publicDir: 'content'
})