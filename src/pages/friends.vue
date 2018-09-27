<template>
  <div class="page friends_page">
    <!-- 是否关注 -->
    <div class="focus" v-show="focus">
      <div class="focus_popup">
        <div class="focus_title">
          <img src="../../static/img/gzwm.png">
        </div>
        <div class="focus_text">
          <p>请关注翼头条公众号，</p>
          <p>方可参与召集或被召集哟</p>
        </div>
        <div class="focus_rwm">
          <img src="../../static/img/gzrwm.png">
        </div>
        <div class="focus_taost">
          长按识别关注公众号
        </div>
      </div>

    </div>
    <div class="business" @click="business">
      <img src="../../static/img/zqjx.png">
    </div>
    <div class="user_name">
      {{myName}}的月兔好友
    </div>
    <div class="friends_centent">
      <div class="friends_progress">
        <div class="hh_img">
          <img src="../../static/img/hh.png">
        </div>
        <div class="progress_box">
          <div class="progress_num">
            {{hyNum}}/4
          </div>
          <div class="progress_flex">
            <div class="progress">
              <span v-bind:style="progressStyle"></span>
            </div>
            <div class="progress_btn" @click="friendsTap">
              <img src="../../static/img/qwcj_btn.png">
            </div>
          </div>

        </div>
        <div class="friends_num">
          {{myName}}已召集{{hyNum}}只月兔
        </div>
      </div>
      <div class="friends_btn_box">

        <div class="friends_btn" @click="homeTap" v-if="groupState == 1">
          <img :src="groupBtn[2]">
        </div>
        <div class="friends_btn" @click="zjTap">
          <img :src="groupBtn[groupState]">
        </div>
      </div>

      <div class="call_friends">
        <div class="friends_tz" v-for="(item,index) in friendsData" :key="index">
          <img :src=" item.state ? item.img : item.img_ts ">
        </div>

      </div>
    </div>
    <div class="zjhy_mask" v-show="zjhyMask" @click="zjhyMaskTap">
      <span><img src="../../static/img/zhhy.png"></span>
    </div>
  </div>
</template>

