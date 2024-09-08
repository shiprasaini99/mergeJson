const path = require('path');
const fs = require('fs');

// Custom plugin to combine JSON files in the specified format
class CombineJsonPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('CombineJsonPlugin', (compilation, callback) => {
      const distPath = path.resolve(__dirname, 'dist');

      // Ensure dist folder exists
      if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath);
      }

      // Load and combine JSON files under their respective keys
      const json1 = require('./src/file1.json');
      const json2 = require('./src/file2.json');
      const json3 = require('./src/file3.json');

      const combinedJson = {
        "file1": json1,
        "file2": json2,
        "file3": json3
      };

      // Write combined JSON to a file
      const combinedFilePath = path.join(distPath, 'combined.json');
      fs.writeFileSync(combinedFilePath, JSON.stringify(combinedJson, null, 2));

      console.log(`combined.json created at ${combinedFilePath}`);
      callback();
    });
  }
}

module.exports = {
  entry: './src/index.js',  // Still required, even if empty
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  plugins: [
    new CombineJsonPlugin(),  // Add the custom plugin here
  ],
};
