const path = require('path'),
   webpack = require('webpack')

module.exports = {
    entry: path.resolve(__dirname, './client/src/scripts/index.js'),
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
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery2",
            jQuery: "jquery2",
            "window.jQuery": "jquery2"
        })
    ],
    devtool: 'eval'
}
