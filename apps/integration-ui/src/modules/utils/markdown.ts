import remarkGfm from 'remark-gfm';
import { selectAll } from 'unist-util-select';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';

type NodeType = 'paragraph' | 'heading' | 'blockquote' | 'list' | 'listItem' | 'link' | 'image';

export async function markdownToHtml(markdown: string, limited?: boolean): Promise<string> {
  const optionsSanitize = limited ? { tagNames: ['a', 'ul', 'li', 'strong', 'em', 'b'] } : {};
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize, optionsSanitize)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString().replace(/<a href/g, '<a target="_blank" href');
}

export function nodeValuesFromMarkdown(markdown: string, nodeType: NodeType = 'heading', first?: number) {
  const processor = unified().use(remarkParse).use(remarkRehype).use(rehypeStringify);
  const ast = processor.parse(markdown);
  const nodes = selectAll(nodeType as string, ast)?.slice(0, first);
  const result = nodes.map(node => (node as any).children[0].value as string);

  return result;
}
