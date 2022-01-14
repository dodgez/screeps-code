import { runHarvesters, spawnHarvester } from './harvester';
import { runUpgraders, spawnUpgrader } from './upgrader';
import { cleanUpMemory, getCreepsForRole, logStats } from './utils';

export function loop() {
  const harvesterCreeps = getCreepsForRole('harvester');
  const upgraderCreeps = getCreepsForRole('upgrader');

  if (harvesterCreeps.length === 0) {
    spawnHarvester();
  } else if (upgraderCreeps.length < 2) {
    spawnUpgrader();
  }

  runHarvesters();
  runUpgraders();

  logStats();
  cleanUpMemory();
}
