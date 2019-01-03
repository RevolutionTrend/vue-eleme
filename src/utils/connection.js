const getEncodeURL = (url, data) => {
  let str = url;
  if (typeof data === 'string') {
    str += '?' + data;
  } else if (typeof data === 'object') {
    let arr = [];
    for (let key in data) {
      arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    str += '?' + arr.join('&');
  }
  return str;
}

export default function vueFetch(method, url, data) {
  return new Promise(function ({ resolve, reject }) {
    fetch(getEncodeURL(url, data), {
      method: method ? method.toUpperCase() : 'GET'
    })
      .then(function (res) {
        if (res.status === 200) {
          const resText = res.text() || '';
          if (resText.startsWith('{')) {
            resolve(res.json());
          } else {
            resolve(resText);
          }
        } else {
          reject(res.statusText);
          alert('请求失败，url：' + url);
        }
      });
  });
}