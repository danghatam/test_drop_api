const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  images: path.join(__dirname, 'images')
};

process.env.BABEL_ENV = TARGET;

const clientConfig = {
  name: 'client',
  entry: {
    client: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'client.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        exclude: ['/node_modules/'],
        include: [PATHS.app]
      },
      {
        test: /\.css$/,
        loaders: ["style", "css"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url?limit=8192',
          'img'
        ]
      }
    ]
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.jsx', '.css'],
    alias: {
      leaflet_css: path.join(__dirname, "/node_modules/leaflet/dist/leaflet.css"),
      leaflet_markers_css: path.join(__dirname, "/node_modules/drmonty-leaflet-awesome-markers/css/leaflet.awesome-markers.css"),
      leaflet_awesome_markers: path.join(__dirname, "/node_modules/drmonty-leaflet-awesome-markers/js/leaflet.awesome-markers.js")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
      fetch: 'imports?this=>global!exports?global.fetch!isomorphic-fetch'
    })
  ]
};

const productionConfig = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      'process.env.API': '"' + process.env.API_URL + '"',
      'process.env.DOMAIN': '"' + process.env.DOMAIN + '"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CopyWebpackPlugin([
      { from: 'app/assets/favicon', to: 'favicon' },
      { from: 'app/assets/index.html', to: 'index.html' }
    ])
  ]
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(clientConfig, {
    devServer: {
      contentBase: path.join(PATHS.app, '/assets'),
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    devtool: 'eval-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({
        save: true
      })
    ]
  });
}

if (TARGET === 'build') {
  module.exports = [
    merge(clientConfig, productionConfig)
  ];
}
