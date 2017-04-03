import path, {join} from "path";
import {DefinePlugin, HotModuleReplacementPlugin, optimize} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const projectPath = join(__dirname, '../..')
const watch = process.env.NODE_ENV !== 'production'

const plugins = [
  new HtmlWebpackPlugin({
    template: 'index.html',
    filename: 'index.html',
    chunks: ['common', 'app'],
    favicon: 'favicon.png',
    inject: true
  }),
  new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }),
  new optimize.CommonsChunkPlugin({ name: 'common' })
]

if (watch) {
  plugins.push(new HotModuleReplacementPlugin())
} else {
  plugins.push(new optimize.UglifyJsPlugin())
}

const entry = {
  app: ['./app.js'],
  common: ['react', 'react-dom', 'react-router', 'react-chartjs', 'mappersmith', 'moment', 'chart.js']
}

if (watch) {
  Object.keys(entry).forEach(e => entry[e].push('webpack-hot-middleware/client'))
}

export default {
  context: path.resolve(projectPath, 'client'),

  entry,

  resolve: {
    root: [
      path.join(projectPath, '/node_modules')
    ]
  },

  output: {
    path: path.join(projectPath, 'dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[id].bundle.js'
  },

  plugins,

  module: {
    loaders: [
      {
        test: /\.(png|jpg|gif|mp3)$/,
        loader: 'url-loader?limit=33792&name=[name]-[hash].[ext]'
      },
      {
        test: /\.(css|scss)$/,
        // Query parameters are passed to node-sass
        loader: 'style!css?browsers=last 2 versions!resolve-url!sass?outputStyle=expanded&' +
                'includePaths[]=' + (path.resolve(projectPath, './node_modules'))
      },
      {
        test: /\.(ttf|eot|woff|svg)$/,
        loader: 'file?name=[name]-[hash].[ext]'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /client\/app\.scss/, // the main app file
        loader: join(__dirname, 'inject-css-loader')
      }
    ]
  }
}
