import webpack from 'webpack'
import webpackConfig from './webpack-config'

export default {
  middleware (app) {
    const compiler = webpack(webpackConfig)

    app.use(require('connect-history-api-fallback')({
      verbose: false
    }))

    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      quiet: false,
      lazy: false,
      hot: true,
      historyApiFallback: true,
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true
      }
    }))

    app.use(require('webpack-hot-middleware')(compiler))
  },

  build (cb) {
    const compiler = webpack(webpackConfig)
    compiler.run(cb)
  }
}
