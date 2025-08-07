#!/usr/bin/env bash

# Don't exit on error - we'll handle errors gracefully
set +e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
# Use SSH URL for authentication, or override with CONTENT_REPO_URL env var
CONTENT_REPO="${CONTENT_REPO_URL:-git@github.com:sky-ecosystem/corpus.git}"
CONTENT_VERSION_FILE=".content-version"
TEMP_DIR=".tmp-content-repo"
OUTPUT_SOURCE_PATH="output/webapp/faq"
DESTINATION_PATH="src/data/faqs"
EXTRACT_SCRIPT="scripts/extract_webapp_faqs.js"

# Function to print colored output
print_status() {
    echo -e "${GREEN}[SYNC]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if .content-version file exists
if [ ! -f "$CONTENT_VERSION_FILE" ]; then
    print_error "Content version file '$CONTENT_VERSION_FILE' not found!"
    print_error "Please create it with a valid commit hash or tag."
    exit 1
fi

# Read the content version
CONTENT_VERSION=$(cat "$CONTENT_VERSION_FILE" | tr -d '[:space:]')

if [ -z "$CONTENT_VERSION" ]; then
    print_error "Content version file '$CONTENT_VERSION_FILE' is empty!"
    exit 1
fi

print_status "Using content version: $CONTENT_VERSION"

# Clean up any existing temp directory
if [ -d "$TEMP_DIR" ]; then
    print_status "Cleaning up existing temp directory..."
    rm -rf "$TEMP_DIR"
fi

# Clone the repository at the specific version
print_status "Cloning content repository..."
git clone --quiet "$CONTENT_REPO" "$TEMP_DIR" 2>/dev/null

# Check if clone was successful
if [ $? -ne 0 ]; then
    print_warning "Failed to clone content repository. This might be due to:"
    print_warning "  - Missing SSH keys or authentication"
    print_warning "  - Network connectivity issues"
    print_warning "  - Repository access permissions"
    print_warning ""
    print_warning "Skipping content sync. The build will continue with existing content."
    rm -rf "$TEMP_DIR" 2>/dev/null
    exit 0
fi

# Navigate to the temp directory
cd "$TEMP_DIR"

# Checkout the specific version
print_status "Checking out version: $CONTENT_VERSION"
git checkout --quiet "$CONTENT_VERSION" 2>/dev/null

# Check if checkout was successful
if [ $? -ne 0 ]; then
    print_warning "Failed to checkout version: $CONTENT_VERSION"
    print_warning "Skipping content sync. The build will continue with existing content."
    cd ..
    rm -rf "$TEMP_DIR"
    exit 0
fi

# Check if the extract script exists
if [ ! -f "$EXTRACT_SCRIPT" ]; then
    print_error "Extract script '$EXTRACT_SCRIPT' not found in content repository!"
    cd ..
    rm -rf "$TEMP_DIR"
    exit 1
fi

# Run the extract script
print_status "Running extraction script..."
node "$EXTRACT_SCRIPT"

# Check if output was generated
if [ ! -d "$OUTPUT_SOURCE_PATH" ]; then
    print_error "Expected output directory '$OUTPUT_SOURCE_PATH' was not created!"
    cd ..
    rm -rf "$TEMP_DIR"
    exit 1
fi

# Go back to project root
cd ..

# Ensure destination directory exists
mkdir -p "$DESTINATION_PATH"

# Copy generated files to destination
print_status "Copying generated files to $DESTINATION_PATH..."

# Use rsync for better control over the copy process
# This will copy all files from output/website/* to app/(main)/faq/
# Without --delete flag, existing files will be preserved
if command -v rsync &> /dev/null; then
    rsync -av "$TEMP_DIR/$OUTPUT_SOURCE_PATH/" "$DESTINATION_PATH/"
else
    # Fallback to cp if rsync is not available
    print_warning "rsync not found, using cp instead"
    cp -r "$TEMP_DIR/$OUTPUT_SOURCE_PATH/"* "$DESTINATION_PATH/"
fi

# Post-process sharedFaqItems.ts and update getBalancesFaqItems.ts
print_status "Processing sharedFaqItems and updating getBalancesFaqItems..."

# Create a Node.js script to extract and combine the FAQ items
cat > "$DESTINATION_PATH/.process-shared-items.cjs" << 'EOF'
const fs = require('fs');
const path = require('path');

// Files to process for sharedFaqItems
const sourceFiles = [
  'getL2GeneralFaqItems.ts',
  'getBaseFaqItems.ts', 
  'getArbitrumFaqItems.ts',
  'getOptimismFaqItems.ts',
  'getUnichainFaqItems.ts'
];

// Export names for each file
const exportNames = {
  'getL2GeneralFaqItems.ts': 'L2GeneralFaqItems',
  'getBaseFaqItems.ts': 'baseFaqItems',
  'getArbitrumFaqItems.ts': 'arbitrumFaqItems',
  'getOptimismFaqItems.ts': 'optimismFaqItems',
  'getUnichainFaqItems.ts': 'unichainFaqItems'
};

// Store L2SavingsFaqItems content for later use
let l2SavingsContent = '';

let outputContent = '';

// Process each file for sharedFaqItems
sourceFiles.forEach((fileName) => {
  const filePath = path.join(__dirname, fileName);
  
  if (fs.existsSync(filePath)) {
    console.log(`Processing ${fileName}...`);
    
    // Read the file content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract the items array using regex
    const match = content.match(/const items = (\[[\s\S]*?\]);[\s\S]*?return items/);
    
    if (match && match[1]) {
      const itemsArray = match[1];
      const exportName = exportNames[fileName];
      
      // Add export to output
      if (outputContent) outputContent += '\n\n';
      outputContent += `export const ${exportName} = ${itemsArray};`;
      
      // Delete the source file
      fs.unlinkSync(filePath);
      console.log(`  - Extracted and removed ${fileName}`);
    } else {
      console.log(`  - Warning: Could not extract items from ${fileName}`);
    }
  }
});

// Process getL2SavingsFaqItems.ts separately
const l2SavingsFilePath = path.join(__dirname, 'getL2SavingsFaqItems.ts');
if (fs.existsSync(l2SavingsFilePath)) {
  console.log('Processing getL2SavingsFaqItems.ts...');
  
  // Read the file content
  const content = fs.readFileSync(l2SavingsFilePath, 'utf8');
  
  // Extract the items array
  const match = content.match(/const items = (\[[\s\S]*?\]);[\s\S]*?return items/);
  
  if (match && match[1]) {
    l2SavingsContent = match[1];
    console.log('  - Extracted L2SavingsFaqItems content');
    
    // Delete the source file
    fs.unlinkSync(l2SavingsFilePath);
    console.log('  - Removed getL2SavingsFaqItems.ts');
  } else {
    console.log('  - Warning: Could not extract items from getL2SavingsFaqItems.ts');
  }
}

// Write the combined sharedFaqItems file
if (outputContent) {
  const outputPath = path.join(__dirname, 'sharedFaqItems.ts');
  fs.writeFileSync(outputPath, outputContent + '\n', 'utf8');
  console.log(`Created sharedFaqItems.ts with combined exports`);
} else {
  console.log('No content to write to sharedFaqItems.ts');
}

// Now update getBalancesFaqItems.ts, getSavingsFaqItems.ts and getTradeFaqItems.ts to use chain-aware logic
const balancesFilePath = path.join(__dirname, 'getBalancesFaqItems.ts');
const savingsFilePath = path.join(__dirname, 'getSavingsFaqItems.ts');
const tradeFilePath = path.join(__dirname, 'getTradeFaqItems.ts');

// Update getBalancesFaqItems.ts
if (fs.existsSync(balancesFilePath)) {
  console.log('Updating getBalancesFaqItems.ts with chain-aware logic...');
  
  // Read the current file
  const content = fs.readFileSync(balancesFilePath, 'utf8');
  
  // Extract the items array
  const match = content.match(/const items = (\[[\s\S]*?\]);[\s\S]*?return items/);
  
  if (match && match[1]) {
    // Create the new chain-aware version
    const newContent = `import {
  isArbitrumChainId,
  isBaseChainId,
  isOptimismChainId,
  isUnichainChainId
} from '@jetstreamgg/sky-utils';

import {
  L2GeneralFaqItems,
  arbitrumFaqItems,
  baseFaqItems,
  optimismFaqItems,
  unichainFaqItems
} from './sharedFaqItems';

export const getBalancesFaqItems = (chainId: number) => {
  const items = [
    ...generalFaqItems,
    ...L2GeneralFaqItems,
    ...(isBaseChainId(chainId) ? baseFaqItems : []),
    ...(isArbitrumChainId(chainId) ? arbitrumFaqItems : []),
    ...(isOptimismChainId(chainId) ? optimismFaqItems : []),
    ...(isUnichainChainId(chainId) ? unichainFaqItems : [])
  ];
  return items.sort((a, b) => a.index - b.index);
};

const generalFaqItems = ${match[1]};
`;
    
    fs.writeFileSync(balancesFilePath, newContent, 'utf8');
    console.log('  - Updated getBalancesFaqItems.ts with chain-aware imports and logic');
  } else {
    console.log('  - Warning: Could not extract items from getBalancesFaqItems.ts');
  }
}

// Update getSavingsFaqItems.ts
if (fs.existsSync(savingsFilePath)) {
  console.log('Updating getSavingsFaqItems.ts with chain-aware logic...');
  
  // Read the current file
  const content = fs.readFileSync(savingsFilePath, 'utf8');
  
  // Extract the items array
  const match = content.match(/const items = (\[[\s\S]*?\]);[\s\S]*?return items/);
  
  if (match && match[1] && l2SavingsContent) {
    // Create the new chain-aware version using the extracted L2SavingsFaqItems
    const newContent = `import {
  isArbitrumChainId,
  isBaseChainId,
  isL2ChainId,
  isOptimismChainId,
  isUnichainChainId
} from '@jetstreamgg/sky-utils';

import {
  L2GeneralFaqItems,
  arbitrumFaqItems,
  baseFaqItems,
  optimismFaqItems,
  unichainFaqItems
} from './sharedFaqItems';

export const getSavingsFaqItems = (chainId: number) => {
  const items = [
    ...generalFaqItems,
    ...L2GeneralFaqItems,
    ...(isBaseChainId(chainId) ? baseFaqItems : []),
    ...(isArbitrumChainId(chainId) ? arbitrumFaqItems : []),
    ...(isOptimismChainId(chainId) ? optimismFaqItems : []),
    ...(isUnichainChainId(chainId) ? unichainFaqItems : []),
    ...(isL2ChainId(chainId) ? L2SavingsFaqItems : [])
  ];
  return items.sort((a, b) => a.index - b.index);
};

const generalFaqItems = ${match[1]};

const L2SavingsFaqItems = ${l2SavingsContent};
`;
    
    fs.writeFileSync(savingsFilePath, newContent, 'utf8');
    console.log('  - Updated getSavingsFaqItems.ts with chain-aware imports and logic');
  } else {
    console.log('  - Warning: Could not extract items from getSavingsFaqItems.ts or L2SavingsFaqItems');
  }
}

// Update getTradeFaqItems.ts
if (fs.existsSync(tradeFilePath)) {
  console.log('Updating getTradeFaqItems.ts with chain-aware logic...');
  
  // Read the current file
  const content = fs.readFileSync(tradeFilePath, 'utf8');
  
  // Extract the items array
  const match = content.match(/const items = (\[[\s\S]*?\]);[\s\S]*?return items/);
  
  if (match && match[1]) {
    // Create the new chain-aware version
    const newContent = `import {
  isArbitrumChainId,
  isBaseChainId,
  isOptimismChainId,
  isUnichainChainId
} from '@jetstreamgg/sky-utils';

import {
  L2GeneralFaqItems,
  arbitrumFaqItems,
  baseFaqItems,
  optimismFaqItems,
  unichainFaqItems
} from './sharedFaqItems';

export const getTradeFaqItems = (chainId: number) => {
  const items = [
    ...generalFaqItems,
    ...L2GeneralFaqItems,
    ...(isBaseChainId(chainId) ? baseFaqItems : []),
    ...(isArbitrumChainId(chainId) ? arbitrumFaqItems : []),
    ...(isOptimismChainId(chainId) ? optimismFaqItems : []),
    ...(isUnichainChainId(chainId) ? unichainFaqItems : [])
  ];
  return items.sort((a, b) => a.index - b.index);
};

const generalFaqItems = ${match[1]};
`;
    
    fs.writeFileSync(tradeFilePath, newContent, 'utf8');
    console.log('  - Updated getTradeFaqItems.ts with chain-aware imports and logic');
  } else {
    console.log('  - Warning: Could not extract items from getTradeFaqItems.ts');
  }
}

// Clean up this script
fs.unlinkSync(__filename);
EOF

# Run the processing script
if [ -f "$DESTINATION_PATH/.process-shared-items.cjs" ]; then
    node "$DESTINATION_PATH/.process-shared-items.cjs"
fi

# Clean up temp directory
print_status "Cleaning up temporary files..."
rm -rf "$TEMP_DIR"

print_status "Content sync completed successfully!"

# List the synced files
echo ""
print_status "Synced files:"
find "$DESTINATION_PATH" -type f -name "*.json" -o -name "*.md" -o -name "*.ts" | sort | while read file; do
    echo "  - $file"
done