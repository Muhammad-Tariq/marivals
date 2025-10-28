// Debug script to show actual data counts
const agents = require('./data/agents.json');
const maps = require('./data/maps.json');
const weapons = require('./data/weapons.json');

console.log('🎮 MARVEL RIVALS HUB - DATA SUMMARY');
console.log('=====================================');

console.log('\n📊 MAIN STATS:');
console.log(`Total Agents: ${agents.length}`);
console.log(`Total Maps: ${maps.length}`);
console.log(`Total Weapons: ${weapons.length}`);
console.log(`Total Guides: 4 (from content.ts)`);

console.log('\n🦸 AGENTS BY ROLE:');
const agentsByRole = agents.reduce((acc, agent) => {
  acc[agent.role] = (acc[agent.role] || 0) + 1;
  return acc;
}, {});
Object.entries(agentsByRole).forEach(([role, count]) => {
  console.log(`${role}: ${count}`);
});

console.log('\n🗺️ MAPS BY MODE:');
const mapsByMode = maps.reduce((acc, map) => {
  if (map.modes && map.modes.length > 0) {
    map.modes.forEach(mode => {
      acc[mode] = (acc[mode] || 0) + 1;
    });
  } else {
    acc['Unknown'] = (acc['Unknown'] || 0) + 1;
  }
  return acc;
}, {});
Object.entries(mapsByMode).forEach(([mode, count]) => {
  console.log(`${mode}: ${count}`);
});

console.log('\n⚔️ WEAPONS BY TYPE:');
const weaponsByType = weapons.reduce((acc, weapon) => {
  acc[weapon.type] = (acc[weapon.type] || 0) + 1;
  return acc;
}, {});
Object.entries(weaponsByType).forEach(([type, count]) => {
  console.log(`${type}: ${count}`);
});

console.log('\n🎯 SAMPLE DATA:');
console.log('First 3 Agents:', agents.slice(0, 3).map(a => `${a.name} (${a.role})`));
console.log('First 3 Maps:', maps.slice(0, 3).map(m => `${m.name} (${m.modes ? m.modes.join(', ') : 'No modes'})`));
console.log('All Weapons:', weapons.map(w => `${w.name} (${w.type}) - ${w.agent}`));

console.log('\n✅ Data loading should work correctly now!');