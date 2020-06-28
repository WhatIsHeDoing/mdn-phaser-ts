/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        open: true,
        writeToDisk: true
    },

    devtool: "inline-source-map",

    entry: {
        app: "./src/main.ts",
        vendors: ["phaser"]
    },

    mode: "development",

    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: "ts-loader"
            }
        ]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "all",
                    name: "vendors",
                    test: /[\\/]node_modules[\\/]/
                }
            }
        }
    },

    output: {
        filename: "app.bundle.js",
        path: path.resolve(__dirname, "dist")
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "index.html"
                }
                // {
                //     from: "assets/**/*",
                // },
            ]
        }),
        new webpack.DefinePlugin({
            "typeof CANVAS_RENDERER": JSON.stringify(true),
            "typeof WEBGL_RENDERER": JSON.stringify(true)
        })
    ],

    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    }

};
