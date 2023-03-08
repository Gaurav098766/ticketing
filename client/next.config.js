module.exports = {
     webpackMiddleware:config =>{
        config.watchOptions.poll = 300;
        return config;
     }
}