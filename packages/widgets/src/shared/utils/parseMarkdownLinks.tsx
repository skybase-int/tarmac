import React from 'react';
import { ExternalLink } from '@widgets/shared/components/ExternalLink';

/**
 * Parses markdown links in text and converts them to ExternalLink components or plain anchor tags
 * Supports the pattern [text](url)
 * - Links starting with #tooltip- are rendered as plain <a> tags (for internal tooltip anchors)
 * - All other links are rendered as ExternalLink components
 *
 * @param text - The text containing markdown links
 * @param onExternalLinkClicked - Optional callback for external link clicks
 * @returns React nodes with parsed links
 */
export function parseMarkdownLinks(
  text: string | undefined | null,
  onExternalLinkClicked?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
): React.ReactNode {
  if (!text) return '';

  // Regex to match markdown links: [text](url)
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

  // If no links found, return the text as is
  if (!linkPattern.test(text)) {
    return text;
  }

  // Reset regex after test
  linkPattern.lastIndex = 0;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let keyIndex = 0;

  while ((match = linkPattern.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Add the link component
    const linkText = match[1];
    const url = match[2];

    // Check if this is a tooltip anchor link
    if (url.startsWith('#tooltip-')) {
      // Render as plain anchor tag for tooltip links
      parts.push(
        <a key={`link-${keyIndex++}`} href={url} className="text-text hover:text-white hover:underline">
          {linkText}
        </a>
      );
    } else {
      // Render as ExternalLink for external URLs
      parts.push(
        <ExternalLink
          key={`link-${keyIndex++}`}
          href={url}
          className="hover:text-white hover:underline"
          showIcon={false}
          onExternalLinkClicked={onExternalLinkClicked}
        >
          {linkText}
        </ExternalLink>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Add any remaining text after the last link
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <>{parts}</>;
}
