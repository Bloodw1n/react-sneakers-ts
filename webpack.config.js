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

    const filename = (ext) =>
        isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`;

    return {
        entry: './src/index.tsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle-[hash].js',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
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
                template: 'src/assets/index.html',
                filename: 'index.html',
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                },
                favicon: 'src/assets/favicon.ico',
            }),
            new MiniCssExtractPlugin({
                filename: 'style-[hash].css',
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
