const fs = require('fs');
const path = require('path');

const directory = 'c:/project/updated lounge pari final';

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        if (file === 'node_modules' || file === '.git' || file === 'dist' || file === '.gemini') return;
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walkDir(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const files = walkDir(directory);

let replacedCount = 0;

files.forEach(file => {
    // Only process text files like .js, .jsx, .json, .html, .svg, .md
    if (file.match(/\.(js|jsx|json|html|svg|md)$/)) {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;
        
        // Case sensitive replacements to preserve casing
        content = content.replace(/Get Your Lounge/g, 'Get Your Lounge');
        content = content.replace(/GET YOUR LOUNGE/g, 'GET YOUR LOUNGE');
        content = content.replace(/GET YOUR/g, 'GET YOUR'); // For AppLogo.jsx
        
        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Replaced in ${file}`);
            replacedCount++;
        }
    }
});

console.log(`Done. Modified ${replacedCount} files.`);
