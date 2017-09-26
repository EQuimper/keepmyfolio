// @flow

import { cp, exec, exit, rm } from 'shelljs';

function failExec(cmd, opts) {
  if (exec(cmd, opts).code !== 0) {
    exit(1);
  }
}

const stage = (process.argv[2] === '--stage' && process.argv[3]) || 'staging';

failExec('yarn run build:clean');
failExec('yarn run build');

cp('./package.json', 'dist/package.json');
cp('./yarn.lock', 'dist/yarn.lock');

failExec('yarn install --production', { cwd: './dist' });

rm('-f', './keepmyfolio-api.zip');
failExec('zip -q -r ../keepmyfolio-api.zip *', { cwd: './dist' });

failExec(`yarn run sls:deploy --stage ${stage}`);
