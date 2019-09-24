const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
require("html-loader");
const path = require('path');

module.exports = {
    optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ]
  },

    plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
         new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/home/home.html",//new 一个这个插件的实例，并传入相关的参数
            chunks: ["home"],
          /*  minify:{


                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true//处理js文件
            }
*/

        }),
        new HtmlWebpackPlugin(
            {
                template:'./app/log/log.html',

            filename:'log.html',
                title:"register",
                chunks:['log'],
                // 该子页面对应的js文件
            hash:true,

            }
        ),
        new HtmlWebpackPlugin(
            {
                template: "./app/download/download.html",
                filename: "download.html",
                title:"download",
                chunks: ['download'],
            hash:true,
            }
        )
  ],


    entry:{//入口文件

        home:"./app/home/index.js",

        log:"./app/log/log.js",
        download:"./app/download/download.js",

    },
    output: {
        path:path.resolve(__dirname,'build'),
        filename: "[name].js"
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./build",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
    },



    module: {
        rules: [
            {
            test: /\.(scss|css)$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader",

            ]
        },
             {
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "less-loader",

            ]
        },
            {
                test:/\.(png|jpg)$/,
                use:[
                    {
                        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'

                    }
                ]
            },
            {

  rules: [{
    test: /\.html$/,
    use: [ {
      loader: 'html-loader',
      options: {
        minimize: true,
        removeComments: false,//处理html中的图片
        collapseWhitespace: false
      }
    }],
  }]


            },
             {

                 test: /\.(m?js|jsx)$/,

                 exclude: /(node_modules|bower_components)/,

                 use: {

                     loader: 'babel-loader',
                     options: {

                         presets: ['@babel/preset-env'],
                         plugins: ['@babel/plugin-transform-react-jsx']

      }
    }
  },




        ]
    },

};