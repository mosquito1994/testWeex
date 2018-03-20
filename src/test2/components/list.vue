<template>
  <div>
    <slider class="slider" interval="4500" :infinite="true" :auto-play="true">
      <div class="frame" v-for="(img, index) in picList" :key="index" @click="jump">
        <image class="image" resize="cover" :src="img.picUrl"></image>
      </div>
      <indicator class="indicator"></indicator>
    </slider>
    <div class="m-title">
      <div class="u-line"></div>
      <div class="name">众筹结束</div>
    </div>
    <list class="m-list">
      <cell v-for="(item) in list" :key="item.id">
        <div class="m-focusItem">
          <image class="m-goodsImage" resize="cover" :src="item.picUrl" ></image>
          <div class="m-goodsInfo">
            <text class="u-title">{{item.name}}</text>
            <p class="u-price">&yen;<span class="larger">{{item.minPrice}}</span>起</p>
            <div class="m-listProgressBar">
              <div class="bar">
                <div class="inner" :style="{width: item.actualAmountPercent * 3.3 + 'px'}"></div>
              </div>
              <div class="u-tag">{{getPercent(item.actualAmountPercent)}}%</div>
            </div>
            <div class="u-support" v-if="item.status==4">
              <text class="u-text-success">众筹成功</text>
              <div class="btn-grey">
                <div class="btn">了解项目</div>
              </div>
            </div>
          </div>
        </div>
      </cell>
    </list>
  </div>
</template>
<style lang="less" scoped>
  .slider {
    position: relative;
  }
  .image, .frame, .slider {
    width: 750px;
    height: 400px;
  }
  .indicator {
    position: absolute;
    bottom: 40px;
    height: 10px;
    width: 750px;
    display: flex;
    align-items: center;
  }
  .m-title {
    position: relative;
    height: 104px;
    width: 750px;
    background: #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: center;

    .name { 
      position: relative;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAAAn1BMVEUAAAA0NDQ0NDRLS0szMzM4ODgzMzMzMzMzMzMzMzMzMzMzMzM0NDQzMzMzMzM0NDQ1NTU0NDQzMzMzMzM0NDQ0NDQ0NDQ0NDQ8PDwzMzMzMzMzMzM0NDQ5OTkzMzMzMzM0NDQ0NDQ0NDQ0NDQ2NjY4ODg6Ojo/Pz9ra2szMzM0NDQzMzMzMzMzMzM1NTU0NDQ1NTU3Nzc0NDQ1NTUzMzO7t/s4AAAANHRSTlMAeoUF+hbwu8iflvXBsItNK+mokGplVkYM49d+PBPd0nZzUjYkGhAJAs3MtZqCYUExHGAdMysXaAAAAc5JREFUOMu1k9d6qzAQhHEQoveODbjhnricef9nO8FCIGNyl8wNWr4fpNkdSX8o+WpoOfGPurv/GTo8cnDRlfwD9e8EFJ+Lu9xslhpQ3SapjY886au0hulOUFsKdSceUwdZvFFZDXt0mhB+M8Y+UWTfj5mmtN/YeutIRTCiFBMbqcVQl9Legt4WjQnvFZvDZosLjo2KM9vfYfigE9KudzpMTklb+IeXPWHKzEnqFsjdtGTvC7yYXcDiezKdWanjS8QS7unmODZUx+l+8oGZiEUw+vUaUb9ewRGxFEu2cFW1RqGqD+Fv4tj7zjMF/GzxwHhG+JC5ZyXGUlG6qsIQk5sJoNpMnM2DL/VSYcc1SMKxYaOL4EwmKCU5BFmzemfco5xqcSZ5BFtxAiwihMcwRit/dcJF6rUnZM/mTLqWW4jlRANAt9IgDdcuJZgfGLZ+thAgxl1IZMBnAct79j5XnkYDgISKGEk2DB/QlgvFYuljIL33may6y1KGFAAI0PDWVUh5S1RoGTeUGEcKYvXXx0Z/D8sCR9GUeMUCJEPvTqC8EjVOZmYDRjmFGYjE8ouCznfvmIPVa+TOAA0/xtIwH314tTAhHmwRnL0r2km/rf+EnzpIsX5FKgAAAABJRU5ErkJggg==);
      background-color: #f4f4f4;
      background-size: 34px 34px;
      background-position: 27px 0;
      background-repeat: no-repeat;
      height: 34px;
      line-height: 34px;
      font-size: 32px;
      padding: 0 27px 0 75px;
    }
    .u-line {
      width: 690px;
      height: 1px;
      position: absolute;
      left: 30px;
      top: 52px;
      background-color: #d9d9d9;
    }
  }
  .m-listProgressBar {
    height: 20px;
    margin-top: 26px;
    display: flex;
    flex-direction: row;

    .bar {
      width: 330px;
      height: 20px;
      border-radius: 40px;
      background-color: #e7e7e7;
      overflow: hidden;
      flex: 0 0 330px;
    }
    .inner {
      height: 20px;
      background-color: #FEA438;
      border-radius: 80px;
    }
    .u-tag {
      flex: 1;
      margin-top: -8px;
      color: #F48E17;
      height: 36px;
      font-size: 28px;
      line-height: 36px;
      margin-left: 20px;
    }
  }

  .m-list {
    background-color: #fff;
    padding-top: 36px;
  }
  .m-focusItem {
    width: 750px;
    height: 210px;
    margin-bottom: 50px;
    padding: 0 30px;
    display: flex;
    flex-direction: row;
  }
  .m-goodsImage {
    width: 210px;
    height: 210px;
    flex: 0 0 210px;
    background-color: #f4f4f4;
    display: inline-block;
    font-size: 0;
  }
  .m-goodsInfo {
    margin: 10px 0 0 30px;
    height: 200px;
    flex: 1;
    display: inline-block;
    font-size: 0;

    .u-support {
      height: 48px;
      line-height: 48px;
      margin-top: 27px;
      position: relative;
    }
    .u-text-success {
      color: #2bab52;
      font-size: 24px;
      height: 48px;
      line-height: 48px;
    }
    .btn-grey {
      position: absolute;
      top: -24px;
      right: -4px;
      width: 170px;
      height: 76px;
    }
    .btn {
      position: absolute;
      right: 4px;
      top: 23px;
      width: 140px;
      height: 48px;
      line-height: 46px;
      font-size: 24px;
      border: 1px solid #7f7f7f;
      text-align: center;
      color: #666;
      border-radius: 4px;
    }
    .u-price {
      height: 32px;
      line-height: 32px;
      font-size: 24px;
      color: #F48F17;
      margin-top: 11px;
      font-weight: 700;
    }
    .larger {
      font-size: 32px;
      color: #F48F17;
    }
    .u-title {
        width: 440px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #333;
        line-height: 36px;
        height: 36px;
        font-size: 28px;
        font-weight: 700;
    }
  }
