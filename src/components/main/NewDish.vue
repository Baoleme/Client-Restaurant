<template>
  <div class="mainContanier">
    <Menu />
    <div class="right">
      <TopLine class="top"/>
      <div class="bg">
        <span>菜品管理>新建菜品</span>
        <div class="newDishContent">
          <div class="editDishTitle">新建菜品</div>
          <div class="editDishLine"></div>
          <div class="editDishMain">
            <div class="subTitle1">基本信息</div>
            <div class="input">
              <div class="inputPart">
                <div class="labelLine1">
                  <div class="label1">商品名</div>
                  <div class="require">必填*</div>
                </div>
                <div class="subLine1"></div>
                <input type="text" class="input1" placeholder="15个汉字以下，推荐8个汉字以下，在app内可完整显示">
              </div>
              <div class="hintPart">
                <Icon type="close-circled" color="#FE8966" size="14" />
                <span>商品名不能为空</span>
              </div>
            </div>
            <div class="input secondInput">
              <div class="inputPart">
                <div class="labelLine1">
                  <div class="label1">店内分类</div>
                  <div class="require">必填*</div>
                </div>
                <div class="subLine1"></div>
                <input type="text" class="input1">
              </div>
              <div class="hintPart">
                <Icon type="close-circled" color="#FE8966" size="14" />
                <span>分类不能为空</span>
              </div>
            </div>
            <div class="imgPart">
              <div class="labelLine2">
                <div class="label2">上传图片</div>
                <div class="require">必填*</div>
              </div>
              <div class="inputPart">
                <img src="" alt="" class="dishImg">
                <div class="hintPart imghintPart">
                  <div>
                    <Icon type="close-circled" color="#FE8966" size="14" />
                    <span>图片大小超过5M</span>
                  </div>
                  <div class="uploadBtn">
                    <Button type="info" class="newGroupBtn">点击上传</Button>
                  </div>
                </div>
              </div>
              <div class="imgHint">提示：支持jpg/png格式，大小5M以下</div>
            </div>
            <div class="subTitle2">
              <span>价格信息</span><span>提示：商品价格=基础价格+规格组合价格</span>
            </div>
            <div class="dishPrice">
              <div class="priceInputPart">
                <div class="labelLine3">
                  <div class="label1">基础价格</div>
                  <div class="require">必填*</div>
                </div>
                <div class="subLine2"></div>
                <input type="text" class="input2" placeholder="0"><span class="scale">元</span>
              </div>
              <div class="hintPart">
                <Icon type="close-circled" color="#FE8966" size="14" />
                <span>价格不能为空</span>
              </div>
            </div>
            <div class="newSpecificationsPart">
              <div class="newSpecCate">
                <Icon class="iconMiddle" type="ios-minus-outline" color="#ff8b18" size="22" @click.native="deleteTag"></Icon>
                <input type="text" class="newCateInput borderClass" placeholder="规格名，如冷热">
                <input type="text" class="defaultCate borderClass" placeholder="默认规格名，如标准杯">
              </div>
              <div class="newSpecGroup">
                <div class="newSpecItem">
                  <Icon class="iconMiddle deleteSpecItem" type="ios-minus-outline" color="#ff8b18" size="22" @click.native="deleteTag"></Icon>
                  <div class="itemBox borderClass">
                    <div class="newSpecName">
                      <div class="labelLineLeft labelLine">
                        <div class="labelLeft labelTwo">可选择规格名</div>
                        <div class="require">必填*</div>
                      </div>
                      <div class="subLine2"></div>
                      <input type="text" class="input2" placeholder="如大杯/中份/单人装">
                    </div>
                    <div class="delta">
                      <div class="labelLineRight labelLine">
                        <div class="labelRight labelTwo">价格增降</div>
                      </div>
                      <div class="subLine2"></div>
                      <input type="text" class="input2" placeholder="0"><span class="scale">元</span>
                    </div>
                    <div class="newSpecItemLine"></div>
                  </div>
                </div>
                <div class="newBtn addNewSpecItem">
                  <Icon class="iconMiddle" type="ios-plus-outline" color="#ff8b18" size="16" @click.native="addSpecItem"></Icon>
                  <span>添加规格</span>
                </div>
              </div>
              <div class="newBtn addNewSpecCate">
                <Icon class="iconMiddle" type="ios-plus-outline" color="#ff8b18" size="16" @click.native="addSpecCate"></Icon>
                <span>添加规格分类</span>
              </div>
              <div class="newSpecificationsHint">提示：不同规格的价格增降指该规格产品在基础价格上的价格变化，如规格为“小份”，价格较标准份“-2”。</div>
            </div>
            <div class="subTitle3">附加信息</div>
            <div class="additionalInput borderClass">
              <div class="label3">菜品介绍</div>
              <div class="subLine1 subLine3"></div>
              <textarea class="textarea"></textarea>
              <div class="wordRestriction"><span>50</span><span>/50</span></div>
            </div>
            <div class="chilliLine">
              <div class="label4">标签</div>
              <div class="chilliImg"></div>
              <div class="chilliImg"></div>
              <div class="chilliImg"></div>
              <span>不辣</span>
            </div>
            <div class="newTagPart">
              <div class="customTag">
                <div class="newTag" v-for="(i, index) in tagNum" :key="index">
                  <Icon class="iconMiddle" type="ios-minus-outline" color="#ff8b18" size="20" @click.native="deleteTag"></Icon>
                  <input type="text" class="newTagInput borderClass" placeholder="自定义标签">
                </div>
                <div class="newBtn" v-show="!isTagFour">
                  <Icon class="iconMiddle" type="ios-plus-outline" color="#ff8b18" size="16" @click.native="addTag"></Icon>
                  <span>添加自定义标签</span>
                </div>
              </div>
              <div class="newTagHint">提示：自定义标签名称四字以内，最多可添加四个。</div>
            </div>
            <div class="confirmPart">
              <Button type="info" class="newGroupBtn confirmEdit">新建菜品</Button>
              <span>放弃新建</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from './Menu';
