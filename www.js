const express = require('express');
const app = express();
// const $ = require('jquery');
// const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const bodyParser = require('body-parser');
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// $.support.cors = true;
// $.ajaxSettings.xhr = function () {
//   return new XMLHttpRequest();
// }
// $.ajaxSettings.xhr = new XMLHttpRequest();

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

app.post('/api/web', function (req, res) {
  const token = 'eJx10kuTojAQAOD/wlVK8iAk8eYLBkVRdHSdqTkA4shDdBBB3dr/vgm16mkpqvjSNN2h4bdS2FulA4E4qKpUUaF0FNgGbUNRlfIs7hCdUsAJAxwiVQmfMQgh4DrgqhIUq4HS+YTIACrH7EtGPBH4hBwBFQIGvtSHdWGki1Nm2SJJ2ZflqaNptR8f/Lh9iOLy4uft8HjQ9sdDpNXl+XCr6istEii29P/sPKr/he18G10V0eCwlA0MilSMqHwhg+IX9RfJi/RF9iRrHqOSHEiyhsaDFEBJ3lDWZaAheZE+CcGLsi6DDWU3hiQRepE8iZu6RFLnknI71CBPMvag+FaCXLZgUG6SywoMy268SSCiBQZNlDBJLCmLYaBL0oZNLhONMQRyoKkcqLj6z8ESBNWBvZLjIIZY0WYlUspH6kT8UOL2Of7OhaLRdZqkpVOD7vt+xx0TpihZZOO9mR5/zK7pBMSfsmk6Oc1Ct6/lOPbcHQVejD1cHbWBvrilw038PTTCd3Pk9s3ezvoYbeaXme9ehsv0qB9tXFj3bJ24P0bh7uz5GltnUPQn4wynrX7Q7WfZpjcI7fIUbAkx8HgExsH1klO7+jDNdFFcpqFvBm9w6A1dvzS29sdomfrovul6p7cbCqyrlbbyC7qVvbfWmQ/6DrODyruTcL7Btb249WZZPrfyqNc7ZedJd+BP0C2I4sqhXpU4wZwDNtMDADfTyZLw1TloGTserxAd0RO1NGdb8Gv97dO77/6qNlBf64mZaEaNp47y5y/vgPe2';
  const PARAM = {
    classify_type: 'cate_all',
    mtsi_font_css_version: '20ad699b',
    originUrl: 'http%3A%2F%2Fwaimai.meituan.com%2Fhome%2Fwtsmyvwx7rj1',
    page_offset: 1,
    page_size: 20,
    partner: 4,
    platform: 1,
    price_type: 0,
    sort_type: 0,
    support_invoice: 0,
    support_logistic: 0,
    support_online_pay: 0,
    uuid: 'tgycV13BEfo9lQzbdSOpyqjicyPk91YAKLX3Q3hWtvjF1gYZvifsGJntTYbtsXJa'
  };
  $.ajax({
    url: '/ajax/poilist?_token=' + token,
    type: 'POST',
    dataType: 'json',
    data: PARAM
  }).done(function (status) {
    console.log(status);
    res.send(status).end();
  });
});

let allRestaurants = [];
const getAllRestaurants = () => {
  if (allRestaurants.length < 1) {
    fs.open('./docs/restaurants.json', 'r', function (err, fd) {
      if (err) {
        console.log(err);
        return;
      }
      fs.readFile('./docs/restaurants.json', function (error, data) {
        // console.log(data.toString());
        const list = JSON.parse(data.toString());
        allRestaurants = list;
        console.log(list.length);

        fs.close(fd, function () {
          console.log('close file');
        });

      });
    });
  }
}

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
  const start = parseInt(req.query.offset, 10);
  const len = parseInt(req.query.limit, 10);
  const end = start + len;
  console.log(`start === ${start}, end === ${end}`);

  res.send(allRestaurants.slice(start, Math.min(allRestaurants.length, end))).end();

});

app.get('/api/repeat', function (req, res) {
  fs.open('./docs/restaurants.json', 'r', function (err, fd) {
    if (err) {
      console.log(err);
      res.status(404).end();
    }
    fs.readFile('./docs/restaurants.json', function (error, data) {
      // console.log(data.toString());
      const list = JSON.parse(data.toString());
      console.log(list.length);

      let arr = [];
      let finalList = [];
      list.forEach(function (item) {
        if (!arr.includes(item.id)) {
          arr.push(item.id);
          finalList.push(item);
        }
      });

      fs.writeFile('./docs/restaurants2.json', JSON.stringify(finalList), function () {
        fs.close(fd, function (closeErr) {
          console.log(closeErr);
          res.send().end();
        });
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

app.get('/api/merchant', function (req, res) {
  const id = req.query.id;
  const result = allRestaurants.find((e) => e.id === id);
  if (result) {
    res.send(result).end();
  } else {
    res.status(404).end();
  }
});

app.listen('8008', function () {
  console.log('runing on port 8008.');
  getAllRestaurants();
});
