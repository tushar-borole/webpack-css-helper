var CssHelper = require('./index.js');

module.exports = {
    // ... config settings here ...
    plugins: [
        new CssHelper({config:'css.config.json'})
    ],
    entry: './app.js',
    output: {
        filename: 'bundle.css'
    }
};
