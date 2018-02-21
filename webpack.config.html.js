const path = require('path');
const HtmlWPlugin = require('html-webpack-plugin');

const config = {
    title: 'react-redux-electron-bootstrap',
    template: path.resolve(__dirname, 'src', 'renderer', 'index.html'),
    filename: 'index.html'
};

module.exports = {
    plugins: [
        new HtmlWPlugin(config)
    ]
};