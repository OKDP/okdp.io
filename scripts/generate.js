const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const localesDir = path.join(srcDir, 'locales');
const templatePath = path.join(srcDir, 'template.html');

console.log('Generating sites...');

const templateSource = fs.readFileSync(templatePath, 'utf8');
const template = Handlebars.compile(templateSource);

const languages = [
  { code: 'fr', isDefault: true },
  { code: 'en', isDefault: false }
];

languages.forEach(lang => {
  const content = JSON.parse(fs.readFileSync(path.join(localesDir, `${lang.code}.json`), 'utf8'));
  
  // Add metadata for language switching and paths
  const context = {
    ...content,
    lang: lang.code,
    relativePrefix: lang.isDefault ? './' : '../',
    otherLangUrl: lang.isDefault ? '/en/' : '/',
    otherLangLabel: lang.isDefault ? 'EN' : 'FR'
  };
  
  const html = template(context);
  
  let outputPath;
  if (lang.isDefault) {
    outputPath = path.join(__dirname, '../index.html');
  } else {
    // Ensure 'en' directory exists
    const langDir = path.join(__dirname, `../${lang.code}`);
    if (!fs.existsSync(langDir)) {
      fs.mkdirSync(langDir);
    }
    outputPath = path.join(langDir, 'index.html');
  }
  
  fs.writeFileSync(outputPath, html);
  console.log(`Generated ${lang.code} site at ${outputPath}`);
});

console.log('Done.');
