const fs = require('fs');
const path = require('path');

const globalJsonPath = path.join(__dirname, 'src', 'data', 'globalLoungesData.json');
const domesticJsonPath = path.join(__dirname, 'src', 'data', 'loungesData.json');

const globalJson = JSON.parse(fs.readFileSync(globalJsonPath, 'utf8'));
const domesticJsonFull = JSON.parse(fs.readFileSync(domesticJsonPath, 'utf8'));
const domesticJson = domesticJsonFull.LOUNGE_GUIDES;

const allLounges = [...globalJson, ...domesticJson];

const loungesWithImages = allLounges.filter(l => l.images && l.images.length > 0);

let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lounge Images Test View</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f7f6;
            margin: 0;
            padding: 20px;
        }
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 40px;
        }
        .grid-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            max-width: 1400px;
            margin: 0 auto;
        }
        .lounge-card {
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        .lounge-title {
            font-size: 1.2rem;
            font-weight: bold;
            color: #1a202c;
            margin: 0;
            padding-bottom: 10px;
            border-bottom: 1px solid #edf2f7;
        }
        .lounge-details {
            font-size: 0.9rem;
            color: #718096;
            margin-bottom: 10px;
        }
        .images-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .image-row {
            display: flex;
            gap: 10px;
        }
        .image-wrapper {
            flex: 1;
            aspect-ratio: 4/3;
            border-radius: 8px;
            overflow: hidden;
            background: #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #a0aec0;
            font-size: 0.9rem;
        }
        .image-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        @media (max-width: 1024px) {
            .grid-container {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        @media (max-width: 768px) {
            .grid-container {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <h1>Lounge Images Test View (${loungesWithImages.length} Lounges)</h1>
    <div class="grid-container">
`;

loungesWithImages.forEach(lounge => {
    const img1 = lounge.images[0] || '';
    const img2 = lounge.images[1] || '';
    const img3 = lounge.images[2] || '';
    
    htmlContent += '        <div class="lounge-card">\n';
    htmlContent += '            <div class="lounge-title">' + lounge.outletName + '</div>\n';
    htmlContent += '            <div class="lounge-details">' + lounge.city + ', ' + (lounge.airportCode || 'Railway') + '</div>\n';
    htmlContent += '            <div class="images-container">\n';
    
    htmlContent += '                <div class="image-row">\n';
    htmlContent += '                    <div class="image-wrapper">\n';
    htmlContent += img1 ? '                        <img src="' + img1 + '" loading="lazy" alt="Image 1">' : '<span>No Img 1</span>';
    htmlContent += '                    </div>\n';
    htmlContent += '                </div>\n';
    
    htmlContent += '                <div class="image-row">\n';
    htmlContent += '                    <div class="image-wrapper">\n';
    htmlContent += img2 ? '                        <img src="' + img2 + '" loading="lazy" alt="Image 2">' : '<span>No Img 2</span>';
    htmlContent += '                    </div>\n';
    htmlContent += '                    <div class="image-wrapper">\n';
    htmlContent += img3 ? '                        <img src="' + img3 + '" loading="lazy" alt="Image 3">' : '<span>No Img 3</span>';
    htmlContent += '                    </div>\n';
    htmlContent += '                </div>\n';
    
    htmlContent += '            </div>\n';
    htmlContent += '        </div>\n';
});

htmlContent += `
    </div>
</body>
</html>
`;

const outputPath = path.join(__dirname, 'public', 'test_lounges.html');
fs.writeFileSync(outputPath, htmlContent);

console.log('Successfully generated test view at public/test_lounges.html');
