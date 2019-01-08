const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  next();
});

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use('/', function (req, res, next) {
  console.log(`req.path === ${req.path}.`);
  if (req.path.indexOf('/api/') > -1) {
    next();
  } else {
    let pathname = req.path;
    if (req.path === '/' || req.path.indexOf('.') < 0) {
      pathname = '/index.html';
    }
    res.sendFile(__dirname + '/dist' + pathname);
  }
});

app.get('/api/speed_info', function (req, res) {
  const speed = {
    up: Math.ceil(Math.random() * 512),
    down: Math.ceil(Math.random() * 1024)
  };
  console.log('speed_info: ' + JSON.stringify(speed));
  res.send(speed).end();
});

app.post('/api/map', function (req, res) {
  console.log(req.query);
  const localIip = req.query.ip;
  let result = '';
  const options = {
    hostname: 'api.map.baidu.com',
    path: '/location/ip?ak=nYGlA4tbAnvvrGBkGQ47uKq9erltT6wE&coor=bd09ll&ip=' + localIip,
    method: 'GET'
  };
  // 向远程服务器端发送请求
  const getLocation = http.request(options, function (response) {
    response.on('data', function (data) {
      console.log(arguments);
      result += data;
    });
  });
  getLocation.end();
  //延后发送请求响应
  setTimeout(function () {
    res.status(200).send(result);
  }, 500);
});

app.get('/api/restaurants', function (req, res) {
  const start = req.query.offset;
  const len = req.query.limit;
  const end = start + len;
  fs.open('./docs/restaurants.json', 'r', function (err, fd) {
    if (err) {
      console.log(err);
      res.status(404).end();
    }
    fs.readFile('./docs/restaurants.json', function (error, data) {
      // console.log(data.toString());
      const list = JSON.parse(data.toString());
      console.log(list.length);

      fs.close(fd, function (err) {
        res.send(list.slice(start, Math.min(list.length, end))).end();
      });

    });
  });
});

app.get('/api/category', function (req, res) {
  fs.open('./docs/category.json', 'r', function (err, fd) {
    if (err) {
      console.log(err);
      res.status(404).end();
    }
    fs.readFile('./docs/category.json', function (error, data) {
      const arr = JSON.parse(data.toString());

      fs.close(fd, function () {
        res.send(arr).end();
      });
    })
  });
});

app.listen('8008', function () {
  console.log('runing on port 8008.')
});
