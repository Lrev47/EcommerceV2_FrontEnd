/**
 * Script to strip functionality from React components
 * This is an ES module script that can be run with:
 * node strip-functionality.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to process
const directories = [
  'src/pages',
  'src/components',
  'src/redux/slices'
];

// Extensions to process
const extensions = ['.jsx', '.js'];

// Define transformations for different types of files
const transformations = {
  // For React component files
  component: (content) => {
    // Remove Redux imports
    content = content.replace(
      /import\s+{[^}]*useSelector[^}]*,?\s*useDispatch[^}]*}\s+from\s+['"]react-redux['"];?/g,
      '// Redux imports removed'
    );
    
    // Replace useSelector and useDispatch hooks with dummy values
    content = content.replace(
      /const\s+{\s*[^}]+\s*}\s*=\s*useSelector\(\s*(?:state|\(state\))\s*=>\s*state\.[^)]+\);/g,
      '// useSelector hook removed - using placeholder values'
    );
    
    content = content.replace(
      /const\s+dispatch\s*=\s*useDispatch\(\);/g,
      '// const dispatch = useDispatch(); - removed'
    );
    
    // Replace Redux action dispatches with console logs - better handling of nested objects
    content = content.replace(
      /dispatch\(([^)]+)\)/g,
      function(match, p1) {
        // For nested objects that might contain multiple lines, use a simpler approach
        if (p1.includes('{') && p1.includes('}')) {
          return `console.log("Would dispatch action:", "${p1.split('(')[0]}");`;
        }
        return `console.log("Would dispatch: ${p1}");`;
      }
    );
    
    // Simplify useEffect hooks
    content = content.replace(
      /useEffect\(\s*\(\)\s*=>\s*{[\s\S]*?}\s*,\s*\[[^\]]*\]\s*\);/g,
      '// useEffect removed'
    );
    
    // Replace async/await API calls with console logs
    content = content.replace(
      /const\s+(\w+)\s*=\s*await\s+[a-zA-Z0-9_]+Api\.[a-zA-Z0-9_]+\([^)]*\)/g,
      'const $1 = { success: true, data: "Mock API response" }; console.log("API call would happen here");'
    );
    
    // Handle standalone awaits
    content = content.replace(
      /await\s+[a-zA-Z0-9_]+Api\.[a-zA-Z0-9_]+\([^)]*\)/g,
      '{ success: true, data: "Mock API response" }; console.log("API call would happen here");'
    );
    
    // Remove async from function declarations
    content = content.replace(
      /async\s+(\([^)]*\)\s*=>)/g,
      '$1'
    );
    
    // Add console logs for event handlers
    content = content.replace(
      /(const|function)\s+handle([A-Z][a-zA-Z0-9_]*)\s*=\s*(?:\([^)]*\)|async\s*\([^)]*\))\s*=>\s*{/g,
      '$1 handle$2 = $3 => {\n    console.log("$2 handler called with:", arguments[0]);'
    );
    
    return content;
  },
  
  // For Redux slice files
  slice: (content) => {
    // Replace createAsyncThunk with regular functions
    content = content.replace(
      /export\s+const\s+([a-zA-Z0-9_]+)\s*=\s*createAsyncThunk\([^{]+{[\s\S]*?}\s*\);/g,
      'export const $1 = (arg) => async (dispatch) => {\n  console.log("$1 called with:", arg);\n  dispatch(setLoading(true));\n  // Mock implementation here\n  dispatch(setLoading(false));\n};'
    );
    
    // Simplify reducers
    content = content.replace(
      /extraReducers:\s*\(builder\)\s*=>\s*{[\s\S]*?},/g,
      'extraReducers: {},\n'
    );
    
    return content;
  },
  
  // For API files
  api: (content) => {
    // Replace actual API calls with mock implementations
    content = content.replace(
      /(return\s+)axiosClient\.[a-z]+\([^)]+\);/g,
      '$1Promise.resolve({ success: true, message: "Mock API response" });'
    );
    
    return content;
  }
};

// Function to process a file
function processFile(filePath) {
  console.log(`Processing ${filePath}`);
  
  const ext = path.extname(filePath);
  if (!extensions.includes(ext)) {
    console.log(`Skipping non-matching extension: ${ext}`);
    return;
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);
    
    // Determine which transformation to apply
    if (fileName.includes('Slice')) {
      content = transformations.slice(content);
    } else if (filePath.includes('/api/')) {
      content = transformations.api(content);
    } else {
      content = transformations.component(content);
    }
    
    // Write the transformed content back
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully processed ${filePath}`);
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

// Function to walk a directory recursively
function walkDir(dir) {
  const resolvedDir = path.resolve(__dirname, dir);
  console.log(`Walking directory: ${resolvedDir}`);
  
  try {
    const files = fs.readdirSync(resolvedDir);
    
    files.forEach(file => {
      const filePath = path.join(resolvedDir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath); // Recursively process subdirectories
      } else {
        processFile(filePath);
      }
    });
  } catch (error) {
    console.error(`Error accessing directory ${resolvedDir}:`, error);
  }
}

// Process all directories
directories.forEach(dir => {
  console.log(`Processing directory: ${dir}`);
  try {
    walkDir(dir);
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error);
  }
});

console.log('Processing complete!'); 