const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

test('Progress Logic - Stats Page', async (t) => {
  const scriptPath = path.join(process.cwd(), 'public', 'script.js');
  const scriptContent = fs.readFileSync(scriptPath, 'utf8');
  
  // Mock environment
  const dom = {
    elements: {
      'progress-text': { innerText: '' },
      'progress-bar': null
    },
    getElementById(id) {
      return this.elements[id];
    },
    addEventListener: () => {}
  };
  
  const context = vm.createContext({
    document: dom,
    console: console
  });
  
  vm.runInContext(scriptContent, context);
  const updateOverallProgress = context.updateOverallProgress;

  await t.test('updates text even if bar is missing', () => {
    const projects = [
        { status: 'Done' },
        { status: 'Failed' },
        { status: 'Skipped' },
        { status: 'Not Started' }
    ];
    // 3 out of 52
    updateOverallProgress(projects);
    
    // In the CURRENT implementation (with the bug), this will be empty string
    // because the 'if (progressBar && progressText)' block is skipped.
    assert.strictEqual(dom.elements['progress-text'].innerText, '3/52 completed');
  });
});
