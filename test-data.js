// Quick test to verify data loading
const agents = require('./data/agents.json');
const maps = require('./data/maps.json');
const weapons = require('./data/weapons.json');

console.log('=== DATA SUMMARY ===');
console.log('Total Agents:', agents.length);
console.log('Total Maps:', maps.length);
console.log('Total Weapons:', weapons.length);

console.log('\n=== FIRST FEW AGENTS ===');
agents.slice(0, 8).forEach((agent, i) => {
  console.log(`${i + 1}. ${agent.name} (${agent.role})`);
});

console.log('\n=== ALL MAPS ===');
maps.forEach((map, i) => {
  console.log(`${i + 1}. ${map.name} (${map.mode})`);
});

console.log('\n=== ALL WEAPONS ===');
weapons.forEach((weapon, i) => {
  console.log(`${i + 1}. ${weapon.name} (${weapon.type}) - ${weapon.agent}`);
});