</style>
<script>
    export default {
      data () {
        return {
          list: [
            {
            "amount":150000,
            "actualAmount":389700,
            "description":"独特防侧冲设计，头等舱般的舒适感",
            "picUrl":"https://yanxuan.nosdn.127.net/e67035cbc24b37057e866e1df60e62f5.png",
            "minPrice":1299,
            "name":"儿童汽车安全座椅",
            "startTime":1517536800000,
            "actualAmountPercent":260,
            "endTime":1520128800000,
            "id":24,
            "actualNum":297,
            "status":4
            },
            {
            "amount":80000,
            "actualAmount":199800,
            "description":"百年经典，精致小巧。全手工制作，冲泡单丛茶首选。",
            "picUrl":"https://yanxuan.nosdn.127.net/fe378406b905fd7fcdf99263c9f126f2.png",
            "minPrice":666,
            "name":"扁西施 纯手工潮州手拉壶",
            "startTime":1516932000000,
            "actualAmountPercent":250,
            "endTime":1519524000000,
            "id":23,
            "actualNum":286,
            "status":4
            },
            {
            "amount":50000,
            "actualAmount":366400,
            "description":"4in1智能精纯萃取，可打奶泡。仅重300g，便捷随行。",
            "picUrl":"https://yanxuan.nosdn.127.net/d137da530676d3aedad7bea0f5e78d73.png",
            "minPrice":229,
            "name":"便携式胶囊咖啡机",
            "startTime":1516327200000,
            "actualAmountPercent":733,
            "endTime":1518055200000,
            "id":22,
            "actualNum":1520,
            "status":4
            },
            {
            "amount":50000,
            "actualAmount":253500,
            "description":"6A级桑蚕丝，高弹纤维0压迫感重塑黄金比例身形。",
            "picUrl":"https://yanxuan.nosdn.127.net/57cdbb90edcdecbf3c1ff6794fcd3232.png",
            "minPrice":169,
            "name":"女式真丝蕾丝微修型内衣套装",
            "startTime":1515117600000,
            "actualAmountPercent":507,
            "endTime":1517796000000,
            "id":18,
            "actualNum":1456,
            "status":4
            },
            {
            "amount":48000,
            "actualAmount":287520,
            "description":"古雅朴质造型，紫砂名器。用料上乘，温润通透。兼之轻便易携。",
            "picUrl":"https://yanxuan.nosdn.127.net/90a40d2a0aa3fab70ecb2caad69c936e.png",
            "minPrice":599,
            "name":"紫砂玉白茶具套装",
            "startTime":1515722400000,
            "actualAmountPercent":599,
            "endTime":1517450400000,
            "id":19,
            "actualNum":458,
            "status":4
            },
            {
            "amount":79000,
            "actualAmount":237000,
            "description":"滴水不漏，轻便易携，45°倾斜茶水自动过滤",
            "picUrl":"https://yanxuan.nosdn.127.net/3767c760e601b8f73c0c881d64ed52df.png",
            "minPrice":79,
            "name":"茶水分离泡茶杯",
            "startTime":1514476800000,
            "actualAmountPercent":300,
            "endTime":1517155200000,
            "id":17,
            "actualNum":2783,
            "status":4
            },
            {
            "amount":36600,
            "actualAmount":254360,
            "description":"列级名庄出品，1997年份陈酿。酒体圆润，果香馥郁。",
            "picUrl":"https://yanxuan.nosdn.127.net/4e8a1bde241c0f179518c454917ae2dd.png",
            "minPrice":399,
            "name":"1997年份波尔多列级圣爱美隆干红葡萄酒",
            "startTime":1515722400000,
            "actualAmountPercent":695,
            "endTime":1517018400000,
            "id":20,
            "actualNum":324,
            "status":4
            },
            {
            "amount":99999,
            "actualAmount":3005600,
            "description":"独特酱香，窖底香浓。甘冽醇厚，回味悠长。",
            "picUrl":"https://yanxuan.nosdn.127.net/333a16ddecce3e325394c0f8e8fdf82d.png",
            "minPrice":150,
            "name":"茅台镇的酒",
            "startTime":1513936800001,
            "actualAmountPercent":999,
            "endTime":1516982400000,
            "id":10,
            "actualNum":6041,
            "status":4
            },
            {
            "amount":100000,
            "actualAmount":175849,
            "description":"国际大牌面料，快速高回弹，清爽速干。独创版型，严选出品。",
            "picUrl":"https://yanxuan.nosdn.127.net/b4ff4799b67c4fdaa9555de75600304a.png",
            "minPrice":269,
            "name":"都市骑行牛仔裤",
            "startTime":1513936800000,
            "actualAmountPercent":176,
            "endTime":1516550400000,
            "id":7,
            "actualNum":607,
            "status":4
            },
            {
            "amount":30000,
            "actualAmount":101638,
            "description":"日常车载充电，紧急情况按压弹射车窗。平时救急，急时救命。",
            "picUrl":"https://yanxuan.nosdn.127.net/8b0accc850c32e428ed9df14a027bddd.png",
            "minPrice":89,
            "name":"“急速”按压式破窗车充",
            "startTime":1513936800000,
            "actualAmountPercent":339,
            "endTime":1516550400000,
            "id":8,
            "actualNum":991,
            "status":4
            },
            {
            "amount":20000,
            "actualAmount":81025,
            "description":"环保海藻纤维，抗菌抑菌。来自一条好内裤的自我修养。",
            "picUrl":"https://yanxuan.nosdn.127.net/27457f5a776398945218061e2a01871a.png",
            "minPrice":25,
            "name":"男女款亲肤舒柔海藻抗菌内裤",
            "startTime":1513936800000,
            "actualAmountPercent":405,
            "endTime":1516550400000,
            "id":9,
            "actualNum":2214,
            "status":4
            },
            {
            "amount":36000,
            "actualAmount":357000,
            "description":"避免酒店清洁问题，轻巧便携，透气亲肤，多种睡姿全面保护",
            "picUrl":"https://yanxuan.nosdn.127.net/a384177350514581f2c5015ac41d8350.png",
            "minPrice":99,
            "name":"可裸睡便携睡袋",
            "startTime":1513936800000,
            "actualAmountPercent":992,
            "endTime":1516550400000,
            "id":12,
            "actualNum":2940,
            "status":4
            },
            {
            "amount":30000,
            "actualAmount":123888,
            "description":"天然海藻提取纤维，24h防臭",
            "picUrl":"https://yanxuan.nosdn.127.net/20bdd25d7a5f3b385359d26ea0f61b45.png",
            "minPrice":89,
            "name":"海藻防臭除菌男袜",
            "startTime":1513936800000,
            "actualAmountPercent":413,
            "endTime":1516550400000,
            "id":13,
            "actualNum":1370,
            "status":4
            },
            {
            "amount":100000,
            "actualAmount":245754,
            "description":"饮水添镁更健康，即净即热即饮无需等，精准控温6档可选",
            "picUrl":"https://yanxuan.nosdn.127.net/d72b4becb6fe781606655c06c2df239f.png",
            "minPrice":999,
            "name":"BWT镁离子即热净水机",
            "startTime":1513936800000,
            "actualAmountPercent":246,
            "endTime":1516550400000,
            "id":14,
            "actualNum":241,
            "status":4
            }
          ],
          picList: [
            {
              picUrl: "http://yanxuan.nosdn.127.net/efb74cfce111a02c14bdea655353c87f.jpg?imageView&thumbnail=750x0&quality=75",
              target: "http://m.you.163.com"
            }, {
              picUrl: "http://yanxuan.nosdn.127.net/e73bed4c5ce7eabb85fac59032a60e9e.jpg?imageView&thumbnail=750x0&quality=75",
              target: "http://m.you.163.com"
            }
          ]
        }
      },
      methods: {
        jump () {
          this.$router.push("/test");
        },
        getPercent (percent) {
          return percent >= 999 ? "999+" : percent;
        }
      }
    }
</script>
