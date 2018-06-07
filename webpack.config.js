var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        lib: ['./index.js'],
    },

    output: {
        path: path.resolve(__dirname, 'build/'),
        filename: 'jstandard.js',
        library: 'JStandard',
        publicPath: 'http://localhost:8080/built/'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,

                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],

                exclude: '/node_modules/'
            }

        ]
    }
};
