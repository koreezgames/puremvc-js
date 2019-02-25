const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ConcatPlugin = require("webpack-concat-plugin");

const phaserModule = path.resolve("node_modules/phaser-ce/");
const pixi = path.join(phaserModule, "build/custom/pixi.min.js");
const phaser = path.join(phaserModule, "build/custom/phaser-arcade-physics.min.js");

const concatPluginConfigGenerator = (name, files) => {
    return {
        uglify: false,
        sourceMap: false,
        name: name,
        fileName: "[name].js",
        filesToConcat: files,
        injectType: "none"
    };
};

module.exports = (function(options) {
    return {
        mode: "development",

        entry: {
            main: path.resolve("example/index.ts")
        },

        output: {
            path: __dirname + "/dist",
            filename: "bundle.js"
        },

        devtool: "source-map",

        module: {
            rules: [
                { test: /\.ts$/, loader: "ts-loader" },
                {
                    test: /pixi.min\.js/,
                    use: ["expose-loader?PIXI"]
                },
                {
                    test: /phaser-arcade-physics.min\.js/,
                    use: ["expose-loader?Phaser"]
                }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve("static/index.html"),
                inject: false
            }),

            new ConcatPlugin(concatPluginConfigGenerator("phaser", [path.resolve(__dirname, "./node_modules/phaser-ce/build/phaser.js")]))
        ],

        resolve: {
            extensions: [".ts", ".js", ".json"],
            alias: {
                "phaser-ce": phaser,
                phaser: phaser,
                pixi: pixi
            }
        }
    };
})();
