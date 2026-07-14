# Lounge Images Package & Integration Guide

This folder contains a pre-compiled image mapping file `globalLoungesImages.json` for the 1,018 lounges listed in the `B2B price june 26.xlsx` spreadsheet (Global Lounge sheet). 

Share this folder with the team so their **Antigravity AI** can instantly integrate it into their copy of the website.

---

## 🤖 Prompt for Antigravity AI
Copy and paste the prompt below directly into the Antigravity chat:

```text
Hi Antigravity! I have an image assets package for our global lounges. In the 'lounge_image_package' folder, there is a file named 'globalLoungesImages.json' which maps 1,018 unique lounge Outlet IDs (from the Excel sheet) to high-quality, country-accurate lounge images.

Please do the following:
1. Locate where we load or display our global lounges data in our codebase.
2. Load the 'globalLoungesImages.json' mapping file.
3. Update the lounge list rendering code (PHP or JavaScript) to dynamically look up the lounge's 'Outlet ID' in this JSON file.
4. Set the lounge card's thumbnail image (src) to the 'image' field and the main preview image to the 'heroImage' field. Use a suitable default fallback image if the ID is missing.
5. Verify that the cards now render with their country-appropriate premium images.
```

---

## 🛠️ Code Examples for Developers

### 1. In PHP (Server-Side)
If the lounges are parsed or rendered via PHP:
```php
// Load mapping once
$imagesJson = file_get_contents(__DIR__ . '/globalLoungesImages.json');
$loungeImages = json_decode($imagesJson, true);

// During loop iteration
$outletId = $lounge['outletId']; // Or whichever variable holds the Outlet ID
$imageSrc = isset($loungeImages[$outletId]) ? $loungeImages[$outletId]['image'] : 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=85';
$heroSrc = isset($loungeImages[$outletId]) ? $loungeImages[$outletId]['heroImage'] : $imageSrc;
```

### 2. In JavaScript (Client-Side)
If you render lounges dynamically in the frontend:
```javascript
// Fetch mapping file
fetch('/lounge_image_package/globalLoungesImages.json')
  .then(res => res.json())
  .then(imageMap => {
    // When rendering a card
    const imageInfo = imageMap[lounge.outletId] || {
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=85",
      heroImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=85"
    };
    
    // Assign to DOM elements
    cardImgElement.src = imageInfo.image;
  });
```
