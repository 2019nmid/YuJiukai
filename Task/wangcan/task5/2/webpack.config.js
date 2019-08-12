const path =require('path');

module.exports={
    entry: './input.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'output.bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.(png|jpg|gif)$/i,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:28192
                        }
                    }
                ]
            },
            
            {
                test: /\.(m?js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-react-jsx']   /*转换react语法的 */
                  }
                }
            }          
        ]
    },

    mode:'development'
};
