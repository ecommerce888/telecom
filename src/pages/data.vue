<template>
  <div class="page data_page">
    <div class="data_title">
      <img src="../../static/img/txxx.png">
    </div>
    <div class="card_number" v-if="level == 8">
      <div class="card_List">
        <span>券号：</span>
        <p>{{redeemcode}}</p>
      </div>
      <div class="card_List">
        <span>密码：</span>
        <p>{{password}}</p>
      </div>
    </div>
    <div class="form" v-if="level == 11">
      <group>
        <x-input title="" v-model="name" placeholder="姓名"></x-input>
      </group>
    </div>
    <div class="form">
      <group>
        <x-input title="" v-model="tel" placeholder="手机号码"></x-input>
      </group>
    </div>
    <div class="form code_form">
      <group>
        <x-input title="" v-model="yzm" placeholder="验证码"></x-input>
        <x-button @click.native="codeTap" type="default" :disabled="disabled" :show-loading="btnLoading">{{codeText}}</x-button>
      </group>
    </div>
    <div class="sub_btn" @click="submitTap">
      <img src="../../static/img/tj_btn.png">
    </div>
    <div class="data_text" v-if="level < 6">
      <p>
        <b>
          <i> · </i>温馨提示</b>
        <span>话费充值不限运营商，三网均可充值。</span>
      </p>
    </div>
    <div class="data_text" v-if="level == 6">
      <p>
        <b>
          <i> · </i>领取方式</b>
        <span>1.输入手机号，获取验证码并提交，活动结束后两个工作日内，我们会短信通知，收到通知后进行第2步操作；</span>
        <span>2.扫码关注“车路路”微信公众号（chelulu114），点击“车务服务”选择“洗车/维修”，选择任意一个商家登录领取免费洗车券；</span>
        <span>3.免费洗车券全市合作商家通用，请在有效期内使用。</span>
      </p>
    </div>
    <div class="data_text" v-if="level == 7">
      <p>
        <b>
          <i> · </i>领取方式</b>
        <span>1. 输入手机号，获取验证码并提交；</span>
        <span>2. 活动结束后，电影票会以短信的形式发送到您手机，请注意查收。</span>
        <span>* 仅限深圳本地用户使用</span>
      </p>
    </div>
    <div class="data_text" v-if="level == 8">
      <p>
        <b>
          <i> · </i>领取方式</b>
        <span>1． 截图保存券号和密码；</span>
        <span>2. 输入手机号，获取验证码并提交；</span>
        <span>3. 关注院线通电影票公众号，选择电影场次订座，支付时添加兑换券进行抵扣。</span>
        <span>* 仅限深圳本地用户使用</span>
      </p>
    </div>
    <div class="data_text" v-if="level == 9 || level == 10">
      <p>
        <b>
          <i> · </i>领取方式</b>
        <span>1. 输入手机号，获取验证码并提交；</span>
        <span>2. 活动结束后，流量将自动充值到账；</span>
        <span>3. 三网用户均可充值。</span>
      </p>
    </div>
    <div class="data_text" v-if="level == 11">
      <p>
        <b>
          <i> · </i>领取方式</b>
        <span>1. 输入手机号，获取验证码并提交；</span>
        <span>2. 活动结束后，客服将与您联系，免费开通1个月来电名片体验服务。</span>
      </p>
    </div>
    <div class="rwm_img" v-if="level == 8">
      <img src="../../static/img/rwm.png">
    </div>
    <div class="rwm_img" v-if="level == 6">
      <img src="../../static/img/cllrwm.png">
    </div>
    <div class="fh_home" @click="fhTap">
      <img src="../../static/img/fhhome.png">
    </div>
    <div class="sub_mask" v-show="subMask">
      <span>
        <div class="sub_mask_hide" @click="subMaskHide">
          <img src="../../static/img/tjgb.png">
        </div>
        <img src="../../static/img/tjcg.png">
      </span>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton } from "vux";

