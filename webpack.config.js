const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production';
    const isDev = !isProd;

    console.log('isProd', isProd);
    console.log('isDev', isDev);

    const filename = (ext) => (isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`);

    return {
        target: 'web',
        context: path.resolve(__dirname, 'src'),
        entry: './index.tsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle-[hash].js',
            clean: true,
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@components': path.resolve(__dirname, 'src/components'),
            },
            modules: [path.join(__dirname, 'node_modules')],
        },
        resolveLoader: {
            modules: [path.join(__dirname, 'node_modules')],
        },
        devServer: {
            port: 3000,
            open: true,
            hot: true,
            watchFiles: './',
        },
        devtool: isDev ? 'source-map' : false,
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {},
                        },
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './assets/index.html',
                filename: 'index.html',
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                },
                favicon: './assets/favicon.ico',
            }),
            new MiniCssExtractPlugin({
                filename: filename('css'),
            }),
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: __dirname + '/src/assets/images',
                        to: 'assets/images',
                        noErrorOnMissing: true,
                    },
                ],
            }),
        ],
    };
};
