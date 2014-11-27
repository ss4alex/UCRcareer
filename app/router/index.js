var logger = require('../logger');

var checkAuthApplicant = function(req, res, next) {
    if(req.session.applicantUserId) {
        next();
    } else {
        var err = new Error("Forbidden");
        err.name = "error";
        err.status = 403;
        next(err);
    }
};

module.exports = function(app) {
    app.use('/register', require('./routes/register'));
    app.use('/login', require('./routes/login'));
    app.use('/logout', require('./routes/logout'));
    app.use('/profile', require('./routes/profile'));
    app.use('/post', require('./routes/post'));
    app.use('/post', require('./routes/review'));
    app.use('/upload', require('./routes/upload'));
    app.use('/resume', require('./routes/resume'));
    app.use('/search', require('./routes/search'));
    app.use('/heartbeat', require('./routes/heartbeat'));

    /*
     * Error middleware
     */
    app.use(function(err, req, res, next) {
        if(err.status >= 200 && err.status < 300) {
            next();
        }

        if(!err.status) {
            err.status = 500;
            logger.error(err);
        } 

        res.status(err.status).json(err);
    });
};
