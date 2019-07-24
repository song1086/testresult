var mysql = require("mysql");

var pool = null;

function nop(a, b, c, d, e, f, g) {

}

function query(sql, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, function (qerr, vals, fields) {
                //释放连接  
                conn.release();
                //事件驱动回调  
                callback(qerr, vals, fields);
            });
        }
    });
};

exports.init = function (config) {
    pool = mysql.createPool({
        host: config.HOST,
        user: config.USER,
        password: config.PSWD,
        database: config.DB,
        port: config.PORT,
    });
};

exports.insert_test = function (project_name, case_name, case_descript, case_result, case_type, case_time, case_start_time, case_end_time, callback) {
    callback = callback == null ? nop : callback;
    var sql = `SELECT * FROM t_testcase WHERE case_name = '${case_name}'`
    query(sql, function (err, rows, fields) {
        if (err) {
            callback(null);
            throw err;
        }
        else {
            console.log(rows)
            if (rows.length > 0) {
                var isql = `UPDATE t_testcase SET update_time = NOW(), case_result = ${case_result}, case_time=${case_time}, case_start_time=${case_start_time}, case_end_time=${case_end_time}  WHERE TO_DAYS(create_time) = TO_DAYS(NOW()) AND case_name = '${case_name}'`
                query(isql, function (err, row, fields) {
                    if (err) {
                        callback(null)
                        throw err
                    }
                    callback(true)
                })
            }
            else {
                var sql1 = `SELECT * FROM t_testproject WHERE project_name = '${project_name}'`
                query(sql1, function (err, row, fields) {
                    console.log(sql1, row)
                    if (err) {
                        callback(null)
                        throw err
                    }
                    if (row.length === 0) {
                        var sql2 = `INSERT INTO t_testproject VALUES (now(), '${project_name}')`

                        query(sql2, function (err, row, fields) {
                            console.log(sql2, row)
                            if (err) {
                                callback(null)
                                throw err
                            }
                        })
                    }
                })
                var sql3 = `SELECT * FROM t_casetype WHERE case_type = '${case_type}'`

                query(sql3, function (err, row, fields) {
                    console.log(sql3, row)
                    if (err) {
                        callback(null)
                        throw err
                    }
                    if (row.length === 0) {
                        var sql4 = `INSERT INTO t_casetype VALUES (now(), '${case_type}')`

                        query(sql4, function (err, row, fields) {
                            console.log(sql4, row)
                            if (err) {
                                callback(null)
                                throw err
                            }
                        })
                    }
                })

                var isql = `INSERT INTO t_testcase VALUES (now(), now(), '${project_name}', '${case_name}', '${case_descript}', ${case_result}, '${case_type}', ${case_time}, ${case_start_time}, ${case_end_time})`
                query(isql, function (err, row, fields) {
                    console.log(isql, row)
                    if (err) {
                        callback(null)
                        throw err
                    }
                    callback(true)
                })
            }

        }
    });
};

exports.get_data = function (project_name, case_type, date, callback) {
    var pro = ''
    var ty = ''
    if(case_type !== undefined){
        ty = ` AND case_type = '${case_type}'`
    }
    if(project_name !== undefined){
        pro = ` AND project_name = '${project_name}'`
    }
    
    var sql = `SELECT * FROM t_testcase WHERE TO_DAYS(update_time) = TO_DAYS('${date}')${ty}${pro}`
   
    console.log(sql)
    query(sql, function (err, row, fields) {
        if (err) {
            callback(null)
            throw err
        }
        callback(row)
    })
}

exports.get_project = function (callback) {
    var sql = `SELECT project_name FROM t_testproject `
    console.log(sql)
    query(sql, function (err, row, fields) {
        if (err) {
            callback(null)
            throw err
        }
        callback(row)
    })
}

exports.get_type = function (callback) {
    var sql = `SELECT case_type FROM t_casetype `
    console.log(sql)
    query(sql, function (err, row, fields) {
        if (err) {
            callback(null)
            throw err
        }
        callback(row)
    })
}

exports.get_count = function (start_time, end_time, case_type, project_name, callback){
    var pro = ''
    var ty = ''
    if(case_type !== undefined){
        ty = ` AND case_type = '${case_type}'`
    }
    if(project_name !== undefined){
        pro = ` AND project_name = '${project_name}'`
    }
    console.log(ty)
    console.log(pro)
    var sql = "SELECT COUNT(1) AS countNumber,DATE_FORMAT(create_time,'%Y-%m-%d') AS dateTime " + 
    `FROM t_testcase WHERE create_time  BETWEEN '${start_time}' AND '${end_time}'`+ ty + pro +
    "GROUP BY DATE_FORMAT(create_time,'%Y-%m-%d')"
    console.log(sql)
    query(sql, function (err, row, fields) {
        if (err) {
            callback(null)
            throw err
        }
        callback(row)
    })
}