<script>
import { querystring } from "vux";
export default {
  components: {
    querystring
  },
  props: {},
  data() {
    return {
      myName: this.local.nickname,
      hyNum: 1,
      zjhyMask: false,
      focus: false,
      progressStyle: {
        width: 0,
        transition: "width 1s"
      },
      friendsData: [
        {
          img: "./static/img/zjhytz1.png",
          img_ts: "./static/img/zjhytz1_qs.png"
        },
        {
          img: "./static/img/zjhytz2.png",
          img_ts: "./static/img/zjhytz2_qs.png"
        },
        {
          img: "./static/img/zjhytz3.png",
          img_ts: "./static/img/zjhytz3_qs.png"
        },
        {
          img: "./static/img/zjhytz4.png",
          img_ts: "./static/img/zjhytz4_qs.png"
        }
      ],
      groupBtn: [
        "./static/img/zjhy.png",
        "./static/img/cwtdyt.png",
        "./static/img/wytbce.png"
      ],
      groupState: null
    };
  },
  watch: {
    //观察Vue实例上的数据变动
    hyNum: function() {
      console.log("数据变化了");
      console.log(this.hyNum);
      for (let i = 0; i < this.hyNum; i++) {
        this.friendsData[i].state = true;
      }
      this.progressStyle.width = this.hyNum * 25 + "%";
    }
  },
  computed: {
    //DOM加载后马上执行能够缓存数据
  },
  methods: {
    //触发事件
    zjhyMaskTap() {
      this.zjhyMask = false;
    },
    getUrlKey(name) {
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
            location.href
          ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    },
    friendsTap() {
      this.$router.push({ name: "luckyDraw" });
    },
    homeTap() {
      this.$router.push({ name: "index" });
    },
    zjTap() {
      if (this.groupState == 0) {
        console.log("开团状态");
        this.zjhyMask = true;
      } else if (this.groupState == 1) {
        console.log("参团状态");
        let data = {
          openid: this.local.openid,
          group_id: this.$route.query.g_id
        };
        this.joinGroup(data);
      }
      fiboSDK.btnClick('zjhy', '召集好友');
    },
    business() {
      window.location.href = "http://llwb.sz189.cn/cll/ttdg/ttdgIndex.html"
    },
    joinGroup(data) {
      this.request(
        "/group/join",
        data,
        "POST",
        "application/x-www-form-urlencoded"
      )
        .then(res => {
          console.log(res);
          if (res.data.ret == 200) {
            console.log("加入团中成功");
            console.log(this.hyNum);
            var dl = this.hyNum++;
            console.log("dl" + dl);
            for (let i = 0; i < dl; i++) {
              this.friendsData[i].state = true;
            }
            console.log(this.friendsData);
            this.$vux.toast.show({
              text: "恭喜您,获得抽奖机会!",
              time: "2000",
              width: "5rem",
              position: "middle",
              type: "text"
            });
          } else {
            this.$vux.toast.show({
              text: res.data.error,
              time: "2000",
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
            console.log("获取个人的团信息");
            this.progressStyle.width = res.data.data.join_count * 25 + "%";
            this.hyNum = res.data.data.join_count;
            for (let i = 0; i < res.data.data.join_count; i++) {
              this.friendsData[i].state = true;
            }
            console.log(this.friendsData);
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
    getStatus(data) {
      this.requestGet(
        "/group/get_status",
        data,
        "GET",
        "application/x-www-form-urlencoded"
      )
        .then(res => {
          console.log(res);
          if (res.data.ret == 200) {
            console.log("获取团信息");
            this.progressStyle.width = res.data.data.join_count * 25 + "%";
            this.hyNum = res.data.data.join_count;
            for (let i = 0; i < res.data.data.join_count; i++) {
              this.friendsData[i].state = true;
            }
            console.log(this.friendsData);
            this.myName = res.data.data.group.creater_name;
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
    }
  },
  created() {
    //页面渲染前调用
  },
  mounted() {
    //页面渲染完成调用
    console.log("全局openid");
    console.log(this.$route.query.g_state);
    console.log(this.$route.query.g_id);
    var gState = this.$route.query.g_state; //开团或参团

    this.groupState = gState;
    if (this.groupState == 0) {
      console.log("开团状态");
      let data = {
        openid: this.local.openid
      };
      this.getMyGroup(data); //获取个人的团信息
    } else if (this.groupState == 1) {
      console.log("参团状态");
      let data = {
        openid: this.local.openid,
        group_id: this.$route.query.g_id
      };
      this.getStatus(data); //获取团信息
    }

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
    var share_url =
      location.href.split("#")[0] +
      "#" +
      this.$route.path +
      "?g_state=1&g_id=" +
      this.$route.query.g_id;

    console.log("参数解析");

    console.log(
      location.href.split("#")[0] + "#" + location.href.split("#")[1]
    );
    console.log("参数解析" + share_url);

    var title = "我在寻找月兔小可爱，快来被我领养吧～";
    var desc = "电信宫特派我下凡寻回你，戳进来一起中秋有礼。";
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

    //是否关注

    wechat.getSubscribe(this.local.openid, (err, res) => {
      if (err) {
        return alert(err);
      } else {
        var flag = res.subscribe;
        if (flag) {
          console.log("已关注");
          this.focus = false;
        } else {
          console.log("未关注");
          this.focus = true;
        }
      }
    });
  }
};
</script>
<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  position: relative;
}
.friends_page {
  background: url(../../static/img/hy_bj.png) no-repeat 50% 0;
  background-size: cover;
}
.user_name {
  font-size: 0.32rem;
  color: #ffe989;
  width: 100%;
  text-align: center;
  padding-top: 1.9rem;
}
.friends_centent {
  position: absolute;
  bottom: 0.35rem;
  left: 0;
  width: 1.25rem;
  width: 100%;
}
.call_friends {
  display: flex;
  justify-content: space-between;
  padding: 0 0.53rem;
}
.friends_tz {
  width: 1.2rem;
}
.friends_tz img {
  display: block;
  width: 100%;
}
.friends_btn {
  width: 3.3rem;
  margin: 0 auto;
  margin-bottom: 0.3rem;
}
.friends_btn img {
  display: block;
  width: 100%;
}
.friends_num {
  font-size: 0.26rem;
  color: #ffeca0;
  margin-top: 0.1rem;
}
.friends_progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.35rem;
  // background: url(../../static/img/hh.png) no-repeat 0 0;
  // background-size: 2.22rem;
  // height: 4.83rem;
}
.progress {
  width: 2.9rem;
  background: #611c1e;
  height: 0.24rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  padding: 0 0.03rem;
}
.progress_flex {
  display: flex;
  align-items: center;
}
.progress span {
  height: 0.18rem;
  display: block;
  background: url(../../static/img/jdt.png) no-repeat 0 0;
  background-size: 100% 100%;
  transition: width 1s;
}
.progress_num {
  width: 2.9rem;
  font-size: 0.24rem;
  color: #ffeca0;
  text-align: right;
}
.progress_btn {
  width: 1.38rem;
  margin-left: 0.1rem;
}
.progress_btn img {
  display: block;
  width: 100%;
}
.hh_img {
  width: 2.22rem;
  position: absolute;
  left: 0;
  top: -0.6rem;
}
.hh_img img {
  display: block;
  width: 100%;
}
.zjhy_mask {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  padding-top: 1.5rem;
}
.zjhy_mask span {
  width: 4.4rem;
}
.zjhy_mask img {
  display: block;
  width: 100%;
}
.friends_btn_box {
  display: flex;
  justify-content: space-between;
}
.focus {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.focus_popup{
  width: 6.85rem;
  height: 7.2rem;
  background: url(../../static/img/cjtc_bj.png) no-repeat 0 0;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.focus_title{
  width: 4.88rem;
}
.focus_title img{
  display: block;
  width: 100%;
}
.focus_text p{
  font-size: 0.28rem;
  color: #be8235;
}
.focus_rwm{
  width: 2.62rem;
  margin:0.4rem 0;
}
.focus_rwm img{
  display: block;
  width: 100%;
}
.focus_taost{
  font-size: 0.24rem;
  color: #be8235;
}
.business{
  width: 1rem;
  position: fixed;
  top:1.5rem;
  right: 0.2rem;
}
.business img{
  display: block;
  width: 100%;
}
</style>