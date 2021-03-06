const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const render = require('koa-ejs');
const static = require('koa-static');
const compress = require('koa-compress');

const { POSTS_DIR } = require('./constants')

module.exports = () => {
    const app = new Koa();
    const router = new Router();

    render(app, {
        root: path.join(__dirname, '..', 'views'),
        viewExt: "html",
        cache: false
    });

    require("./routes")(router);
    
    app.use(compress());
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.use(static(path.join(__dirname, "..", "public")));
    app.use(static(POSTS_DIR));

    return app;
};