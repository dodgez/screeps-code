const sortBy = require('ramda/src/sortBy');

import { runUpgraderTick } from './upgrader';
import { euclidDist, getCreepsForRole } from './utils';

export function runHarvesters() {
  const harvesterCreeps = getCreepsForRole('harvester');

  for (const harvester of harvesterCreeps) {
    if (harvester.store.getFreeCapacity() > 0) {
      let sources = harvester.room.find(FIND_SOURCES);
      sources = sortBy((roomObj: RoomObject) => euclidDist(harvester, roomObj), sources);
      if (sources.length > 0 && harvester.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        harvester.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    } else {
      const targets = harvester.room.find(FIND_STRUCTURES, {
        filter: (structure: any) => structure.structureType === STRUCTURE_SPAWN && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
      });
      if (targets.length > 0) {
        if (harvester.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          harvester.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
      } else {
        runUpgraderTick(harvester);
      }
    }
  }
}

export function spawnHarvester() {
  const creepName = `Harvester-${Game.time}`;
  Game.spawns['Spawn1'].spawnCreep([CARRY, MOVE, WORK], creepName, { memory: { role: 'harvester' } });
  return creepName;
}
