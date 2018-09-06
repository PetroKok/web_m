const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let path = require('path');
const srcPath = path.resolve(__dirname, 'src');
const publicPath = path.resolve(__dirname, 'public/bundle');

module.exports = {
    entry: [`${srcPath}/client.js`],
    output: {
        path: publicPath,
        filename: '[name].js',
        publicPath: '/public/bundle/',
    },

    resolve: {
        modules: ['node_modules'],
        extensions: ['*', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['react-hot-loader/webpack', 'babel-loader'],
                exclude: [/node_modules/]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    },
                ],
            }

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: "[name].css"
        })
    ],
    devtool: 'source-map',
};
