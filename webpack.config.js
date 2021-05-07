const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/module.ts',
    mode: 'production',
    devtool: "inline-source-map",
    plugins: [
        new MiniCSSExtractPlugin(),
        new ESLintPlugin(),
        new CopyPlugin({
            patterns: [
                "templates/**/*",
                "lang/**/*",
                "module.json"
            ]
        })
    ],
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
                    MiniCSSExtractPlugin.loader,
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
        minimizer: [new TerserPlugin({
            terserOptions: {
                mangle: false
            }
        })],
        sideEffects: true
    }
}