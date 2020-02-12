const CompressionPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  productionSourceMap: false, // 不产生map文件
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        performance: {
          hints: false // 关闭性能提示
        },
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/, // 匹配文件名
            threshold: 10240, // 对超过10k的数据压缩
            deleteOriginalAssets: false // 不删除源文件
          })
        ],
        optimization: {
          minimizer: [
            new UglifyJsPlugin({
              uglifyOptions: {
                compress: {
                  drop_debugger: true,
                  drop_console: true,
                  pure_funcs:['console.log'] // 移除console
                }
              }
            })
          ]
        }
      }
    }
  }
}
