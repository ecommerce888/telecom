<template>
  <div class="page luckydraw_page">
    <div class="prize_zx" @click="zpzxTap">
      <img src="../../static/img/jp.png">
    </div>
    <div class="luckydraw_title">
      <img src="../../static/img/cj_title.png">
    </div>
    <div class="luckydraw_box">
      <div class="cjhz" @click="luckdrawTap">
        <img src="../../static/img/bx.png">
      </div>
      <div class="luckydraw_toats">
        <p>点击礼盒抽奖</p>
        <p>你还可开启礼盒{{luckydrawNum}}次</p>
      </div>
      <div class="luckydraw_btn">
        <span @click="myPrizeTap">
          <img src="../../static/img/zjxx_btn.png">
        </span>
        <span @click="homeTap">
          <img src="../../static/img/fhhome.png">
        </span>
      </div>
    </div>
    <!--loading  -->
    <!-- <div class="loading_mask" v-show="true">
      <div class="loading_popup">
        <div class="loading_icon">
          <spinner :type="types[7]"></spinner>
          <p>加载中</p>
        </div>

      </div>
    </div> -->
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

    <!-- 中奖弹窗 -->
    <x-dialog v-model="zjPopupShow" class="cj_popup dialog-demo" hide-on-blur>
      <div class="popup_centent">

        <div class="cj_title">
          <img :src="level < 13 ? zjTitle[0] : zjTitle[1]">
        </div>
        <div class="prize">
          <img v-if="level >= 0" :src="myprizeListData[level].icon">
        </div>
        <div class="prize_text">
          <h6 v-if="level < 13">恭喜您获得</h6>
          <h5 v-if="level >= 0">{{myprizeListData[level].name}}</h5>
          <h5 v-if="level == 13">
            <span>{{myprizeListData[level].wzname[0]}}</span>
            <span>{{myprizeListData[level].wzname[1]}}</span>
          </h5>
          <div v-if="level == 12">
            <p>温馨提示</p>
            <p>1.每位用户只能领取一次。</p>
            <p>2.多个渠道不得重复领取。</p>
          </div>

        </div>
        <div class="prize_btn" @click="dataTap">
          <img :src="level < 13 ? zjBtn[0] : zjBtn[1]">
        </div>
      </div>
      <!-- <div @click="showToast=false">
          <span class="vux-close"></span>
        </div> -->
    </x-dialog>
    <!-- 我的奖品 -->
    <div class="myprize_page" v-show="myprizePage">
      <div class="myprize_centent">
        <div class="myprize_title">
          <img src="../../static/img/wdjp.png">
        </div>
        <div class="myprize_scroll">
          <div class="myprize_list" v-for="(item,index) in myprizeListApi" :key="index">
            <div class="myprize_icon">
              <p>
                <img :src="myprizeListData[item.level - 1].icon">
              </p>
              <span>{{myprizeListData[item.level - 1].name}}</span>
            </div>
            <div class="myprize_btn" @click="myprizelqTap(item.state,item.level,item.id,item.redeem_code,item.password)">
              <img :src="lqState[item.state]">
            </div>
          </div>

        </div>

      </div>
      <div class="myprize_fh" @click="myprizefhTap">
        <img src="../../static/img/fhhome.png">
      </div>
    </div>
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
  components: {
    XDialog,
    XButton,
    Group,
    XSwitch
  },
  props: {},
  data() {
    return {
      luckydrawNum: this.Global.luckydrawNum, //抽奖次数
      zjPopupShow: false,
      zpzxPopupShow: false,
      myjpPopupShow: false,
      myprizePage: false,
      myprizeListApi: "",
      level: -1,
      cjTapNum: true,
      prizeId: "",
      redeemcode: "",
      password: "",
      types: [
        "android",
        "ios",
        "ios-small",
        "bubbles",
        "circles",
        "crescent",
        "dots",
        "lines",
        "ripple",
        "spiral"
      ],
      myprizeListData: [
        {
          icon: "./static/img/jp1.png",
          name: "1元面值话费卡"
        },
        {
          icon: "./static/img/jp2.png",
          name: "2元面值话费卡"
        },
        {
          icon: "./static/img/jp3.png",
          name: "10元话费卡"
        },
        {
          icon: "./static/img/jp4.png",
          name: "50面值话费卡"
        },
        {
          icon: "./static/img/jp5.png",
          name: "100面值话费卡"
        },
        {
          icon: "./static/img/jp6.png",
          name: "200面值话费卡"
        },
        {
          icon: "./static/img/jp7.png",
          name: "车路路免费洗车券"
        },
        {
          icon: "./static/img/jp8.png",
          name: "院线通电影票"
        },
        {
          icon: "./static/img/jp9.png",
          name: "院线通电影票抵扣券"
        },
        {
          icon: "./static/img/jp10.png",
          name: "1GB流量"
        },
        {
          icon: "./static/img/jp11.png",
          name: "500MB流量"
        },
        {
          icon: "./static/img/jp12.png",
          name: "一个月来电名片服务"
        },
        {
          icon: "./static/img/jp13.png",
          name: "ofo免费骑行"
        },
        {
          icon: "./static/img/wzj.png",
          wzname: ["奖品与您擦肩而过", "下次再来试试吧"]
        }
      ],
      lqState: ["./static/img/dlq.png", "./static/img/ylq.png"],
      zjTitle: ["./static/img/gxzj_title.png", "./static/img/myzj.png"],
      zjBtn: ["./static/img/qwlq_btn.png", "./static/img/hd.png"]
    };
  },
  // watch: {
  //   //观察Vue实例上的数据变动
  //   "$route": {
  //     handler(route) {
  //       if (route.name === "luckyDraw") {
  //         console.log("每次执行")
  //       }
  //     }
  //   }
  // },
  computed: {
    //DOM加载后马上执行能够缓存数据
  },
  methods: {
    //触发事件
    jpzxHide() {
      this.zpzxPopupShow = false;
    },
    luckdrawTap() {
      console.log("开始抽奖");
      if (this.cjTapNum) {
        this.cjTapNum = false;
        let data = {
          openid: this.local.openid
        };
        this.lottery(data);
        fiboSDK.btnClick("cj", "开始抽奖");
        
      }
    },
    dataTap() {
      if (this.level < 13) {
        if (this.level <= 11) {
          this.$router.push({
            name: "data",
            params: {
              level: this.level,
              prize_id: this.prizeId,
              redeemcode: this.redeemcode,
              password: this.password
            }
          });
        } else {
          window.location.href =
            "http://ofo-campaign.ofo.com/yearcardtob/index.html#/?channel=15361407072125&platform=1";
        }
      } else {
        this.zjPopupShow = false;
      }
    },
    homeTap() {
      console.log(this.Global.luckydrawNum);
      this.luckydrawNum = this.Global.luckydrawNum;
      this.$router.push({ name: "index" });
    },
    zpzxTap() {
      this.zpzxPopupShow = true;
    },
    myPrizeTap() {
      this.myprizePage = true;
      let data = {
        openid: this.local.openid
      };
      this.prizeList(data);
    },
    myprizefhTap() {
      this.myprizePage = false;
    },
    myprizelqTap(state, level, id, redeem_code, password) {
      if (state == 0) {
        if (level - 1 < 12) {
          this.$router.push({
            name: "data",
            params: {
              level: level - 1,
              prize_id: id,
              redeemcode: redeem_code,
              password: password
            }
          });
        } else {
          window.location.href =
            "http://ofo-campaign.ofo.com/yearcardtob/index.html#/?channel=15361407072125&platform=1";
        }
      }
    },
    prizeList(data) {
      this.requestGet(
        "/prize/list",
        data,
        "GET",
        "application/x-www-form-urlencoded"
      )
        .then(res => {
          console.log(res);
          if (res.data.ret == 200) {
            console.log("获取用户奖品列表");
            this.myprizeListApi = res.data.data;
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
    lottery(data) {
      this.request(
        "/prize/lottery",
        data,
        "POST",
        "application/x-www-form-urlencoded"
      )
        .then(res => {
          console.log(res);
          this.cjTapNum = true;
          if (res.data.ret == 200) {
            console.log("抽奖成功");
            this.luckydrawNum = res.data.data.user.lottery_num;
            if (res.data.data.bingo == true) {
              console.log("中奖");
              this.zjPopupShow = true;
              this.level = res.data.data.prize.level - 1;
              this.prizeId = res.data.data.prize.id;
              this.redeemcode = res.data.data.prize.redeem_code;
              this.password = res.data.data.prize.password;
              // switch (res.data.data.prize.level) {
              //   case 1:
              //     console.log("1元面值话费卡");
              //     break;
              //   case 2:
              //     console.log("2元面值话费卡");
              //     break;
              //   case 3:
              //     console.log("10元话费卡");
              //     break;
              //   case 4:
              //     console.log("50面值话费卡");
              //     break;
              //   case 5:
              //     console.log("100面值话费卡");
              //     break;
              //   case 6:
              //     console.log("200面值话费卡");
              //     break;
              //   case 7:
              //     console.log("车路路洗车券");
              //     break;
              //   case 8:
              //     console.log("院线通电影票");
              //     break;
              //   case 9:
              //     console.log("院线通电影票抵扣券");
              //     break;
              //   case 10:
              //     console.log("1GB流量");
              //     break;
              //   case 11:
              //     console.log("500MB流量");
              //     break;
              //   case 12:
              //     console.log("一个月来电名片服务");
              //     break;
              //   case 13:
              //     console.log("ofo免费骑行");
              //     break;
              // }
            } else {
              console.log("未中奖");
              this.zjPopupShow = true;
              this.level = 13;
            }
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
          this.cjTapNum = true;
          this.$vux.toast.show({
            text: err,
            time: "1500",
            width: "4rem",
            position: "middle",
            type: "text"
          });
        });
    },
    getUser(data) {
      this.requestGet(
        "/user/get",
        data,
        "GET",
        "application/x-www-form-urlencoded"
      )
        .then(res => {
          console.log(res);
          if (res.data.ret == 200) {
            console.log("获取用户信息成功");
            console.log(res.data.data.lottery_num);
            this.luckydrawNum = res.data.data.lottery_num;
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
        });
    }
  },
  created() {
    //页面渲染前调用
  },
  mounted() {
    console.log("缓存");
    console.log(this.local);
    let data = {
      openid: this.local.openid
    };
    this.getUser(data);
    //页面渲染完成调用

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
.luckydraw_page {
  background: url(../../static/img/cj_bj.png) no-repeat 50% 0;
  background-size: cover;
}
.luckydraw_title {
  width: 6.4rem;
  position: absolute;
  left: 50%;
  margin-left: -3.2rem;
  top: 0.5rem;
}
.luckydraw_title img {
  display: block;
  width: 100%;
}
.luckydraw_box {
  width: 100%;
  position: absolute;
  top: 3.7rem;
  left: 0;
}
.cjhz {
  width: 3.6rem;
  margin: 0 auto;
  margin-top: 0.1rem;
}
.luckydraw_box img {
  display: block;
  width: 100%;
}
.luckydraw_toats {
  margin-top: 0.1rem;
}
.luckydraw_toats p {
  font-size: 0.32rem;
  color: #ffeca0;
  text-align: center;
}
.luckydraw_btn {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.luckydraw_btn span {
  width: 3.46rem;
  margin-top: 0.4rem;
}
.luckydraw_btn span img {
  display: block;
  width: 100%;
}
.cj_popup /deep/ .weui-dialog {
  background: url(../../static/img/cjtc_bj.png) no-repeat 0 0;
  background-size: 100% 100%;
  width: 6.8rem;
  height: 7.14rem;
}
.cj_popup .popup_centent {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.7rem;
}
.cj_title {
  width: 4.88rem;
}
.cj_title img {
  display: block;
  width: 100%;
}
.prize {
  width: 2.18rem;
  margin-top: 0.1rem;
}
.prize img {
  display: block;
  width: 100%;
}
.prize_btn {
  width: 3.5rem;
  margin-top: 0.35rem;
}
.prize_btn img {
  display: block;
  width: 100%;
}
.prize_text h6 {
  font-size: 0.24rem;
  color: #be8235;
  font-weight: normal;
}
.prize_text h5 {
  font-size: 0.3rem;
  color: #be8235;
  padding: 0 0 0.15rem 0;

  margin-bottom: 0.1rem;
}
.prize_text h5 span {
  display: block;
}
.prize_text p {
  font-size: 0.18rem;
  color: #be8235;
}
.prize_zx {
  width: 0.7rem;
  position: fixed;
  top: 1.8rem;
  left: 0.14rem;
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
.myprize_page {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: url(../../static/img/cj_bj.png) no-repeat 50% 0;
  background-size: cover;
}
.myprize_scroll {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 6rem;
  margin: 0 auto;
  max-height: 7rem;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.myprize_list {
  width: 50%;
  margin-bottom: 0.36rem;
}
.myprize_title {
  width: 4.9rem;
  margin: 0 auto;
}
.myprize_title img {
  display: block;
  width: 100%;
}
.myprize_centent {
  padding-top: 1rem;
}
.myprize_icon {
  width: 2.24rem;
  height: 1.48rem;
  border-radius: 0.1rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
.myprize_icon p {
  width: 1.65rem;
}
.myprize_icon p img {
  display: block;
  width: 100%;
}
.myprize_icon span {
  font-size: 0.22rem;
  color: #be8235;
  display: block;
}
.myprize_btn {
  width: 1.6rem;
  margin: 0 auto;
  margin-top: 0.1rem;
}
.myprize_btn img {
  display: block;
  width: 100%;
}
.myprize_fh {
  width: 3.5rem;
  position: absolute;
  left: 50%;
  margin-left: -1.75rem;
  bottom: 0.5rem;
}
.myprize_fh img {
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