import TopLine from './TopLine';
export default {
  data () {
    return {
      tagNum: 0,
      specificationsNum: 0,
      isTagFour: false
    };
  },
  methods: {
    addTag: function () {
      this.tagNum = this.tagNum + 1;
      if (this.tagNum === 4) {
        this.isTagFour = true;
      }
    },
    deleteTag: function () {
      this.tagNum = this.tagNum - 1;
      if (this.isTagFour) {
        this.isTagFour = false;
      }
    },
    addSpecCate: function () {
      this.specificationsNum = this.specificationsNum + 1;
    }
  },
  components: {
    Menu,
    TopLine
  }
};
</script>

<style lang="scss" scoped>
.mainContanier {
  display: flex;
  min-height: 100vh;

  .right {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    width: 100%;

    .top {
      width: 100%;
    }

    .bg {
      display: flex;
      flex: 10;
      flex-direction: column;
      background-color:#f6f6f6;
      padding: 0px 22px 0 22px;

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

      .newDishContent {
        flex: 1;
        background: #ffffff;
        text-align: left;

        .editDishTitle {
          font-family:PingFangSC-Light;
          font-size:28px;
          color:#6e6e6e;
          letter-spacing:2.24px;
          text-align:left;
          margin: 15px 40px;
        }

        .editDishLine {
          border-top:1px solid #e6e6e6;
          width:98%;
          height:0px;
          margin: auto;
        }

        .editDishMain {
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

              .dishImg {
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
                justify-content: space-between;

                .uploadBtn {
                  text-align: left;
                }
              }
            }

            .imgHint {
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#dadada;
              text-align:left;
              margin-top: 10px;
            }
          }

          .subTitle2 {
            margin: 40px 0 10px 0;
            text-align:left;

            span:nth-child(1) {
              font-family:PingFangSC-Light;
              font-size:20px;
              color:#6e6e6e;
              letter-spacing:2.24px;
              margin-right: 10px;
            }
            span:nth-child(2) {
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#dadada;
            }
          }

          .dishPrice {
            display: flex;
            margin-bottom: 10px;

            .priceInputPart {
              border:1px solid #e6e6e6;
              border-radius:3px;
              width:280px;
              height:93px;
              padding: 11px;

              .labelLine3 {
                display: flex;
                justify-content: space-between;

                .label1 {
                  font-family:PingFangSC-Medium;
                  font-size:14px;
                  color:#493f3a;
                  letter-spacing:1.12px;
                }
              }

              .subLine2 {
                border-top:1px solid #e6e6e6;
                width:98%;
                margin: auto;
                height:0px;
                margin-top: 11px;
                margin-bottom: 7px;
              }

              .input2 {
                border: none;
                font-family:PingFangSC-Regular;
                font-size:14px;
                width: 90%;
                line-height: 2;
                outline:none;
                text-align: left;
              }
            }
          }

          .newBtn {
            font-family:PingFangSC-Regular;
            font-size:14px;
            color:#6e6e6e;
            letter-spacing:2.24px;
            margin-top: 5px;
          }

          .borderClass {
            border:1px solid #e6e6e6;
            border-radius:3px;
          }

          .newSpecificationsPart {
            .newSpecCate {
              font-size: 14px;
              .newCateInput {
                width:114px;
                height:32px;
                padding: 4px 6px;
                outline: none;
                margin-right: 14px;
                margin-left: 10px;
              }

              .defaultCate {
                width:415px;
                height:32px;
                padding: 4px 6px;
              }
            }

            .newSpecGroup {

              .newSpecItem {
                display: flex;
                align-items: flex-end;
                margin: 10px 0 0 136px;

                .itemBox {
                  width:558px;
                  display: flex;
                  padding: 11px;
                  margin-left: 10px;

                  .subLine2 {
                    border-top:1px solid #e6e6e6;
                    width:98%;
                    height:0px;
                    margin-top: 11px;
                    margin-bottom: 7px;
                  }

                  .labelTwo {
                    font-family:PingFangSC-Medium;
                    font-size:14px;
                    color:#493f3a;
                    letter-spacing:1.12px;
                  }

                  .input2 {
                    border: none;
                    font-family:PingFangSC-Regular;
                    font-size:14px;
                    width: 90%;
                    line-height: 2;
                    outline:none;
                    text-align: left;
                  }

                  .labelLine {
                    display: flex;
                    justify-content: space-between;
                  }

                  .newSpecName {
                    width: 280px;
                    border-right: 1px #493f3a dashed;
                    padding-right: 10px;
                    margin-right: 10px;
                  }

                  .delta {
                    width: 280px;
                  }
                }
              }

              .addNewSpecItem {
                margin-left: 164px;
              }
            }

            .addNewSpecCate {
              margin-top: 36px;
            }

            .newSpecificationsHint {
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#dadada;
              margin-top: 10px;
            }
          }

          .subTitle3 {
            font-family:PingFangSC-Light;
            font-size:20px;
            color:#6e6e6e;
            letter-spacing:2.24px;
            text-align:left;
            margin: 40px 0 15px 0;
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

          .chilliLine {
            display: flex;
            margin: 35px 0px 15px 15px;

            .label4 {
              font-family:PingFangSC-Medium;
              font-size:14px;
              color:#493f3a;
              letter-spacing:1.12px;
              text-align:left;
              margin-right: 57px;
            }

            .chilliImg {
              height: 20px;
              width: 20px;
              background: url('../../assets/images/spicy-grey.svg')
            }

            .chilliImg:hover {
              background: url('../../assets/images/chilli.svg')
            }

            >span {
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#6e6e6e;
              line-height: 1.5;
              padding-left: 15px;
            }
          }

          .newTagPart {
            margin-left: 100px;

            .customTag {
              display: flex;

              .newTag {
                .newTagInput {
                  width:114px;
                  height:32px;
                  padding: 4px 6px;
                  outline: none;
                  margin-right: 30px;
                  font-size: 14px;
                  margin-left: 10px;
                }
              }
            }

            .newTagHint {
              font-family:PingFangSC-Regular;
              font-size:14px;
              color:#dadada;
              margin-top: 10px;
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
            }
          }
        }
      }
    }
  }
  .scale {
    font-family:PingFangSC-Medium;
    font-size:14px;
    color:#707070;
    letter-spacing:2.24px;
    padding-left: 5px;
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
