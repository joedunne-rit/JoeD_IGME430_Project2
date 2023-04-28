const path = require('path');

module.exports = {
    entry: {
        //app: './client/maker.jsx',
        login: './client/login.jsx',
        user: './client/user.jsx',
        game: './client/game.jsx',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    mode: 'production',
    devtool: 'inline-source-map',
    watchOptions: {
        aggregateTimeout: 200,
    },
    output: {
        path: path.resolve(__dirname, 'hosted'),
        filename: '[name]Bundle.js',
    },
};