module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
    pages: {
        index: {
            entry: './src/main.js',
            title: '黑角龍魔物地圖即時查',
        },
    },
};