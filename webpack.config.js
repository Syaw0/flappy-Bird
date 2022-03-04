const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
module.exports={
    entry:'./src/main.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'./dist')
    },
    optimization:{
        minimize:true,
        minimizer:[new TerserPlugin()]
    },
    module:{
        rules:[
            {
                test:/\.m?js$/i , 
                exclude:/node_modules/ ,
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test:/\.css$/i , 
                use:[MiniCssExtractPlugin.loader , 'css-loader' , 'postcss-loader' ]
            },
            {
                test:/\.(jpe?g|jpg|svg|png|gif)$/i , 
                loader:'file-loader',
                options:{
                    outputPath:'assesst',
                    name:'[name].[ext]'
                }
            },
            ],
    },
    plugins:[
        new HtmlWebpackPlugin({template:'./src/index.html'}),
        new MiniCssExtractPlugin()
    ]

}
