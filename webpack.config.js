const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const MinCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/module.ts',
    devtool: 'inline-source-map',
    mode: 'production',
    plugins: [new MinCSSExtractPlugin()],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                sideEffects: true,
                use: [
                    MinCSSExtractPlugin.loader,
                    "css-loader",
                    "less-loader",
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
        filename: 'mod.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        sideEffects: true
    }
}