const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const localesDir = path.join(srcDir, 'locales');
const partialsDir = path.join(srcDir, 'partials');
const templatePath = path.join(srcDir, 'template.html');
const roadmapTemplatePath = path.join(srcDir, 'roadmap-template.html');

console.log('Generating sites...');

// Register partials
const partialFiles = fs.readdirSync(partialsDir).filter(f => f.endsWith('.html'));
partialFiles.forEach(file => {
  const name = path.basename(file, '.html');
  const content = fs.readFileSync(path.join(partialsDir, file), 'utf8');
  Handlebars.registerPartial(name, content);
});

// Register helpers
Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});

Handlebars.registerHelper('neq', function (a, b) {
  return a !== b;
});

const mainTemplate = Handlebars.compile(fs.readFileSync(templatePath, 'utf8'));
const roadmapTemplate = Handlebars.compile(fs.readFileSync(roadmapTemplatePath, 'utf8'));

const languages = [
  { code: 'fr', isDefault: true },
  { code: 'en', isDefault: false }
];

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

languages.forEach(lang => {
  const content = JSON.parse(fs.readFileSync(path.join(localesDir, `${lang.code}.json`), 'utf8'));

  const relativePrefix = lang.isDefault ? './' : '../';

  const context = {
    ...content,
    currentLang: lang.code,
    frUrl: lang.code === 'fr' ? '#' : '../',
    enUrl: lang.code === 'en' ? '#' : (lang.isDefault ? 'en/' : '../en/'),
    relativePrefix,
    roadmapUrl: lang.isDefault ? 'roadmap/' : (lang.code === 'en' ? 'roadmap/' : '../en/roadmap/'),
  };

  // Generate main page
  const mainHtml = mainTemplate(context);
  let mainOutputPath;
  if (lang.isDefault) {
    mainOutputPath = path.join(__dirname, '../index.html');
  } else {
    const langDir = path.join(__dirname, `../${lang.code}`);
    ensureDir(langDir);
    mainOutputPath = path.join(langDir, 'index.html');
  }
  fs.writeFileSync(mainOutputPath, mainHtml);
  console.log(`Generated ${lang.code} main page at ${mainOutputPath}`);

  // Generate roadmap page
  const roadmapContext = {
    ...context,
    frUrl: lang.code === 'fr' ? '#' : '../../roadmap/',
    enUrl: lang.code === 'en' ? '#' : '../en/roadmap/',
    relativePrefix: lang.isDefault ? '../' : '../../',
    roadmapUrl: '#',
  };

  const roadmapHtml = roadmapTemplate(roadmapContext);
  let roadmapDir;
  if (lang.isDefault) {
    roadmapDir = path.join(__dirname, '../roadmap');
  } else {
    roadmapDir = path.join(__dirname, `../${lang.code}/roadmap`);
  }
  ensureDir(roadmapDir);
  const roadmapOutputPath = path.join(roadmapDir, 'index.html');
  fs.writeFileSync(roadmapOutputPath, roadmapHtml);
  console.log(`Generated ${lang.code} roadmap page at ${roadmapOutputPath}`);
});

console.log('Done.');
