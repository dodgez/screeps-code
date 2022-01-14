export function cleanUpMemory() {
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
}

export function euclidDist(roomObj1: RoomObject, roomObj2: RoomObject) {
  return (roomObj1.pos.x - roomObj2.pos.x) ** 2 + (roomObj1.pos.y - roomObj2.pos.y) ** 2;
}

export function getCreepsForRole(role: string): any[] {
  return Object.keys(Game.creeps).map((creepName: string) => Game.creeps[creepName]).filter((creepInfo: Creep) => (creepInfo.memory as any).role === role);
}

export function logStats() {
  let populationStats: Record<string, number> = {};
  Object.keys(Game.creeps).forEach((creepName: string) => {
    const creepRole = (Game.creeps[creepName].memory as any).role || 'unassigned';
    if (!populationStats[creepRole]) populationStats[creepRole] = 0;
    populationStats[creepRole] += 1;
  });

  if (Game.time % 10 === 0) console.log(`Game tick ${Game.time}. Population stats: ${JSON.stringify(populationStats)}`);
}
