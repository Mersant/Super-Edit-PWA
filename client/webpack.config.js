const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin',
      }),

      // rjw - removing MiniCssExtractPlugin below
      // new MiniCssExtractPlugin(),

      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
        //rjw - 
        // swDest: 'service-worker.js',
      }),

      new WebpackPwaManifest({
        fingerprints: false,
        // rjw - Adding this next line
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E.',
        description: 'Best editor since Vim!',
        // rjw - uncommenting the next two lines
        background_color: '#7eb4e2',
        theme_color: '#7eb4e2',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            // Adding sizes array below
            sizes: [96, 128, 192, 256, 384, 512],
            // sizes: 96,
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
          // use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
        // {
        //   test: /\.m?js$/,
        //   exclude: /(node_modules|bower_components)/,
        //   use: {
        //     loader: 'babel-loader',
        //     options: {
        //       presets: ['@babel/preset-env'],
        //     },
        //   },
        // },
      ],
    },
  };
};