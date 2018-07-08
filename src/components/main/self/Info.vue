<template>
  <div class="mainContanier">
    <Menu class="menu"/>
    <div class="right">
      <TopLine class="top"/>
      <div class="bg">
        <div class="infoContent">
          <div class="editResTitle">商户信息</div>
          <div class="editInfoLine"></div>
          <div class="editInfoMain">
            <div class="subTitle1">基本信息</div>
            <div class="input">
              <div class="inputPart">
                <div class="labelLine1">
                  <div class="label1">店名</div>
                  <div class="require">必填*</div>
                </div>
                <div class="subLine1"></div>
                <input type="text" class="input1" v-model="resName" @focus="nameOnfocus" @blur="nameOnblur"
                  placeholder="15个汉字以下，推荐8个汉字以下，在app内可完整显示" maxlength="15">
              </div>
              <div class="hintPart" v-show="isNameNull">
                <Icon type="close-circled" color="#FE8966" size="14" />
                <span>店名不能为空</span>
              </div>
            </div>
            <div class="input secondInput">
              <div class="inputPart">
                <div class="labelLine1">
                  <div class="label1">联系电话</div>
                  <div class="require">必填*</div>
                </div>
                <div class="subLine1"></div>
                <input type="number" class="input1" @focus="phoneOnfocus" @blur="phoneOnblur"
                placeholder="联系电话为11位手机号码" v-model="resPhone">
              </div>
              <div class="hintPart" v-show="isPhoneNull">
                <Icon type="close-circled" color="#FE8966" size="14" />
                <span>联系电话不能为空且为11位</span>
              </div>
            </div>
            <div class="input secondInput">
              <div class="inputPart">
                <div class="labelLine1">
                  <div class="label1">店面地址</div>
                  <div class="require">必填*</div>
                </div>
                <div class="subLine1"></div>
                <input type="text" class="input1" @focus="addressOnfocus" @blur="addressOnblur"
                placeholder="请输入地址" v-model="resAddress">
              </div>
              <div class="hintPart" v-show="isAddressNull">
                <Icon type="close-circled" color="#FE8966" size="14" />
                <span>地址不能为空</span>
              </div>
            </div>
            <div class="subTitle3">附加信息</div>
            <div class="imgPart">
              <div class="labelLine2">
                <div class="label2">商家LOGO</div>
                <div class="require">必填*</div>
              </div>
              <div class="inputPart">
                <img :src="logoImg" id="logoImg">
                <div class="hintPart imghintPart">
                  <div v-show="isImgNull || isSizeOut">
                    <Icon type="close-circled" color="#FE8966" size="14" />
                    <span v-show="isSizeOut">图片大小超过1M</span>
                    <span v-show="isImgNull">图片不能为空</span>
                  </div>
                  <div class="uploadBtn">
                    点击上传<input type="file" id="uploadImg" accept=".jpg,.jpeg,.png"/>
                  </div>
                </div>
              </div>
              <div class="imgHint">提示：支持jpg/png格式，大小1M以下</div>
            </div>
            <div class="additionalInput borderClass">
              <div class="label3">商家介绍</div>
              <div class="subLine1 subLine3"></div>
              <textarea class="textarea" v-model="description" maxlength="200"></textarea>
              <div class="wordRestriction"><span>{{description.length}}</span><span>/200</span></div>
            </div>
            <div class="confirmPart">
              <Button type="info" class="newGroupBtn confirmEdit" @click="confirmEdit">确认更改</Button>
              <span @click="cancelEdit">放弃更改</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from './../Menu';
