require('babel-core/register');
['.css', '.less', '.sass', '.ttf', '.woff'].forEach((ext) => require.extensions[ext] = () => {});
require('babel-polyfill');
require('./src/server');