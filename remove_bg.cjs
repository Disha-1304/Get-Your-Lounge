const Jimp = require('jimp');

async function removeBg(inputPath, outputPath) {
    try {
        const image = await Jimp.read(inputPath);
        
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
            // Get RGBA values
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];
            
            // The image has a beige background and dark brown line art.
            // Beige background is roughly (242, 233, 208) to lighter shades.
            // Dark brown is roughly (80, 40, 20).
            
            // Calculate a simple luminosity (lightness)
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            
            // If the pixel is very light (luminosity > 200), we make it transparent.
            // Otherwise, we keep it and can even boost opacity.
            // We can map luminosity to alpha for a smooth anti-aliased edge.
            
            // Let's create a smooth threshold
            const maxDark = 150; // pixels darker than this are fully opaque
            const minLight = 210; // pixels lighter than this are fully transparent
            
            let alpha = 255;
            if (lum > minLight) {
                alpha = 0;
            } else if (lum > maxDark) {
                // smooth transition
                alpha = Math.floor(255 * (1 - (lum - maxDark) / (minLight - maxDark)));
            }
            
            this.bitmap.data[idx + 3] = alpha;
            
            // Optional: If we want to make the line art uniformly dark brown, we can override RGB
            if (alpha > 0) {
                // E.g., make it a clean dark brown or just keep original
                // The user's image is a nice dark brown, so original is fine.
            }
        });
        
        await image.writeAsync(outputPath);
        console.log('Background removed successfully and saved to ' + outputPath);
    } catch (err) {
        console.error('Error processing image:', err);
    }
}

// The path to the user's uploaded file
const inputPath = 'C:\\Users\\rhyth\\.gemini\\antigravity-ide\\brain\\38c353c9-6fae-452b-8177-6904efc78eef\\media__1784372351958.png';
const outputPath = 'public\\new-logo.png';

removeBg(inputPath, outputPath);
