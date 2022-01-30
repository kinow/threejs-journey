const { merge } = require('webpack-merge')
const path = require('path')
const commonConfiguration = require('./webpack.common.js')

module.exports = merge(
    commonConfiguration,
    {
        mode: 'development',
        devServer: {
            static: {
                directory: path.join(__dirname, 'static'),
            },
            compress: true,
            port: 8000
        }
    }
)