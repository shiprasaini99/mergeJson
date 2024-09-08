const path = require('path');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  plugins: [
    new MergeIntoSingleFilePlugin({
      files: {
        'merged.json': ['src/file1.json', 'src/file2.json', 'src/file3.json'],
      },
      transform: {
        'merged.json': () => {
          const file1 = require('./src/file1.json');
          const file2 = require('./src/file2.json');
          const file3 = require('./src/file3.json');
          
          const combined = {
            file1: file1,
            file2: file2,
            file3: file3
          };
          
          return JSON.stringify(combined, null, 2);
        }
      }
    })
  ]
};