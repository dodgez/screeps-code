import { runHarvesters, spawnHarvester } from './harvester';
import { cleanUpMemory, getCreepsForRole, logStats } from './utils';

export function loop() {
  const harvesterCreeps = getCreepsForRole('harvester');

  if (harvesterCreeps.length == 0) {
    spawnHarvester();
  }

  runHarvesters();

  logStats();
  cleanUpMemory();
}
