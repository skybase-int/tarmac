// This file handles loading the correct terms markdown based on environment configuration
// The imports are resolved at build time by Vite

// Default terms (always available as fallback)
import defaultTerms from '@/content/terms.md?raw';

// Import all potential terms files that might be used
// Add more imports here as needed for different environments
const termsModules = import.meta.glob('@/content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

// Function to get terms content based on environment variable
export function getTermsContent(): string {
  const termsFileName = import.meta.env.VITE_TERMS_MARKDOWN_FILE;

  if (!termsFileName) {
    // No custom file specified, use default
    return defaultTerms;
  }

  // The keys in termsModules are like '/content/terms.md'
  // If the env var includes the full path, extract just the filename
  let fileName = termsFileName;
  if (termsFileName.includes('/')) {
    // Extract just the filename from a path like '/src/content/custom-terms.md'
    fileName = termsFileName.split('/').pop() || termsFileName;
  }

  const termPath = `/content/${fileName}`;

  if (termsModules[termPath]) {
    console.log(`Using custom terms file: ${fileName}`);
    return termsModules[termPath];
  }

  console.warn(`Terms file not found: ${fileName} at path ${termPath}, falling back to default`);
  console.warn('Available files:', Object.keys(termsModules));
  return defaultTerms;
}
