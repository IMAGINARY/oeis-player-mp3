/**
 * Builds appLauncher2 apps definitions (app.json) for each song from the song database
 * in applauncher/apps/common/data.json
 */
const fs = require('fs');
const songData = require(`${__dirname}/../applauncher/apps/oeis/common/data.json`);

const outDir = `${__dirname}/../applauncher/apps/oeis`;

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
