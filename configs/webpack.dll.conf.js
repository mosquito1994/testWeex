const webpack = require('webpack');
const path = require('path');
const UglifyJsParallelPlugin = require('webpack-uglify-parallel');
const os = require('os');

const vendors = [
    'vue', 
    'vue-router'
];

module.exports = {
    output: {
        path: path.join(__dirname, '../dll'),
        filename: '[name].dll.js',
        library: '[name]_[hash]',
    },
    entry: {
        "vendor": vendors,
    },
    plugins: [
        new UglifyJsParallelPlugin({
            workers: os.cpus().length,
            mangle: true,
            exclude: /\.min\.js$/,
            output: { comments: false },
            compressor: {
                warnings: false,
                drop_console: true,
                drop_debugger: true
            }
        }),
        new webpack.DllPlugin({
            path:  path.join(__dirname, '../dll', 'vendor-manifest.json'),
            name: '[name]_[hash]',
        })
    ]
};