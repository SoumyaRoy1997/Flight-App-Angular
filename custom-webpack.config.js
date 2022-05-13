const webpack = require('webpack');

module.exports = {
    module : {
        rules: [
          {
            test   : /\.scss$/,
            loader : 'postcss-loader',
            options: {
              ident  : 'postcss',
              plugins: () => [
                require('postcss-short')(),
              ]
            }
          }
        ]
      },
  plugins: [
    new webpack.DefinePlugin({
      'STABLE_FEATURE': JSON.stringify(true),
      'EXPERIMENTAL_FEATURE': JSON.stringify(false)
    })
  ]
};