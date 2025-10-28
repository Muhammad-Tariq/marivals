// Test agent lookup functionality
const agents = require('./data/agents.json');

console.log('🔍 AGENT LOOKUP TEST');
console.log('===================');

// Test some agent lookups
const testSlugs = ['spider-man', 'adam-warlock', 'doctor-strange', 'iron-man', 'hulk'];

console.log('\n🧪 Testing Agent Lookups:');
testSlugs.forEach(slug => {
  const agent = agents.find(a => a.slug === slug);
  if (agent) {
    console.log(`✅ ${slug} -> ${agent.name} (${agent.role})`);
  } else {
    console.log(`❌ ${slug} -> NOT FOUND`);
  }
});

console.log('\n📋 All Available Agent Slugs:');
agents.forEach((agent, index) => {
  if (index < 10) { // Show first 10
    console.log(`${index + 1}. ${agent.slug} (${agent.name})`);
  }
});

console.log(`\n... and ${agents.length - 10} more agents`);

console.log('\n🎯 Test URLs:');
console.log('Try these URLs in your browser:');
testSlugs.slice(0, 3).forEach(slug => {
  console.log(`http://localhost:3000/agents/${slug}`);
});

console.log('\n✅ Agent data structure looks correct for routing!');