const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 代理配置 把当前服务器转发（代理）到另一台服务器上
  devServer: {
    proxy: {
      // 当地址中包含 /api 的时候，出发此代理
      '/api': {
        target: 'https://www.fastmock.site/mock/153cb475fb4c197651ccf3e10b2953f2/',
        changeOrigin: true
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