export default {
  components: {
    XInput,
    Group,
    XButton
  },
  props: {},
  data() {
    return {
      tel: "",
      yzm: "",
      btnLoading: false,
      disabled: false,
      codeText: "获取验证码",
      level: this.$route.params.level,
      prizeId: this.$route.params.prize_id,
      redeemcode: this.$route.params.redeemcode,
      password: this.$route.params.password,
      subMask: false,
      name: ""
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
    subMaskHide() {
      this.subMask = false;
    },
    fhTap() {
      this.$router.push({ name: "luckyDraw" });
    },
    codeTap() {
      if (this.tel == "") {
        this.$vux.toast.show({
          text: "请填写手机号码",
          time: "1500",
          width: "4rem",
          position: "middle",
          type: "text"
        });
      } else if (!/^[1][3,4,5,6,7,8][0-9]{9}$/.test(this.tel)) {
        this.$vux.toast.show({
          text: "请填写正确手机号码",
          time: "1500",
          width: "4rem",
          position: "middle",
          type: "text"
        });
      } else {
        this.btnLoading = true;
        this.disabled = true;
        this.codeText = "发送中";
        setTimeout(() => {
          this.btnLoading = false;
          this.codeText = 60;
          let data = {
            phone_num: this.tel
          };
          this.sendMes(data);
        }, 500);
        this.codeTime();
      }
    },
    codeTime() {
      var _codeDjs = setInterval(() => {
        this.codeText -= 1;
        if (this.codeText <= 0) {
          this.codeText = "重新获取";
          this.disabled = false;
          clearInterval(_codeDjs);
        } else {
        }
      }, 1000);
    },
    submitTap() {
      console.log("等级" + this.level);
      if (this.level == 11) {
        if (this.name == "") {
          this.$vux.toast.show({
            text: "请填写姓名",
            time: "1500",
            width: "4rem",
            position: "middle",
            type: "text"
          });
        } else if (this.tel == "") {
          this.$vux.toast.show({
            text: "请填写手机号码",
            time: "1500",
            width: "4rem",
            position: "middle",
            type: "text"
          });
        } else if (!/^[1][3,4,5,6,7,8][0-9]{9}$/.test(this.tel)) {
          this.$vux.toast.show({
            text: "请填写正确手机号码",
            time: "1500",
            width: "4rem",
            position: "middle",
            type: "text"
          });
        } else if (this.yzm == "") {
          this.$vux.toast.show({
            text: "请填写验证码",
            time: "1500",
            width: "4rem",
            position: "middle",
            type: "text"
          });
        } else {
          let data = {
            openid: this.local.openid,
            prize_id: this.prizeId,
            check_code: this.yzm,
            phone_num: this.tel,
            honoree: this.name
          };
          this.getPrize(data);
          fiboSDK.btnClick("lqjp", "领取奖品");
        }
      } else {
        if (this.tel == "") {
          this.$vux.toast.show({
            text: "请填写手机号码",
            time: "1500",
            width: "4rem",
            position: "middle",
            type: "text"
          });
        } else if (!/^[1][3,4,5,6,7,8][0-9]{9}$/.test(this.tel)) {
          this.$vux.toast.show({
            text: "请填写正确手机号码",
            time: "1500",
            width: "4rem",
            position: "middle",
            type: "text"
          });
        } else if (this.yzm == "") {
          this.$vux.toast.show({
            text: "请填写验证码",
            time: "1500",
            width: "4rem",
            position: "middle",
            type: "text"
          });
        } else {
          let data = {
            openid: this.local.openid,
            prize_id: this.prizeId,
            check_code: this.yzm,
            phone_num: this.tel,
            honoree: this.name
          };
          this.getPrize(data);
          fiboSDK.btnClick("lqjp", "领取奖品");
        }
      }
    },
    sendMes(data) {
      this.requestGet(
        "/prize/send_mes",
        data,
        "GET",
        "application/x-www-form-urlencoded"
      )
        .then(res => {
          console.log(res);
          if (res.data.ret == 200) {
            console.log("获取验证码");
            this.$vux.toast.show({
              text: "发送成功",
              time: "1500",
              width: "4rem",
              position: "middle",
              type: "text"
            });
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
    getPrize(data) {
      this.request(
        "/prize/get_prize",
        data,
        "POST",
        "application/x-www-form-urlencoded"
      )
        .then(res => {
          console.log(res);
          if (res.data.ret == 200) {
            console.log("领取奖品");
            this.subMask = true;
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
            time: "2000",
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
    console.log("等级");
    console.log(this.$route.params.level);

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
  }
};
</script>
<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  position: relative;
}
.data_page {
  background: url(../../static/img/cj_bj.png) no-repeat 50% 0;
  background-size: cover;
}
.data_title {
  width: 4.9rem;
  margin: 0 auto;
  padding-top: 0.1rem;
}
.data_title img {
  display: block;
  width: 100%;
}
.form {
  width: 5.6rem;
  border: solid 2px #b82214;
  border-radius: 0.3rem;
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 0.25rem;
}
.form /deep/ .weui-cells {
  margin: 0;
}
.form /deep/ .weui-input {
  font-size: 0.3rem;
  padding: 0;
  height: 0.8rem;
  padding: 0 0.2rem;
}
.form .weui-cell {
  padding: 0;
}
.code_form .weui-cell {
  width: 3.7rem;
}
.code_form /deep/ .vux-no-group-title {
  display: flex;
  width: 100%;
}
.code_form button {
  width: 1.93rem;
  color: #fff;
  font-size: 0.28rem;
  background: #b82214;
  padding: 0;
  border-radius: 0;
}
.sub_btn {
  width: 2.9rem;
  margin: 0 auto;
}
.sub_btn img {
  display: block;
  width: 100%;
}
.data_text {
  width: 5.6rem;
  margin: 0 auto;
  margin-top: 0.1rem;
}

.data_text p b {
  font-size: 0.2rem;
  color: #ffeca0;
  line-height: 0.36rem;
  display: block;
  border-bottom: solid 1px #fee49d;
  padding: 0.1rem 0;
}
.data_text p b i {
}
.data_text p span {
  font-size: 0.2rem;
  color: #ffeca0;
  line-height: 0.36rem;
  display: block;
}
.rwm_img {
  width: 1.6rem;
  margin: 0 auto;
  margin-top: 0.2rem;
}
.rwm_img img {
  display: block;
  width: 100%;
}
.fh_home {
  width: 3.45rem;
  position: absolute;
  left: 50%;
  margin-left: -1.725rem;
  bottom: 0.3rem;
}
.fh_home img {
  display: block;
  width: 100%;
}
.weui-btn:after {
  border: none;
}
.weui-btn_disabled.weui-btn_default {
  opacity: 0.8;
}
.card_number {
  display: flex;
  width: 5.6rem;
  margin: 0 auto;
  justify-content: space-between;
  margin-bottom: 0.1rem;
}
.card_List span {
  font-size: 0.2rem;
  color: #fff;
  display: block;
  margin-bottom: 0.1rem;
}
.card_List p {
  font-size: 0.24rem;
  color: #646464;
  width: 2rem;
  height: 0.48rem;
  background: #feffff;
  border: solid 1px #b82214;
  border-radius: 0.2rem;
  padding-left: 0.2rem;
  line-height: 0.48rem;
}
.sub_mask {
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sub_mask span {
  display: block;
  width: 5.42rem;
  position: relative;
}
.sub_mask span img {
  display: block;
  width: 100%;
}
.sub_mask .sub_mask_hide img {
  width: 0.7rem;
  position: absolute;
  top: 0;
  right: 0;
}
</style>