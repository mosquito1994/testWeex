// Helper functions
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const root = (pre, args) => {
  return path.join(ROOT, 'src', pre, args || "");
}
const rootNode = (pre, args) => {
  return path.join(ROOT, pre, args || "");
}

const resolve = (pre, dir) => {
  return path.join(__dirname, '..', pre, dir || "")
}

module.exports = {
  root,
  rootNode,
  resolve
}