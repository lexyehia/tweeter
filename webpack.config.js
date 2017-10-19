const path = require('path'),
   webpack = require('webpack'),
   ExtractTextPlugin = require("extract-text-webpack-plugin")

// const extractSass = new ExtractTextPlugin({
//     filename: "/[name].css",
//     //disable : process.env.NODE_ENV === "development"
// })

module.exports = {
    entry: path.resolve(__dirname, './client/src/scripts/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './client/dist'),
        //publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader:"file-loader",
                query:{
                    name:'[name].[ext]',
                    outputPath:'images/'
                }
            }
        ]
    },
    plugins: [
       new webpack.NoEmitOnErrorsPlugin(),
       new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.$": "jquery"
        }),
    ],
    devtool: 'eval'
}
