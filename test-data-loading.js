// Test data loading functions
console.log('🧪 TESTING DATA LOADING FUNCTIONS');
console.log('==================================');

// Test direct JSON loading
const agents = require('./data/agents.json');
const maps = require('./data/maps.json');
const weapons = require('./data/weapons.json');

console.log('\n📊 Direct JSON Loading:');
console.log(`Agents: ${agents.length}`);
console.log(`Maps: ${maps.length}`);
console.log(`Weapons: ${weapons.length}`);
console.log(`Guides: 4 (hardcoded in content.ts)`);

// Test role distribution
const agentsByRole = agents.reduce((acc, agent) => {
  acc[agent.role] = (acc[agent.role] || 0) + 1;
  return acc;
}, {});

console.log('\n🦸 Agents by Role:');
Object.entries(agentsByRole).forEach(([role, count]) => {
  console.log(`${role}: ${count}`);
});

// Test map mode distribution
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

console.log('\n🗺️ Maps by Mode:');
Object.entries(mapsByMode).forEach(([mode, count]) => {
  console.log(`${mode}: ${count}`);
});

console.log('\n✅ Expected Stats Display:');
console.log('Total Agents: 44 (red)');
console.log('Maps Available: 14 (blue)');
console.log('Weapons: 3 (green)');
console.log('Guides: 4 (purple)');

console.log('\n🎯 The home page should now show these correct values!');
console.log('If you still see zeros, check the browser console for errors.');