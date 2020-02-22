const proxy = require('http-proxy-middleware')  // 代理中间件
// 第一个参数为要代理的路由，第二参数中target为代理后的请求网址，changeOrigin是否改变请求头

const Nginx_https_deploy = 'https://hducsrao.xyz:8880'
// const Nginx_https_deploy = 'http://localhost:8880'

module.exports = function(app) {
    app.use(
        proxy('/api', {
            target: Nginx_https_deploy,  
            changeOrigin:true,
            pathRewrite:{
                '^/api': '/'
            }
        })
    );
    app.use(
        proxy('/usr_login', {
            target: Nginx_https_deploy,
            changeOrigin:true,
        })
    );
    app.use(
        proxy('/usr_register', {
            target: Nginx_https_deploy,
            changeOrigin:true,
        })
    );
    app.use(
        proxy('/usr_modify', {
            target: Nginx_https_deploy,
            changeOrigin:true,
        })
    );
    app.use(
        proxy('/usr_record', {
            target: Nginx_https_deploy,
            changeOrigin:true,
        })
    )
}