// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';

export default {
  name: "ludumdare",
  input: 'lib/es6/src/index.js',
  output: {
    file: 'bundle.js',
    format: 'iife'
  },
  plugins: [ resolve() ]
};
