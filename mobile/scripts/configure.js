// @flow
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

const environment = process.argv[2];
if (!environment) {
  console.error('Missing environment parameter');
	process.exit(1);
}

const configPath = path.join(__dirname, '..', 'configs', `${environment}.js`);

if (!fs.existsSync(configPath)) {
  console.error(`Invalid environment '${environment}'`);
	process.exit(1);
}

const config = fs.readFileSync(configPath);
fs.writeFileSync(path.join(__dirname, '..', 'src', 'config.js'), config);
