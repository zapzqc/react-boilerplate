const { resolve } = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');
const { extendDefaultPlugins } = require('svgo');

const appPath = resolve(__dirname, 'src');
const config = {
  entry: './src/index.tsx', // Indicates which module webpack should use to begin building out its internal dependency graph.By default its value is ./src/index.js.

  output: {
    // where to emit the bundles it creates and how to name these files.
    filename: 'js/[name].[contenthash].js', // output file It defaults to ./dist/main.js.
    assetModuleFilename: 'img/[hash][ext][query]', // By default, asset/resource modules are emitting with [hash][ext][query] filename into output directory.
    path: resolve(__dirname, 'dist'), // The output directory as an absolute
    clean: true, // Clean the output directory before emit.
    pathinfo: false, // to include comments in bundles with information about the contained modules.
  },

  resolve: {
    alias: {
      '@icons': resolve(__dirname, 'src/assets/icons'),
      '@images': resolve(__dirname, 'src/assets/images'),
      '@styles': resolve(__dirname, 'src/assets/styles'),
      '@components': resolve(__dirname, 'src/components'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@router': resolve(__dirname, 'src/router'),
      '@services': resolve(__dirname, 'src/services'),
      '@store': resolve(__dirname, 'src/store'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@views': resolve(__dirname, 'src/views'),
    },
    // modules: [resolve(__dirname, 'src'), './node_modules'],
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'], // ['.wasm', '.mjs', '.js', '.json']
  },

  cache: {
    type: 'filesystem', // Cache the generated webpack modules and chunks to improve build speed.
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: 'babel-loader',
        include: resolve(__dirname, 'src'),
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpe?g|gif|webp)$/i,
        type: 'asset',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './public',
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map'; // eval-cheap-module-source-map
  } else if (argv.mode === 'production') {
    (config.optimization = {
      minimizer: [
        '...',
        new CssMinimizerPlugin(),
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              // Lossless optimization with custom option
              // Feel free to experiment with options for better result for you
              plugins: [
                ['gifsicle', { interlaced: true }],
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 5 }],
                // Svgo configuration here https://github.com/svg/svgo#configuration
                [
                  'svgo',
                  {
                    plugins: ['preset-default'],
                  },
                ],
              ],
            },
          },
        }),
        new JsonMinimizerPlugin(),
      ],
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
          },
        },
      },
    }),
      config.plugins.push(new CompressionPlugin());
    // config.plugins.push(new BundleAnalyzerPlugin());
  }
  return config;
};
