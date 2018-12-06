let createError = require("http-errors"),
    express = require("express"),
    path = require("path"),
    cookieParser = require("cookie-parser"),
    logger = require("morgan"),
    compression = require("compression"),
    expressValidator = require("express-validator"),
    flash = require("connect-flash"),
    session = require("express-session"),
    passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    mongo = require("mongodb"),
    mongoose = require("mongoose"),
    options = {
        dotfiles: "ignore",
        etag: false,
        extensions: ["htm", "html", "woff2", "woff", ".png", ".jpg", ".jpeg", ".webm", ".mp3", ".ogg", ".css", ".js"],
        index: false,
        redirect: false,
        setHeaders: function (res, path, stat) {
            res.set("x-timestamp", Date.now())
        }
    },
    server_port = 10010;


mongoose.connect('mongodb://localhost/27017');

//db = mongoose.connection;
let app = express();

app.use(compression());


// view engine setup
app.set("views", path.join("./", "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static("public", options));

// Express Session
app.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Validation Setup

// Express Validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split(".")
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += "[" + namespace.shift() + "]";
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// Connect Flash
app.use(flash());

// Routes
app.use("/", require(__dirname + "/routes/index"));
//app.use('/users', require(__dirname + '/routes/users'));


// Global Vars
app.use(function (req, res, next) {

    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.locals.user = req.user || null;
    res.locals.success = req.flash("success");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = err

    // render the error page
    // + (!!process.env.PORT ? 'debug' : 'error')
    res.status(err.status || 500);
    res.render((!!process.env.PORT ? "error" : "debug"), {
        page: err.status
    });
});


let server;

server = app.listen(process.env.PORT || server_port, function () {
    console.log("Express server listening on port " + server.address().port);
});


module.exports = app;
