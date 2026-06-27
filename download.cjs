const fs = require('fs');
const path = require('path');

const files = [
  'acharya-photo.jpeg',
  'favicon-logo.png',
  'horizontal-logo.PNG',
  'primary-logo.PNG',
  'qr-code.jpeg',
  'symbol-only.PNG'
];

const baseUrl = 'https://raw.githubusercontent.com/VishweshawaraM/VishweshwaraSanskrit/main/public/';

async function downloadFiles() {
  if (!fs.existsSync('./public')) {
    fs.mkdirSync('./public');
  }

  for (const file of files) {
    try {
      console.log('Downloading ' + file);
      const res = await fetch(baseUrl + file);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = await res.arrayBuffer();
      // save with lower case extension
      fs.writeFileSync(path.join('./public', file.toLowerCase()), Buffer.from(buffer));
      console.log('Saved ' + file);
    } catch (e) {
      console.error('Failed ' + file + ': ' + e.message);
    }
  }
}

downloadFiles();