import TopLine from './../TopLine';
export default {
  data () {
    return {
      resName: '',
      isNameNull: false,
      resPhone: '',
      isPhoneNull: false,
      resAddress: '',
      isAddressNull: false,
      description: '',
      isImgNull: false,
      isSizeOut: false,
      logoImg: require('../../../assets/images/yulan.jpg')
    };
  },
  // computed: {
  //   resName () {
  //     return this.$store.state.infoObj.name;
  //   },
  //   resPhone () {
  //     return this.$store.state.infoObj.phone;
  //   },
  //   resAddress () {
  //     return this.$store.state.infoObj.address;
  //   },
  //   description () {
  //     return this.$store.state.infoObj.description || '';
  //   },
  //   logoImg () {
  //     return this.$store.state.infoObj.logoUrl;
  //   }
  // },
  methods: {
    nameOnfocus: function () {
      this.isNameNull = 0;
    },
    nameOnblur: function () {
      if (this.resName === '') {
        this.isNameNull = 1;
      }
    },
    phoneOnfocus: function () {
      this.isPhoneNull = 0;
    },
    phoneOnblur: function () {
      if (this.resPhone === '') {
        this.isPhoneNull = 1;
      }
    },
    addressOnfocus: function () {
      this.isAddressNull = 0;
    },
    addressOnblur: function () {
      if (this.resAddress === '') {
        this.isAddressNull = 1;
      }
    },
    confirmEdit: function () {
      if (this.$store.state.curImg === '') {
        this.isImgNull = 1;
      }
      if (this.resName === '') {
        this.isNameNull = 1;
      }
      if (!this.resPhone || this.resPhone.length !== 11) {
        this.isPhoneNull = 1;
      }
      if (this.resAddress === '') {
        this.isAddressNull = 1;
      }
      if (this.isNameNull || this.isPhoneNull || this.isImgNull || this.isAddressNull) {
        this.$Modal.warning({
          title: '修改商家信息提示',
          content: '信息不完整,请补充必填信息'
        });
      } else {
        let newInfoObj = {
          name: this.resName,
          logo_url: this.$store.state.curImg,
          // description: this.description,
          phone: this.resPhone,
          address: this.resAddress
        };
        if (this.description === '') {
          newInfoObj.description = null;
        } else {
          newInfoObj.description = this.description;
        }
        this.$store.dispatch('modifyInfo', newInfoObj).then((err) => {
          if (err) {
          } else {
            this.$Modal.success({
              title: '修改商家信息提示',
              content: '修改成功',
              onOk: () => {
                this.$store.dispatch('getRestInfo').then((err) => {
                  if (err) {
                    this.errorMsg = err;
                  } else {
                    this.$router.push('/main/info');
                  }
                });
              }
            });
          }
        });
      }
    },
    cancelEdit: function () {
      this.$store.commit('UPDATE_INDEX', 0);
      this.$router.push('/main');
    }
  },
  mounted () {
    let tempObj = this.$store.state.infoObj;
    this.resName = tempObj.name;
    this.resPhone = tempObj.phone;
    this.resAddress = tempObj.address;
    this.description = tempObj.description;
    this.logoImg = tempObj.logoUrl;
    if (!this.description) {
      this.description = '';
    }

    var that = this;
    var self = this.$store;
    document.getElementById('uploadImg').onchange = function () {
      var imgFile = this.files[0];
      console.log(this.files[0].size / 1024000);
      if ((this.files[0].size / 1024000) > 1) {
        that.isSizeOut = 1;
      } else {
        that.isSizeOut = 0;
        self.dispatch('uploadImg', this.files[0]).then((err) => {
          if (err) {
          } else {
            that.isImgNull = 0;
            var fr = new FileReader();
            fr.onload = function () {
              document.getElementById('logoImg').src = fr.result;
            };
            fr.readAsDataURL(imgFile);
          }
        });
      }
    };

    // this.$store.dispatch('getRestInfo').then((err) => {
    //   if (err) {
    //     this.errorMsg = err;
    //   } else {
    //     this.$store.commit('SAVE_NEWDISH_IMG', this.$store.state.infoObj.logoUrl);
    //   }
    // });
  },
  beforeMount () {
    this.$store.commit('UPDATE_INDEX', 4);
  },
  components: {
    Menu,
    TopLine
  }
};
</script>

