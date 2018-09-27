import axios from 'axios'
import qs from "qs";

export const globalData = {
  // host: 'http://sf.gdfirsttop.com/rabbit',
  host: 'http://zhgffd.com/rabbit',
  opebid: "abc",
  // appid: "wxde4eb68184513480",//珍数""
  // appid: "wxe85b59c5b9e93dc2",//平安
  // appid: "wx7dc2fcc62e618cba", //佳柚 
  appid: "wx311baa2a857370e1", //电信
  bgmBtn: true,
  luckydrawNum: 0, //抽奖次数
};

export const request = (url, data, method, headers) => {
  let promise = new Promise(function (resolve, reject) {
    axios({
      method: method,
      url: globalData.host + url,
      data: data,
      headers: {
        "Content-Type": headers
        // "Content-Type": "application/x-www-form-urlencoded"
        // 'Content-Type': 'application/x-www-form-data'
      },
      transformRequest: [
        function (data) {
          // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
          data = qs.stringify(data);
          return data;
        }
      ]
    }).then(function (res) {
      resolve(res)
    }).catch(function (err) {
      reject(err)
    });
  })
  return promise
};

export const requestGet = (url, data, method, headers) => {
  let promise = new Promise(function (resolve, reject) {
    axios({
      method: method,
      url: globalData.host + url,
      params: data,
      headers: {
        "Content-Type": headers
        // "Content-Type": "application/x-www-form-urlencoded"
        // 'Content-Type': 'application/x-www-form-data'
      },
      transformRequest: [
        function (data) {
          // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
          data = qs.stringify(data);
          return data;
        }
      ]
    }).then(function (res) {
      resolve(res)
    }).catch(function (err) {
      reject(err)
    });
  })
  return promise
};

//参数解析
export const getUrlKey = (name) => {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
};




export default {
  globalData,
  request,
  requestGet,
  getUrlKey
}
