const sortBy = require('ramda/src/sortBy');

import { euclidDist, getCreepsForRole } from './utils';

export function runUpgraderTick(creep: Creep) {
  let upgrading = (creep.memory as any).upgrading;

  if (creep.store[RESOURCE_ENERGY] === 0 && upgrading) upgrading = (creep.memory as any).upgrading = false;

  if (creep.store[RESOURCE_ENERGY] < 50 && !upgrading) {
    let sources = creep.room.find(FIND_SOURCES);
    sources = sortBy((roomObj: RoomObject) => euclidDist(creep, roomObj), sources);
    if (sources.length > 0 && creep.harvest(sources[0]) === ERR_NOT_IN_RANGE)
      creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
  } else if (creep.store[RESOURCE_ENERGY] === 50 && !upgrading) upgrading = (creep.memory as any).upgrading = true;

  if (upgrading && creep.room.controller && creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE)
    creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
}

export function runUpgraders() {
  const upgraderCreeps = getCreepsForRole('upgrader');

  for (const upgrader of upgraderCreeps) {
    runUpgraderTick(upgrader);
  }
}

export function spawnUpgrader() {
  const creepName = `Upgrader-${Game.time}`;
  Game.spawns['Spawn1'].spawnCreep([CARRY, MOVE, WORK], creepName, { memory: { role: 'upgrader' } });
  return creepName;
}
