var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./utils/db');
var configs = require('./configs/index');
var app = express();

//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'static')));

db.init(configs.mysql());
    
app.get('/api/getcount', function (req, res) {
    var start_time = req.query.start_time
    var end_time = req.query.end_time
    var case_type = req.query.case_type
    var project_name = req.query.project_name
    if (!(typeof start_time === "string" && typeof end_time === "string")) {
        res.json({
            success: false,
            message: '传入的参数不对'
        })
    } else {
        console.log('db.get_count')
        db.get_count(start_time, end_time, case_type, project_name, function(data){
            if(data){
                res.json({
                    success:true,
                    data:data
                })
            }else{
                res.json({
                    success: false,
                    message: '服务器出错'
                })
            }
        })
    }
})

app.get('/api/gettype', function (req, res) {
    db.get_type(function (data) {
        if (data) {
            res.json({
                success: true,
                data: data
            })
        } else {
            res.json({
                success: false,
                message: '服务器出错'
            })
        }
    })
})

app.get('/api/getproject', function (req, res) {
    db.get_project(function (data) {
        if (data) {
            res.json({
                success: true,
                data: data
            })
        } else {
            res.json({
                success: false,
                message: '服务器出错'
            })
        }
    })
})

app.get('/api/getdata', function (req, res) {
    var project_name = req.query.projectname
    var case_type = req.query.casetype
    var date = req.query.date
    if (! typeof date === "string") {
        res.json({
            success: false,
            message: '传入的参数不对'
        })
    }
    db.get_data(project_name, case_type, date, function (data) {
        if (data) {
            data.forEach(element => {
                element.case_result = element.case_result ? true : false
            });
            res.json({
                success: true,
                data: data
            })
        } else {
            res.json({
                success: false,
                message: '服务器出错'
            })
        }
    })
})

app.post('/api/updatedata', function (req, res) {
    var project_name = req.body.project_name
    var case_name = req.body.case_name
    var case_descript = req.body.case_descript
    var case_result = req.body.case_result
    var case_start_time = req.body.case_start_time
    var case_time = req.body.case_time
    var case_end_time = req.body.case_end_time
    var case_type = req.body.case_type
    if (!(typeof project_name === "string" && typeof case_name === "string" && typeof case_type === "string" && typeof case_descript === "string" && typeof case_result === "boolean" && typeof case_time === "number" && typeof case_start_time === "string" && typeof case_end_time === "string")) {
        res.json({
            success: false,
            message: '传入的参数不对'
        })
    } else {
        db.insert_test(project_name, case_name, case_descript, case_result, case_type, case_time, case_start_time, case_end_time, function (data) {
            if (data) {
                res.json({
                    success: true,
                })
            } else {
                res.json({
                    success: false,
                    message: '写入出错'
                })
            }
        })
    }
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
