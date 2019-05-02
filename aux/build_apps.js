/**
 * Builds appLauncher2 apps for each song from the definitions in songs/data.json
 */
const fs = require('fs');
const songData = require('../songs/data.json');

const outDir = `${__dirname}/../applauncher/apps`;

songData.sequences.forEach((sequence) => {
  const appName = sequence.id.toLowerCase();
  const appDef = {
    id: appName,
    version: '1.0.0',
    main: `../common/index.html?song=${sequence.id}`,
    name: sequence.title,
    description: sequence.description,
  };
  const dir = `${outDir}/${appName}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const json = JSON.stringify(appDef);
  fs.writeFileSync(`${dir}/app.json`, json, (err) => {
    console.error(err);
  });
});
