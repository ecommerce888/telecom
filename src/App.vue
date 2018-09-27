<template>
  <div id="app" :class="cl?'':'b'">
    <router-view ref="headerChild"></router-view>
    <!-- 预加载音乐 -->
    <div class="bgm">
      <audio controls style="display: none" id="bgm1" loop="loop">
        <source src="../static/img/bgm.mp3" type="audio/mpeg"> 您的浏览器不支持 audio 元素。
      </audio>
    </div>

  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      cl: true,
      focus: false
    };
  },
  watch: {
    //观察Vue实例上的数据变动
  },
  computed: {
    //DOM加载后马上执行能够缓存数据
  },
  methods: {
    //触发事件
    musicPldy(id) {
      //播放音乐兼容微信端
      var audio = document.getElementById(id);
      audio.play();
      document.addEventListener(
        "WeixinJSBridgeReady",
        function() {
          audio.play();
        },
        false
      );
    },
    musicPause(id) {
      //暂停音乐兼容微信端
      var audio = document.getElementById(id);
      audio.pause();
      document.addEventListener(
        "WeixinJSBridgeReady",
        function() {
          audio.pause();
        },
        false
      );
    },
    submitUser(data) {
      this.request(
        "/user/save",
        data,
        "POST",
        "application/x-www-form-urlencoded"
      )
        .then(res => {
          console.log(res);
          if (res.data.ret == 200) {
            console.log("保存用户成功");
          } else {
            this.$vux.toast.show({
              text: res.data.error,
              time: "1500",
              width: "2rem",
              position: "middle",
              type: "text"
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$vux.toast.show({
            text: err,
            time: "1500",
            width: "2rem",
            position: "middle",
            type: "text"
          });
        })
        .then(res => {
          // console.log("data")
          // console.log(data.openid)
          // var getUserData = {
          //   openid: data.openid
          // };
          // return this.getUser(getUserData);
        });
    }
  },
  created() {
    //页面渲染前调用

    console.log("app渲染前");
    var appid = this.Global.appid;
    var wechat = new Wechat(appid);

    wechat.config({
      debug: false,
      jsApiList: [
        "checkJsApi",
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
        "onMenuShareQQ",
        "onMenuShareWeibo"
      ]
    }); //初始
    //微信授权;
    var loca = localStorage.getItem(this.Global.appid);

    if (wechat.getQuery("code")) {
      //授权模式
      wechat.ready(() => {
        //获取用户的信息
        wechat.getUserInfo((err, res) => {
          if (err) {
            wechat.goAuth(
              "snsapi_userinfo",
              "state",
              wechat.filter("code", "state")
            );
          } else {
            console.log("授权成功");
            console.log(res);
            localStorage.setItem(appid, JSON.stringify(res));

            let data = {
              openid: res.openid,
              nick_name: res.nickname
            };

            this.submitUser(data);
            if (loca == null || loca == "") {
              console.log("缓存为空");
              location.reload();
            }
            // this.Global.openid = res.openid;
          }
        });
      });
    } else {
      //授权跳转
      wechat.goAuth("snsapi_userinfo", "state", wechat.filter("code", "state"));
    }
  },
  mounted() {
    //页面渲染完成调用
    console.log("app渲染完成");
    this.musicPldy("bgm1"); //自动播放音乐
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
/*iphoneX 适配*/
// @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
//   html {
//     font-size: 52px !important;
//   }
// }
@media screen and (max-width: 321px) {
  html {
    font-size: 38px !important;
  }
}
/*Android 全面屏*/
// @media screen and (min-height: 720px) {
//   html {
//     font-size: 52px !important;
//   }
// }

body {
  background-color: #fbf9fe;
}
body,
html {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
.loading_mask {
  position: fixed;
  z-index: 20;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: rgba(0, 0, 0, 0.5)
}
.loading_popup /deep/ .vux-spinner {
  stroke: #fff;
}
.loading_popup {
  width: 2rem;
  height: 2rem;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading_popup p {
  color: #fff;
  font-size: 14px;
  left:0;
  bottom:0.2rem;
  width: 100%;
  text-align: center;
}
.loading_icon{
  height: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
}
</style>
