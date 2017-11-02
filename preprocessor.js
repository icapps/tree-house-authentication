const tsc = require('typescript');

const compilerOptions = require('./tsconfig.json').compilerOptions;
compilerOptions.target = "ES6";

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts') || path.endsWith('.tsx')) {
      return tsc.transpile(
        src,
        compilerOptions,
        path,
        []
      );
    }
    return src;
  },
};
