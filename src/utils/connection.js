const URLHost = 'http://localhost:8008/api/';

const getEncodeURL = url => {
  let str = '';
  if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
    str = url;
  } else {
    str = URLHost + url;
  }
  return str;
}

const getEncodeBody = data => {
  let str = '';
  if (typeof data === 'string') {
    str = data;
  } else if (typeof data === 'object') {
    let arr = [];
    for (let key in data) {
      arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    str = arr.join('&');
  }
  return str;
}

export default function vueFetch(method, url, data) {
  let finalURL = getEncodeURL(url);
  let opt = {
    method: method ? method.toUpperCase() : 'GET',
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'content-type': 'application/json'
    },
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  };
  if (opt.method.toUpperCase() === 'GET') {
    finalURL += '?' + getEncodeBody(data);
  } else {
    opt.body = getEncodeBody(data);
  }
  return fetch(finalURL, opt).then(function (res) {
    if (res.status === 200) {
      return res.json();
    }
    return;
  });
}