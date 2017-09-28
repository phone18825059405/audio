var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
    //插件项
    //plugins: [commonsPlugin],
    //页面入口文件配置
    //debug:true,
    entry: {
        index : './entry/index.js',
        artistDetail : './entry/artistDetail.js',
        search:'./entry/search.js',
        mvList:'./entry/mvList.js',
        mvPlayer:'./entry/mvPlayer.js',
        //cart: './entry/cart.js',
       // order: './entry/order.js',
        //orderManage: './entry/orderManage.js'
    },
    //入口文件输出配置
    output: {
        path: BUILD_PATH,
        filename: '[name].build.js',
        publicPath :'dist/'
    },
    module: {
        //加载器配置
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
              loaders:{
                css: ExtractTextPlugin.extract({
                  use: 'css-loader!sass-loader',
                  fallback: 'style-loader'
                }),
                sass: ExtractTextPlugin.extract({
                  use: 'css-loader!sass-loader',
                  fallback: 'vue-style-loader'
                }),
                scss: ExtractTextPlugin.extract({
                  use: 'css-loader!sass-loader',
                  fallback: 'vue-style-loader'
                })
              },
              include: path.resolve(ROOT_PATH, 'node_modules\keen-ui'),
               /* sass: ExtractTextPlugin.extract({
                  use: 'css-loader!sass-loader',
                  fallback: 'vue-style-loader'
                })*/
                //ExtractTextPlugin.extract("css!sass-loader")
            }
          },
          /*{
            test: /\.(css|scss|sass)$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!sass-loader'
           })
            //include: APP_PATH
          },*/
          {
              test: /\.css$/,
              loader: "style-loader!css-loader"
          },
          {
              test: /\.scss$/,
              loader: "style-loader!css-loader!sass-loader!"
          },
          {
              test: /\.sass$/,
              loader: "style-loader!css-loader!sass-loader!"
          }, 
          {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            //include: APP_PATH,
            /*query: {
              presets: ['es2015']
            }*/
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file-loader',
            /*query:{
              name: 'img/[name].[ext]'
            }*/
          }
        ]
    },
   /* devServer:{
      historyApiFallback:true,
      hot:true,
      inline:true,
      progress:true,//报错无法识别，删除后也能正常刷新
    }, */
    plugins: [
        new ExtractTextPlugin("[name].css"),
         // 使用 ProvidePlugin 加载使用率高的依赖库
        new webpack.ProvidePlugin({
          $: 'webpack-zepto'
        }),
        //new CommonsChunkPlugin('index','productShow.js'),
        //new CommonsChunkPlugin('detail','detail.js'),
       //new CommonsChunkPlugin({ name: 'idetail', chunks: ['detail'] }),
        new CommonsChunkPlugin('common'),
     ],
    //其它解决方案配置
    resolve: {
        modules: [BUILD_PATH,"node_modules"], //绝对路径
        /*extensions: ['', '.js', '.json', '.scss'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }*/
    }
};