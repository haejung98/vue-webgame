// 뷰에 웹팩을 적용하기 위한 package.json, node
// 웹팩에 대한 설정을 적는것 - webpack.config
// 웹팩 쓰는 이유 = 스크립트가 많아져서 하나로 합칠려고
// 웹팩이 자바스크립트를 하나로 합쳐주는 역할을 함
// .vue, .css 파일을 자바스크립트로 만들어줌
// loader은 자바스크립트가 아닌것들을 자바스크립트파일로 만들어줌
// 웹팩은 자바스크립트 파일만 처리함
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')    // 노드가 만들어둔 스크립트

module.exports = {  // 노드의 모듈을 만든것
    mode: 'development', // 개발
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.vue'],
    },
    entry: {
        app: path.join(__dirname, 'main.js') // './main.js',
    },
    module: { // 웹팩 핵심
        rules: [{
            test: /\.vue$/, // .vue로 끝나는 파일 -> $는 끝을 의미
            loader: 'vue-loader',   // .vue파일은 웹팩이 아니라 vue-loader가 처리함
        }, {
            test: /\.css$/,
            use: ['vue-style-loader',
                    'css-loader'
            ]
        }],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    output: {
        filename: 'app.js', // [name].js, entry 안에 있는 이름
        path: path.join(__dirname, 'dist'), // 폴더경로 (path.join은 현재 폴더안에 있는 파일을 합쳐줄 수 있음)
        publicPath: '/dist', // 웹팩 dev 서버
    },
    devServer: {
        devMiddleware: {publicPath: '/dist'},
        static: {directory: path.resolve(__dirname)},
        hot: true,
        port: 5500
    }
};