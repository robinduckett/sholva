/**
 * Init script for sholva/kree
 * 
 * @author Robin
 */
 
var connect = require('connect');
var mongoose = require('mongoose');
var mysql = new require('mysql').Client();
var config = require('../config/core');
var sly = require('sly');


exports.listen = function listen() {
  console.log('Performing first time boot stock import');
  
  var auth = config.database;
  
  mysql.user = auth.username;
  mysql.password = auth.password;
  
  sly.do(function(cb) {
    mysql.connect(cb);
  }).then(function(cb) {
    mysql.query('USE ' + auth.database);
    mysq.query('SELECT * FROM monmotors_progress', cb);
  }).then(function(err, results, fields) {
    console.log(results);
    mysql.end();
  }).start();
};