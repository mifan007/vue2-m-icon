// const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const TerserPlugin = require('terser-webpack-plugin');
 
module.exports = {
  mode: 'production',
  externals: {
    vue: {  //将vue依赖 "外部化"，不打包进组件库
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  optimization: {
    minimizer: [
    //   new TerserPlugin({
    //     terserOptions: {
    //       output: {
    //         comments: false
    //       }
    //     }
    //   })
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: process.cwd(),
        use:{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        },
        exclude : /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
    ]
  },
  plugins: [
    // new VueLoaderPlugin()
  ]
};