const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, './client/src/scripts/app.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './client/dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
}
