const webpack = require('webpack');
const argv = require('yargs').argv

function rGetFolder(_dir) {
    return fs.readdirSync(_dir)
        .filter((_file) => {
            return fs.statSync(path.join(_dir, _file)).isDirectory()
        })
}