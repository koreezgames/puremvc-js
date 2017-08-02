import Config from 'webpack-config'
import webpack from 'webpack'
import { libraryName } from './webpack.base.config'

export default new Config().extend({
  'webpack.base.config.js': config => {
    config.output.filename = libraryName + '.min.js'
    return config
  }
}).merge({
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    })
  ]
})
