module.exports = {
  // 公開時には[production]
  // 制作段階では[development]
  mode: 'production',
  output: {
    path: __dirname + '/dist/',
    filename: '[name]'
  },
  entry: {
    //各ページ毎に記述を追記していく
    'sketch.js': './src/sketch.js',
  },
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: 'babel-loader',
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES2018 を ES5 に変換
                '@babel/preset-env',
              ]
            }
          }
        ]
      }
    ]
  }
};
