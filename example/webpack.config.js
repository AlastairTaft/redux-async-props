module.exports = {
  entry: './app.js',

  output: {
    path: 'public',
    filename: 'bundle.js',
    publicPath: ''
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0' }
    ]
  },

  devtool: 'source-maps'
}