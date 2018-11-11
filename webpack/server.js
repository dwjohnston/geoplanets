const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./common');
const join = require('path').join;
const nodeExternals = require('../scripts/node-externals');

module.exports = merge(common, {
    mode: 'development',
    name: 'server',
    target: 'node',
    externals: nodeExternals,
    entry: ['@babel/polyfill', join(__dirname, '../src/server/index')],
    devtool: 'inline-source-map',
    output: {
        filename: 'app.server.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.styl/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'css-loader/locals',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]'
                        }
                    },
                    'postcss-loader',
                    'stylus-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        })
    ]
});
