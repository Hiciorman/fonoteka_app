var isDevBuild = process.argv.indexOf('--env.prod') < 0;
var path = require('path');
var bundleOutputDir = './wwwroot/dist';
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: isDevBuild ? 'inline-source-map' : null,
    entry: { 'main': './ClientApp/boot.jsx' },
    resolve: { extensions: ['', '.js', '.jsx', '.ts', '.tsx'] },
    output: {
        path: path.join(__dirname, bundleOutputDir),
        filename: '[name].js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            { test: /\.(jsx$)$/, include: /ClientApp/, exclude: /node_modules/ , loader: 'babel-loader' },
            { test: /\.css$/, loader: isDevBuild ? 'style!css' : ExtractTextPlugin.extract(['css']) },
            { test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'url', query: { limit: 25000 } }
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./wwwroot/dist/vendor-manifest.json')
        })
    ].concat(isDevBuild ? [
        // Plugins that apply in development builds only
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map', // Remove this line if you prefer inline source maps
            moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
        })
    ] : [
        // Plugins that apply in production builds only
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
        new ExtractTextPlugin('site.css')
    ])
};