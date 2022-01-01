import { readFileSync } from 'fs';
import { ScreepsAPI } from 'screeps-api';

(async function() {
  const api = await ScreepsAPI.fromConfig('main');

  console.log(await api.code.set('default', {
    main: readFileSync('./dist/main.js').toString(),
  }, undefined));
})()
