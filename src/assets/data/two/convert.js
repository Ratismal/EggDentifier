const fs = require('fs');

const file = fs.readFileSync('./colors.txt', { encoding: 'utf8' });

const lines = file.split(/\r?\n/);

const colors = {};

for (const line of lines) {
  const parts = line.split(',');

  const words = parts[0].split(' ');
  words[0] = words[0].toLowerCase();
  const key = words.join('');

  colors[key] = {
    name: parts[0],
    value: '#' + parts[1]
  }
}

fs.writeFileSync('./colors.json', JSON.stringify(colors, null, 2));