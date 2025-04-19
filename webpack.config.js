const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    const isProduction = false;

    return {
        mode: isProduction ? 'production' : 'development',
        entry: './src/app.ts',
        output: {
            filename: 'app.[name].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        devtool: isProduction ? undefined : 'inline-source-map',
        module: {
            rules: [{
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        devServer: {
            static: {
                directory: path.join(__dirname, '/'),
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'index.html'
            })
        ],
    };
};