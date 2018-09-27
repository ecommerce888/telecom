<template>
  <div class="page">
    <!--  -->
    <div class="pages loading_page" v-show="loadingPage">

      <div class="logo">
        <img src="../../static/img/logo.png">
      </div>
      <div class="loading_anim">
        <span>{{proBar}}%</span>
        <div class="loading_gka">

          <div id="gka" class="gka-base"></div>

        </div>
      </div>
    </div>
    <!--  -->
    <div class="pages home_page" v-show="homePage">
      <div class="cksx_popup" v-show="cksxPopup" @click="cksxPopupTap">
        <div class="cksx_popup_img">
          <img src="../../static/img/syts.png">
        </div>

      </div>
      <div class="prize_zx" @click="zpzxTap">
        <img src="../../static/img/jp.png">
      </div>
      <div class="rules_btn bgm_btn" @click="bgmTap">
        <img :src="bgmBtn ? bgmBtnIcon[0] : bgmBtnIcon[1]">
      </div>
      <div class="rules_btn" @click="rulesTap">
        <img src="../../static/img/gz.png">
      </div>
      <div class="home_title">
        <img src="../../static/img/home_title.png">
      </div>
      <div class="prompt">
        <img src="../../static/img/ts.png">
      </div>
      <div class="rabbit_box">
        <div class="rabbit_box_img">
          <div class="rabbit_list animated" :class="{bounce : rabbitAnim == index}" @click="rabbitTap(index)" v-for="(item,index) in rabbitData" :key="index">
            <img :src="item.img">
          </div>

        </div>
        <div class="home_btn" @click="homeTap">
          <img :src="homeBtn[homeIndex]">
        </div>
        <!-- <div class="rabbit_bj">
          <img src="../../static/img/tz_bottom.png">
        </div> -->
      </div>
    </div>

    <!-- 弹窗 -->
    <x-dialog v-model="showToast" class="rabbit_popup dialog-demo" hide-on-blur>
      <div class="popup_centent">
        <div class="rabbit_popup_hide" @click="gzHide">
          <img src="../../static/img/tztc_hide.png">
        </div>
        <div class="rabbit_popup_title">
          <img src="../../static/img/hdgz_title.png">
        </div>
        <div class="scroll_bottom">
          <img src="../../static/img/xl.png">
        </div>
        <div class="scroll_box">

          <div class="rules_text">
            <p>1.关注翼头条公众号方可参与活动</p>
            <p>2.发起召集可立即抽奖一次，成功集齐四大月兔可再抽两次，被召集月兔好友可立即抽奖一次。</p>
            <p>3.活动时间：9月21日-28日</p>
            <p>4.用户完成四大月兔领养后，不可再发起召集。</p>
            <p>5.被召集的月兔好友也可成为发起嫦娥，再次召集月兔好友。</p>
          </div>
          <div class="ydjs">
            <div class="ydjs_title">
              <img src="../../static/img/ydjs.png">
            </div>
            <div class="ydjs_list">
              <div class="ydjs_tx">
                <img src="../../static/img/gztz.png">
              </div>
              <div class="ydjs_text">
                <span><img src="../../static/img/gztz_title.png"></span>
                <p>乃电信天翼宫旗下的第一大月兔神兽。相传它能帮助每个地球星人在使用互联网的时候，上网倍速提高至2倍以上。</p>
              </div>
            </div>
            <div class="ydjs_list">
              <div class="ydjs_tx">
                <img src="../../static/img/gztz2.png">
              </div>
              <div class="ydjs_text">
                <span><img src="../../static/img/gztz_title2.png"></span>
                <p>乃电信天翼宫旗下的第二大月兔神兽。相传它能把地球星人的交通坐骑立马变的焕然一新。</p>
              </div>
            </div>
            <div class="ydjs_list">
              <div class="ydjs_tx">
                <img src="../../static/img/gztz3.png">
              </div>
              <div class="ydjs_text">
                <span><img src="../../static/img/gztz_title3.png"></span>
                <p>乃电信天翼宫旗下的第三大月兔神兽。相传它能和每个地球星人心灵感应，何时何地都能感应捕获遗漏电话。</p>
              </div>
            </div>
            <div class="ydjs_list">
              <div class="ydjs_tx">
                <img src="../../static/img/gztz4.png">
              </div>
              <div class="ydjs_text">
                <span><img src="../../static/img/gztz_title4.png"></span>
                <p>乃电信天翼宫旗下的第四大月兔神兽。相传它能帮助每个地球星人未卜先测，提前预知对方的身份信息。</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <!-- <div @click="showToast=false">
          <span class="vux-close"></span>
        </div> -->
    </x-dialog>
    <!-- 兔子属性弹窗 -->
    <x-dialog v-model="rabbitShow" class="rabbit_popup dialog-demo" hide-on-blur>
      <div class="popup_centent">
        <div class="scroll_bottom">
          <img src="../../static/img/xl.png">
        </div>
        <div class="rabbit_popup_hide" @click="rabbitHide">
          <img src="../../static/img/tztc_hide.png">
        </div>
        <div class="rabbit_popup_title">
          <img :src="rabbitData[rabbitType].title">
        </div>
        <div class="rabbit_popup_tz">
          <img :src="rabbitData[rabbitType].tctz">
        </div>
        <div class="rabbit_scroll">
          <div class="rabbit_popup_abstract">
            {{rabbitData[rabbitType].abstract}}
          </div>
          <div class="rabbit_popup_instructions">
            {{rabbitData[rabbitType].instructions}}
          </div>
        </div>

      </div>
      <!-- <div @click="showToast=false">
          <span class="vux-close"></span>
        </div> -->
    </x-dialog>
    <!-- 奖品中心 -->
    <x-dialog v-model="zpzxPopupShow" class="jpzx_popup dialog-demo" hide-on-blur>
      <div class="popup_centent">
        <div class="jpzx_hide" @click="jpzxHide">
          <img src="../../static/img/tztc_hide.png">
        </div>
        <div class="jpzx_title">
          <img src="../../static/img/jpbh.png">
        </div>
        <div class="jpzx_list">
          <img src="../../static/img/jpzx_list.png">
        </div>
      </div>
      <!-- <div @click="showToast=false">
          <span class="vux-close"></span>
        </div> -->
    </x-dialog>
    <!-- 音乐播放控制按钮 -->
    <!-- <div class="wp">
      <img src="https://sfault-avatar.b0.upaiyun.com/408/449/4084493968-55c2142e12b21_huge256">
    </div> -->

    <!-- <div class="progress alert round">
      <span class="meter bar" :style="{width:proBar+'%',}">{{proBar}}</span>
    </div> -->
  </div>
