/**
 * Created by 亮杰 on 2017/6/3.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');

var pool  = mysql.createPool($util.extend({}, $conf.mysql));

var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

var useDao={
  add:function (req,res,next) {
      try {
          pool.getConnection(function (err, connection) {
              if(err){
                  console.log("getConnection error!")
                  console.error(err);
                  connection.release();
                  return;
              }
              var param = req.query || req.params;
              console.log(param.name);
              console.log(param.age);
              console.log($sql.insert);
              connection.query($sql.insert, [param.name, param.age], function(err, result) {
                  if(result) {
                      result = {
                          code: 200,
                          msg:'增加成功'
                      };
                  }

                  // 以json形式，把操作结果返回给前台页面
                  jsonWrite(res, result);

                  // 释放连接
                  connection.release();
              });
          });
      }catch (err){
          console.log(err.escape);
      }
  }
};

module.exports = useDao;


