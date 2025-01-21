import { useEffect, useState } from 'react';
import { markdownToHtml } from '../utils/markdown';

export function useMarkdownToHtml(markdown: string): string {
  const [html, setHtml] = useState('');

  useEffect(() => {
    const parseHTMLDescription = async () => {
      if (!markdown) return;
      const description = await markdownToHtml(markdown);
      setHtml(description);
    };
    parseHTMLDescription();
  }, [markdown]);

  return html;
}
