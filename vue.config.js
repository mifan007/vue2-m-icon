const { defineConfig } = require("@vue/cli-service");
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  publicPath: './',
  outputDir: 'lib/dist',
  transpileDependencies: true,
  // entry: './packages/icon/index.js', // 输入文件路径
  // output: {
  //   path: path.resolve(__dirname, 'dist'), // 输出目录
  //   filename: 'vue2-m-icon.js', // 输出文件名
  //   libraryTarget: 'umd', // 库的目标环境
  //   library: 'vue2-m-icon', // 库的名称
  //   umdNamedDefine: true // 确保UMD构建支持命名 AMD
  // },
  // 修改 src 目录 为 examples 目录
  chainWebpack(config) {
    // set svg-sprite-loader
    // config.module.rule("svg").exclude.add(resolve("src/components/icon/svg")).end();
    // config.module
    //   .rule("icon")
    //   .test(/\.svg$/)
    //   .include.add(resolve("src/components/icon/svg"))
    //   .end()
      config.module.rule('svg').test(/\.svg$/).use('svg-url-loader').loader('svg-url-loader').options({
        symbolId: "#icon-[name]"
      }).end()
      config.module
        .rule("js")
        .include.add(resolve("src/components"))
        .end()
        .use("babel")
        .loader("babel-loader")
        .tap((options) => {
          // 修改它的选项...
          return options;
        });
  },
});
