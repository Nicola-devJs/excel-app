const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => {
   const isProd = argv.mode === 'production'
   const isDev = !isProd

   const filename = (ext) =>
      isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`

   const plugins = () => {
      const base = [
         new HTMLWebpackPlugin({
            template: './index.html',
         }),
         new CopyPlugin({
            patterns: [
               {
                  from: path.resolve(__dirname, 'src', 'favicon.ico'),
                  to: path.resolve(__dirname, 'dist'),
               },
            ],
         }),
         new MiniCssExtractPlugin({
            filename: filename('css'),
         }),
      ]

      if (isDev) {
         base.push(new ESLintPlugin())
      }

      return base
   }
   return {
      mode: 'development',
      devtool: isDev ? 'source-map' : false,
      context: path.resolve(__dirname, 'src'),
      entry: ['@babel/polyfill', './index.js'],
      output: {
         clean: true,
         path: path.resolve(__dirname, 'dist'),
         filename: filename('js'),
      },
      devServer: {
         port: '3000',
         open: true,
         hot: true,
         // watchFiles: './',
      },
      resolve: {
         extensions: ['.js', '.json'],
         alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.relative(__dirname, 'core'),
         },
      },
      plugins: plugins(),
      module: {
         rules: [
            {
               test: /\.s[ac]ss$/i,
               use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
               test: /\.m?js$/,
               exclude: /node_modules/,
               use: {
                  loader: 'babel-loader',
                  options: {
                     presets: ['@babel/preset-env'],
                  },
               },
            },
         ],
      },
   }
}
