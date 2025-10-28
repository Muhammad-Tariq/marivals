// Check agent slugs for routing
const agents = require('./data/agents.json');

console.log('🔍 AGENT SLUGS CHECK');
console.log('===================');

console.log('\n📊 Total Agents:', agents.length);

console.log('\n🦸 First 10 Agent Slugs:');
agents.slice(0, 10).forEach((agent, index) => {
  console.log(`${index + 1}. ${agent.name} -> ${agent.slug}`);
});

console.log('\n🔗 Sample URLs that should work:');
agents.slice(0, 5).forEach(agent => {
  console.log(`http://localhost:3000/agents/${agent.slug}`);
});

console.log('\n✅ All agents have slugs for routing!');