</template>

<script>
import {
  XDialog,
  XButton,
  Group,
  XSwitch,
  TransferDomDirective as TransferDom
} from "vux";

export default {
  directives: {
    TransferDom
  },
  components: {
    XDialog,
    XButton,
    Group,
    XSwitch
  },
  props: ["bgmicon"],
  data() {
    return {
      proBar: 0,
      loadingPage: true,
      isPlaying: false,
      showToast: false,
      rabbitShow: false,
      homePage: false,
      rabbitAnim: 0,
      zpzxPopupShow: false,
      bgmBtn: this.Global.bgmBtn,
      rabbitType: 0,
      cksxPopup: true,

      rabbitData: [
        {
          img: "./static/img/tzlx.png",
          title: "./static/img/tzsx_title1.png",
          abstract:
            "加速兔乃电信天翼宫旗下的第一大月兔神兽。相传它能帮助每个地球星人在使用互联网的时候，上网倍速提高至2倍以上。",
          instructions:
            "技能说明：10元续命包3G国内流量，包内流量为国内流量，可用于4G、3G、2G 上网方式，限在中国大陆境内（不含港澳台地区）使用，不含WLAN（Wi-Fi）上网，主副卡可共享。",
          tctz: "./static/img/sxtz1.png"
        },
        {
          img: "./static/img/tzlx2.png",
          title: "./static/img/tzsx_title2.png",
          abstract:
            "路路兔乃电信天翼宫旗下的第二大月兔神兽。相传它能把地球星人的交通坐骑立马变的焕然一新。",
          instructions:
            "技能说明：用户可以选择深圳市内合作商家免费洗车（仅限5座及5座以下小型车）限绑定车牌使用一次。",
          tctz: "./static/img/sxtz2.png"
        },
        {
          img: "./static/img/tzlx3.png",
          title: "./static/img/tzsx_title3.png",
          abstract:
            "感应兔乃电信天翼宫旗下的第三大月兔神兽。相传它能和每个地球星人心灵感应，无论何时何地都能第一手捕获遗漏电话信息。",
          instructions:
            "技能说明：当客户关机、不在服务区或电话忙的时候，系统会下发漏话提醒短信告知客户具体的漏电时间和来电号码。开通成功即时生效。",
          tctz: "./static/img/sxtz3.png"
        },
        {
          img: "./static/img/tzlx4.png",
          title: "./static/img/tzsx_title4.png",
          abstract:
            "先知兔乃电信天翼宫旗下的第四大月兔神兽。相传它能帮助每个地球星人未卜先测，提前预知对方的身份信息。",
          instructions:
            "技能说明：让接听方准确了解主叫方身份，从而帮助用户在面对“陌生号码”时，减少拒接，提高有效接通率。经过中国电信的认证名片，随着来电呈现在手机屏幕上，如“xx单位给您来电，请您及时接听”，用户就可以明明白白接电话，不再因陌生电话耽误事情。",
          tctz: "./static/img/sxtz4.png"
        }
      ],
      bgmBtnIcon: ["./static/img/yy.png", "./static/img/yy2.png"],
      homeBtn: ["./static/img/home_btn.png", "./static/img/ckwdyt.png"],
      homeIndex: 0
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
    tz() {
      this.$router.push({ name: "cs", params: { id: "1" } });
      console.log("1");
    },
    zpzxTap() {
      this.zpzxPopupShow = true;
    },
    jpzxHide() {
      this.zpzxPopupShow = false;
    },
    change() {
      var clearInt = setInterval(() => {
        this.proBar++;
        if (this.proBar == 100) {
          clearInterval(clearInt);
          this.loadingPage = false;
          this.homePage = true;
          setTimeout(() => {
            this.cksxPopup = false;
          }, 3000);
        }
      }, 20);
    },
    rulesTap() {
      console.log("规则弹窗");
      this.showToast = true;
    },
    homeTap() {
      let data = {
        openid: this.local.openid
      };
      this.getMyGroup(data);
      // this.create(data); //开团
      fiboSDK.btnClick("group", "开团按钮");
    },
    rabbitTap(index) {
      console.log("兔子属性弹窗");
      this.rabbitShow = true;
      this.rabbitType = index;
      switch (index) {
        case 0:
          console.log("加速兔");
          break;
        case 1:
          console.log("路路兔");
          break;
        case 2:
          console.log("感应兔");
          break;
        case 3:
          console.log("先知兔");
          break;
      }
    },
    rabbitHide() {
      this.rabbitShow = false;
    },
    gzHide() {
      this.showToast = false;
    },
    rabbitDh() {
      setInterval(() => {
        if (this.rabbitAnim > 3) {
          this.rabbitAnim = 0;
        } else {
          this.rabbitAnim += 1;
        }
      }, 1000);
    },
    bgmTap() {
      if (this.bgmBtn) {
        this.musicPause("bgm1");
        this.Global.bgmBtn = false;
        this.bgmBtn = false;
        this.$vux.toast.show({
          text: "音乐暂停",
          time: "1500",
          width: "2rem",
          position: "bottom",
          type: "text"
        });
      } else {
        this.musicPldy("bgm1");
        this.Global.bgmBtn = true;
        this.bgmBtn = true;
        this.$vux.toast.show({
          text: "音乐开启",
          time: "1500",
          width: "2rem",
          position: "bottom",
          type: "text"
        });
      }
    },
    cksxPopupTap() {
      this.cksxPopup = false;
    },
    create(data) {
      // this.$router.push({ name: "friends",query: {g_state:0,g_id: 2}});
      this.request(
        "/group/create",
        data,
        "POST",
        "application/x-www-form-urlencoded"
      )
        .then(res => {
          console.log(res);
          if (res.data.ret == 200) {
            console.log("开团成功");
            console.log("开团id" + res.data.data.id);
            this.$router.push({
              name: "friends",
              query: { g_state: 0, g_id: res.data.data.id }
            });
            // this.zjhyMask = true;
          } else {
            this.$vux.toast.show({
              text: res.data.error,
              time: "1500",
              width: "4rem",
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
            width: "4rem",
            position: "middle",
            type: "text"
          });
        });
    },
    getMyGroup(data) {
      this.requestGet(
        "/group/get",
        data,
        "GET",
        "application/x-www-form-urlencoded"
      )
        .then(res => {
          console.log(res);
          if (res.data.ret == 200) {
            console.log("获取个人的团信息,已开团");
            this.$router.push({
              name: "friends",
              query: { g_state: 0, g_id: res.data.data.group.id }
            });
          } else if (res.data.ret == 40180) {
            let data = {
              openid: this.local.openid
            };
            this.create(data);
          } else {
            this.$vux.toast.show({
              text: res.data.error,
              time: "1500",
              width: "4rem",
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
            width: "6rem",
            position: "middle",
            type: "text"
          });
        });
    },
    preloadImage(names, cb, prefix) {
      window.gkaCache = window.gkaCache || [];
      var n = 0,
        img,
        imgs = {};
      names.forEach(function(name) {
        img = new Image();
        window.gkaCache.push(img);
        img.onload = (function(name, img) {
          return function() {
            imgs[name] = img;
            ++n === names.length && cb && cb(imgs);
          };
        })(name, img);
        img.src = (prefix || "") + name;
      });
    }
  },
  created() {
    //页面渲染前调用
    console.log("index渲染前");
    this.change();
    this.preloadImage(
      ["../static/img/ckwdyt.png"],
      function() {
        document.getElementById("gka").className += " animation";
      },
      "img/"
    );
  },
  mounted() {
    //页面渲染完成调用
    const _this = this;
    console.log("index渲染完成调用");
    console.log(this.bgmBtn);
    this.rabbitDh();
    let data = {
      openid: this.local.openid
    };
    this.requestGet(
      "/group/get",
      data,
      "GET",
      "application/x-www-form-urlencoded"
    )
      .then(res => {
        console.log(res);
        if (res.data.ret == 200) {
          console.log("获取个人的团信息,已开团");
          this.homeIndex = 1;
        } else if (res.data.ret == 40180) {
          this.homeIndex = 0;
        } else {
          this.$vux.toast.show({
            text: res.data.error,
            time: "1500",
            width: "4rem",
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
          width: "6rem",
          position: "middle",
          type: "text"
        });
      });

    //微信分享
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
    });
    var share_url = location.href.split("#")[0] + "#" + this.$route.path;

    console.log("参数解析");

    console.log(
      location.href.split("#")[0] + "#" + location.href.split("#")[1]
    );
    console.log("参数解析" + share_url);

    var title = "召集月兔好友，开中秋礼盒";
    var desc = "快变身嫦娥，帮电信宫寻回神技月兔，马上开中秋礼盒～！";
    wechat.shareFriend(
      {
        appmessageTitle: title,
        appmessageDesc: desc,
        link: share_url,
        imgUrl: "https://customer-cdn.tuzhanai.com/xfxb/static/YXsFOQHO.jpg"
      },
      function() {
        // fiboSDK.share("friend");
        console.log("分享成功");
        console.log(share_url);
      },
      function() {
        console.log("cancel");
      }
    );

    wechat.shareTimeline(
      {
        timelineTitle: title,
        link: share_url,
        imgUrl: "https://customer-cdn.tuzhanai.com/xfxb/static/YXsFOQHO.jpg"
      },
      function() {
        // fiboSDK.share("timeline");
      },
      function() {}
    );
    //音乐控制按钮
    // var isPlaying = false;
    // var container = document.querySelector(".wp");
    // var image = container.querySelector("img");

    // image.addEventListener("click", function bindEvent() {
    //   isPlaying ? pause() : play();
    // });

    // function pause() {
    //   isPlaying = false;
    //   var iTransform = getComputedStyle(image).transform;
    //   var cTransform = getComputedStyle(container).transform;
    //   container.style.transform =
    //     cTransform === "none" ? iTransform : iTransform.concat(" ", cTransform);
    //   image.classList.remove("animate");
    //   _this.musicPause("bgm1");
    // }

    // function play() {
    //   isPlaying = true;
    //   image.classList.add("animate");
    //   _this.musicPldy("bgm1");
    // }

    console.log(window.location.href);
    // let data = {
    //   openid: "oVJbgjg26V_2gFC9RBWrz3BYTGJE"
    // };
    // this.request("/brain/matching", data, "POST")
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
    //   .then(res => {
    //     console.log(1);
    //   });
  }
};
</script>
<style lang="less" scoped>
.page,
.pages {
  width: 100%;
  height: 100%;
}
.pages {
  position: relative;
}
.loading_page {
  background: url(../../static/img/loading_bj.png) no-repeat 50% 50%;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.home_page {
  background: url(../../static/img/home_bj.png) no-repeat 50% 0;
  background-size: cover;
}
// 音乐暂停按钮
.wp {
  position: fixed;
  top: 3%;
  right: 3%;
  width: 50px;
  height: 50px;
}
.wp > img {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  display: block;
}

.wp {
  margin: 0 auto;
}

.animate {
  animation: round 10s linear infinite;
}

@keyframes round {
  100% {
    transform: rotate(1turn);
  }
}
//
.rules_btn {
  position: absolute;
  top: 2.7rem;
  left: 0.15rem;
  width: 0.72rem;
}
.bgm_btn {
  position: absolute;
  top: 1.47rem;
  left: 0.15rem;
  width: 0.72rem;
}
.rules_btn img {
  display: block;
  width: 100%;
}
.loading_img {
  width: 2.06rem;
}
.loading_img img {
  display: block;
  width: 100%;
}

.loading_anim span {
  font-size: 0.54rem;
  color: #fff;
  text-align: center;
  display: block;
  position: absolute;
  top: 4rem;
  left: 0;
  width: 100%;
  text-align: center;
}
.logo {
  position: absolute;
  top: 0.52rem;
  left: 0.4rem;
  width: 1.6rem;
}
.logo img {
  display: block;
  width: 100%;
}
.home_title {
  width: 7.1rem;
  margin: 0 auto;
}
.home_title img {
  display: block;
  width: 100%;
}
.prompt {
  width: 3.82rem;
  position: absolute;
  left: 50%;
  margin-left: -1.91rem;
  top: 3.8rem;
}
.prompt img {
  display: block;
  width: 100%;
}
.rabbit_box {
  width: 100%;
  height: 2.8rem;
  background: url(../../static/img/tz_bottom.png) no-repeat 0 0;
  background-size: 100% 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}
.rabbit_box_img {
  width: 90%;
  position: absolute;
  top: -2.45rem;
  left: 50%;
  margin-left: -45%;
  display: flex;
  justify-content: space-between;
}
.rabbit_list {
  width: 1.38rem;
}
.rabbit_list img {
  display: block;
  width: 100%;
}
.rabbit_bj {
  width: 100%;
}
.rabbit_bj img {
  display: block;
  width: 100%;
}
.home_btn {
  width: 3.45rem;
  position: absolute;
  left: 50%;
  margin-left: -1.725rem;
  bottom: 0.5rem;
}
.home_btn img {
  width: 100%;
  display: block;
}
.rabbit_popup /deep/ .weui-dialog {
  background: url(../../static/img/tztc_bj.png) no-repeat 0 0;
  background-size: 100%;
  height: 9.7rem;
  max-width: 6.85rem;
  width: 6.85rem;
  overflow: inherit;
}
.rabbit_popup_title {
  width: 4.86rem;
  margin: 0 auto;
  margin-top: 0.7rem;
}
.rabbit_popup_title img {
  display: block;
  width: 100%;
}
.rabbit_popup_tz {
  width: 1.92rem;
  margin: 0 auto;
}
.rabbit_popup_tz img {
  display: block;
  width: 100%;
}
.rabbit_popup_abstract {
  font-size: 0.24rem;
  color: #be8235;
  width: 4.85rem;
  margin: 0 auto;
  text-align: left;
  padding: 0.35rem 0;
  line-height: 0.42rem;
  border-bottom: solid 1px #facf8b;
}
.rabbit_popup_instructions {
  font-size: 0.24rem;
  color: #be8235;
  width: 4.85rem;
  margin: 0 auto;
  text-align: left;
  padding: 0.35rem 0;
  line-height: 0.42rem;
}
.rabbit_popup_hide {
  position: absolute;
  top: 0.39rem;
  right: -0.2rem;
  width: 0.8rem;
}
.rabbit_popup_hide img {
  display: block;
  width: 100%;
}
.rabbit_box_img .rabbit_list {
  animation-iteration-count: infinite;
}
.rules_text {
  width: 4.95rem;
  margin: 0 auto;
}
.rules_text p {
  font-size: 0.18rem;
  color: #be8235;
  text-align: left;
  line-height: 0.3rem;
  margin-bottom: 0.2rem;
}
.ydjs_title {
  width: 2.76rem;
  margin: 0 auto;
}
.ydjs_title img {
  width: 100%;
  display: block;
}
.ydjs_text span {
  width: 0.8rem;
  font-size: 0.18rem;
  color: #be8235;
  display: block;
  margin-bottom: 0.1rem;
}
.ydjs_text span img {
  display: block;
  width: 100%;
}
.ydjs_text p {
  font-size: 0.18rem;
  color: #be8235;
}
.ydjs_tx {
  width: 0.72rem;
}
.ydjs_tx img {
  display: block;
  width: 100%;
}
.ydjs_list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.18rem;
}
.ydjs_text {
  width: 4.2rem;
  text-align: left;
}
.ydjs {
  width: 5.2rem;
  margin: 0 auto;
}
.scroll_box {
  overflow: scroll;
  height: 6.34rem;
  position: relative;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 0.4rem;
}
.scroll_bottom {
  width: 5.4rem;
  position: absolute;
  left: 50%;
  margin-left: -2.7rem;
  bottom: 0.5rem;
  z-index: 5;
}
.scroll_bottom img {
  display: block;
  width: 100%;
}
.rabbit_scroll {
  height: 3.9rem;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}

//

.loading_gka {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
}
#gka {
  margin-top: 0.5rem;
}
.animation {
  width: 100%;
  height: 100%;
  padding-bottom: 177.86666666666667%;
  background-size: 2400% 100%;
  background-image: url("../../static/img/sprites.png");
  background-repeat: no-repeat;
  animation-name: keyframes-zq;
  animation-duration: 3s;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  animation-timing-function: steps(1);
}

@-webkit-keyframes keyframes-zq {
  0% {
    background-image: url("../../static/img/sprites.png");
    background-position: 4.3478260869565215% 0%;
    background-size: 2400% 100%;
  }
  4.00% {
    background-position: 52.17391304347826% 0%;
  }
  8.00% {
    background-position: 4.3478260869565215% 0%;
  }
  12.00% {
    background-position: 8.695652173913043% 0%;
  }
  16.00% {
    background-position: 13.043478260869565% 0%;
  }
  20.00% {
    background-position: 17.391304347826086% 0%;
  }
  24.00% {
    background-position: 21.73913043478261% 0%;
  }
  28.00% {
    background-position: 26.08695652173913% 0%;
  }
  32.00% {
    background-position: 30.434782608695656% 0%;
  }
  36.00% {
    background-position: 34.78260869565217% 0%;
  }
  40.00% {
    background-position: 39.130434782608695% 0%;
  }
  44.00% {
    background-position: 43.47826086956522% 0%;
  }
  48.00% {
    background-position: 47.82608695652174% 0%;
  }
  52.00% {
    background-position: 0% 0%;
  }
  56.00% {
    background-position: 56.52173913043478% 0%;
  }
  60.00% {
    background-position: 60.86956521739131% 0%;
  }
  64.00% {
    background-position: 65.21739130434783% 0%;
  }
  68.00% {
    background-position: 69.56521739130434% 0%;
  }
  72.00% {
    background-position: 73.91304347826086% 0%;
  }
  76.00% {
    background-position: 78.26086956521739% 0%;
  }
  80.00% {
    background-position: 82.6086956521739% 0%;
  }
  84.00% {
    background-position: 86.95652173913044% 0%;
  }
  88.00% {
    background-position: 91.30434782608695% 0%;
  }
  92.00% {
    background-position: 95.65217391304348% 0%;
  }
  96.00% {
    background-position: 100% 0%;
  }
  100% {
    background-position: 100% 0%;
  }
}
.cksx_popup {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.9);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cksx_popup_img {
  width: 3.14rem;
}
.cksx_popup_img img {
  display: block;
  width: 100%;
}
.prize_zx {
  width: 0.7rem;
  position: fixed;
  top: 1.8rem;
  right: 0.14rem;
  z-index: 5;
}
.prize_zx img {
  display: block;
  width: 100%;
}
.jpzx_popup /deep/ .weui-dialog {
  background: url(../../static/img/jpzxtc_bj.png) no-repeat 0 0;
  background-size: 100% 100%;
  width: 6.8rem;
  height: 10.5rem;
  overflow: inherit;
}
.jpzx_title {
  width: 4.9rem;
  margin: 0 auto;
  margin-top: 0.64rem;
}
.jpzx_title img {
  display: block;
  width: 100%;
}
.jpzx_list {
  width: 4.2rem;
  margin: 0 auto;
}
.jpzx_list img {
  display: block;
  width: 100%;
}
.jpzx_hide {
  position: absolute;
  top: 0.39rem;
  right: -0.2rem;
  width: 0.8rem;
}
.jpzx_hide img {
  display: block;
  width: 100%;
}
</style>