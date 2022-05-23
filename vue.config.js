const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // webpack devServer 提供了代理的功能，该代理可以把所有请求到当前服务中的请求，转发（代理）到另外的服务器上
  devServer: {
    // 配置反向代理
    proxy: {
      // 当地址中有 /api的时候会触发代理机制
      '/api': {
        // 要代理的服务地址
        // target: 'https://api.admin.lgdsunday.club/',
        target: 'http://192.168.1.62:3000', // 本地服务
        changeOrigin: true // 是否跨域
      }
    }
  },
  chainWebpack (config) {
    // 设置 svg-sprite-loader
    config.module.rules.delete('svg') // 先清除svg默认配置处理
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons/svg'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