<style lang="scss" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"]{
  -moz-appearance: textfield;
}
.menu {
  position: fixed;
  z-index: 9999;
}
// .mainContanier::-webkit-scrollbar {
//   display: none;
// }
.mainContanier {
  display: flex;
  min-height: 100vh;

  .right {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    width: 100%;
    background-color:#f6f6f6;

    .top {
      position: fixed;
      right: 0;
      z-index: 9998;
      padding-left: 168px;
    }

    .bg {
      display: flex;
      flex: 10;
      flex-direction: column;
      background-color:#f6f6f6;
      padding: 22px 0px 0 22px;
      width: 87%;
      position: relative;
      top: 79px;
      left: 163px;

      >span {
        opacity:0.8;
        font-family:PingFangSC-Light;
        font-size:12px;
        color:#3f3f3f;
        letter-spacing:1.92px;
        text-align:left;
        display: inline-block;
        margin: 11px 0px 11px 2px;
      }

      .infoContent {
        flex: 1;
        background: #ffffff;
        text-align: left;

        .editResTitle {
          font-family:PingFangSC-Light;
          font-size:28px;
          color:#6e6e6e;
          letter-spacing:2.24px;
          text-align:left;
          margin: 15px 40px;
        }

        .editInfoLine {
          border-top:1px solid #e6e6e6;
          width:98%;
          height:0px;
          margin: auto;
        }

        .editInfoMain {
          padding: 22px 40px 0 40px;

          .subTitle1 {
            font-family:PingFangSC-Light;
            font-size:20px;
            color:#6e6e6e;
            letter-spacing:2.24px;
            text-align:left;
            margin-bottom: 15px;
          }

          .input {
            display: flex;

            .inputPart {
              border:1px solid #e6e6e6;
              border-radius:3px;
              width:587px;
              height:93px;
              padding: 11px;

              .labelLine1 {
                display: flex;
                justify-content: space-between;

                .label1 {
                  font-family:PingFangSC-Medium;
                  font-size:14px;
                  color:#493f3a;
                  letter-spacing:1.12px;
                  text-align:left;
                }
              }

              .input1 {
                border: none;
                font-family:PingFangSC-Regular;
                font-size:14px;
                width: 100%;
                line-height: 2;
                outline:none;
              }
            }
          }

          .secondInput {
            margin-top: 15px;
          }

          .subLine1 {
            border-top:1px solid #e6e6e6;
            width:98%;
            margin: auto;
            height:0px;
            margin-top: 11px;
            margin-bottom: 7px;
          }

          .require {
            font-family:PingFangSC-Medium;
            font-size:12px;
            color:#fe8966;
            text-align:right;
          }

          .iconMiddle {
            vertical-align: middle;
          }

          .hintPart {
            margin: 10px 30px 0 30px;
            span {
              font-family:SimHei;
              font-size:12px;
              color:#FE8966;;
              letter-spacing:1px;
            }
          }

          .imgPart {
            .labelLine2 {
              display: flex;
              margin: 25px 0 15px 0px;
              justify-content: space-between;
              width:165px;

              .label2 {
                font-family:PingFangSC-Medium;
                font-size:14px;
                color:#493f3a;
                letter-spacing:1.12px;
              }
            }

            .inputPart {
              display: flex;

              #logoImg {
                display: inline-block;
                background:#ffffff;
                border:1px solid #e6e6e6;
                border-radius:3px;
                width:165px;
                height:165px;
              }

              .imghintPart {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;

                .uploadBtn {
                  display: inline-block;
                  background: #f88d6c;
                  border: #f88d6c 1px solid;
                  border-radius: 3px;
                  padding: 11px 15px;
                  color: #ffffff;
                  font-size: 14px;
                  width:91px;
                  height:43px;
                  margin-top: 94px;
                }
                .uploadBtn input {
                  position: relative;
                  right: 16px;
                  bottom: 33px;
                  opacity: 0;
                  width:91px;
                  height:43px;
                }
              }
            }

            .imgHint {
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#dadada;
              text-align:left;
              margin: 10px 0;
            }
          }

          .borderClass {
            border:1px solid #e6e6e6;
            border-radius:3px;
            outline: none;
          }

          .subTitle3 {
            font-family:PingFangSC-Light;
            font-size:20px;
            color:#6e6e6e;
            letter-spacing:2.24px;
            text-align:left;
            margin: 30px 0 15px 0;
          }
          .additionalInput {
            width:587px;
            height:198px;

            .label3 {
              font-family:PingFangSC-Medium;
              font-size:14px;
              color:#493f3a;
              letter-spacing:1.12px;
              text-align:left;
              margin: 11px 12px;
            }

            .subLine3 {
              margin-bottom: 0px;
            }

            .textarea {
              font-family:PingFangSC-Regular;
              font-size:12px;
              color:#493f3a;
              width: 100%;
              outline:none;
              height: 120px;
              padding: 10px;
              border: none;
              resize: none;
            }

            .wordRestriction {
              padding-right: 17px;
              text-align: right;
              >span {
                font-family:PingFangSC-Regular;
                color:#fe8966;
              }
            }
          }

          .confirmPart {
            margin-left: 160px;
            margin-top: 70px;
            margin-bottom: 100px;

            .confirmEdit {
              border-radius:4px;
              width:260px;
              height:43px;
              font-family:PingFangSC-Regular;
              font-size:14px;
              letter-spacing:2px;
            }

            >span {
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#7f7f7f;
              letter-spacing:2.24px;
              padding-left: 40px;
              cursor: default;
            }
          }
        }
      }
    }
  }
}

:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #dadada;
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #dadada;
}

input:-ms-input-placeholder{
  color: #dadada;
}

input::-webkit-input-placeholder{
  color: #dadada;
}
</style>
