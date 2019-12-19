const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV === 'test'){
  require('dotenv').config({ path: '.env.test'});
}else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development'});
}


module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new MiniCssExtractPlugin('styles.css')

  return {
    entry: ["@babel/polyfill",'./src/app.js'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      chunkFilename: 'vendor.bundle.js',
      filename: 'app.bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: "file-loader",
      },
      {
        test: /\.s?css$/,
        use: [
          {
              loader: MiniCssExtractPlugin.loader,
              options: {
                  publicPath: '../',
                  hmr: process.env.NODE_ENV === 'development',
                  }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap : true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap : true
            }
          }
            
          ]
      }]
    },
    plugins: [
      CSSExtract, 
    ],
    optimization: {
      minimizer: [new UglifyJsPlugin()],
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](react|react-dom|lodash)[\\/]/,
            name: 'vendor',
            chunks: 'all',
          }
        }
    }
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    
  }
};
