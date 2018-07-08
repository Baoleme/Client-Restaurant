<template>
  <div class="mainContanier">
    <Menu class="menu"/>
    <div class="right">
      <TopLine class="top"/>
      <div class="bg">
        <span v-show="!isEdit">菜品管理>新建菜品</span>
        <span v-show="isEdit">菜品管理>编辑菜品</span>
        <div class="newDishContent">
          <div class="editDishTitle" v-show="!isEdit">新建菜品</div>
          <div class="editDishTitle" v-show="isEdit">编辑菜品</div>
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
                <input type="text" class="input1" v-model="dishName" @focus="nameOnfocus" @blur="nameOnblur"
                  placeholder="15个汉字以下，推荐8个汉字以下，在app内可完整显示" maxlength="15">
              </div>
              <div class="hintPart" v-show="isNameNull">
              <!-- <div class="hintPart" v-show="checkList[0]"> -->
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
                <input type="text" class="input1" @focus="cateOnfocus" @blur="cateOnblur"  @keyup="onkeyup" v-model="dishCate">
              </div>
              <div class="hintPart" v-show="isCateNull">
                <Icon type="close-circled" color="#FE8966" size="14" />
                <span>分类不能为空</span>
              </div>
            </div>
            <div class="curCateList" v-show="isShowCurCateList">
              <div v-for="(item, index) in filterList" :key="index" @mouseover="selectCate(item)" @mouseout="mouseout">{{item.name}}</div>
            </div>
            <div class="imgPart">
              <div class="labelLine2">
                <div class="label2">上传图片</div>
                <div class="require">必填*</div>
              </div>
              <div class="inputPart">
                <!-- <img src="@/assets/images/yulan.jpg" alt="" id="dishImg"> -->
                <img :src="dishImg" alt="" id="dishImg">
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
                <input type="number" class="input2" placeholder="0" @focus="priOnfocus" @blur="priOnblur" v-model="dishPrice"><span class="scale">元</span>
              </div>
              <div class="hintPart" v-show="isPriceNull">
                <Icon type="close-circled" color="#FE8966" size="14" />
                <span>价格不能为空</span>
              </div>
            </div>
            <div class="newSpecificationsPart" v-for="(item, index) in specList" :key="index">
              <div class="newSpecCate">
                <Icon class="iconMiddle" type="ios-minus-outline" color="#ff8b18" size="22" @click.native="delSpecCate(item.specId)"></Icon>
                <input type="text" class="newCateInput borderClass" placeholder="规格名，如冷热" v-model="item.specNameModel">
                <Select v-model="item.defaultName" size="small" style="width:200px" placeholder="请选择默认规格名">
                  <Option v-for="it in item.specItemList" :value="it.nameModel" :key="it.nameModel">{{ it.nameModel }}</Option>
                </Select>
                <span class="require">&nbsp;&nbsp;必填*</span>
                <!-- <input type="text" class="defaultCate borderClass" placeholder="默认规格名，如标准杯" v-model="item.defaultName"> -->
              </div>
              <div class="newSpecGroup" v-for="(subItem, index2) in item.specItemList" :key="index2">
                <div class="newSpecItem">
                  <Icon class="iconMiddle deleteSpecItem" type="ios-minus-outline" color="#ff8b18" size="22" @click.native="delSpecItem(item.specId,subItem.subId)"></Icon>
                  <div class="itemBox borderClass">
                    <div class="newSpecName">
                      <div class="labelLineLeft labelLine">
                        <div class="labelLeft labelTwo">可选择规格名</div>
                        <div class="require">必填*</div>
                      </div>
                      <div class="subLine2"></div>
                      <input type="text" class="input2" placeholder="如大杯/中份/单人装" v-model="subItem.nameModel">
                    </div>
                    <div class="delta">
                      <div class="labelLineRight labelLine">
                        <div class="labelRight labelTwo">价格增降</div>
                      </div>
                      <div class="subLine2"></div>
                      <input type="text" class="input2" placeholder="0" v-model="subItem.priceModel"><span class="scale">元</span>
                    </div>
                    <div class="newSpecItemLine"></div>
                  </div>
                  <div class="hintPart" v-show="subItem.isNull">
                    <Icon type="close-circled" color="#FE8966" size="14" />
                    <span>可选择规格名不能为空</span>
                  </div>
                </div>
              </div>
              <div class="newBtn addNewSpecItem">
                <Icon class="iconMiddle" type="ios-plus-outline" color="#ff8b18" size="16" @click.native="addSpecItem(item)"></Icon>
                <span>添加规格</span>
              </div>
            </div>
            <div class="newBtn addNewSpecCate">
              <Icon class="iconMiddle" type="ios-plus-outline" color="#ff8b18" size="16" @click.native="addSpecCate"></Icon>
              <span>添加规格分类</span>
            </div>
            <div class="newSpecificationsHint">提示：不同规格的价格增降指该规格产品在基础价格上的价格变化，如规格为“小份”，价格较标准份“-2”。</div>
            <div class="subTitle3">附加信息</div>
            <div class="additionalInput borderClass">
              <div class="label3">菜品介绍</div>
              <div class="subLine1 subLine3"></div>
              <textarea class="textarea" v-model="description" maxlength="50"></textarea>
              <div class="wordRestriction"><span>{{description.length}}</span><span>/50</span></div>
            </div>
            <div class="chilliLine">
              <div class="label4">标签</div>
              <!-- <div class="chilliImg"></div>
              <div class="chilliImg"></div>
              <div class="chilliImg"></div>
              <span>不辣</span> -->
              <Select v-model="chilliModel" size="small" style="width:100px" placeholder="请选择辣度">
                <Option v-for="item in chillList" :value="item" :key="item">{{ item }}</Option>
              </Select>
            </div>
            <div class="newTagPart">
              <div class="customTag">
                <div class="newTag" v-for="(item, index) in tagList" :key="index">
                  <Icon class="iconMiddle" type="ios-minus-outline" color="#ff8b18" size="20" @click.native="deleteTag(item.id)"></Icon>
                  <input type="text" class="newTagInput borderClass" placeholder="自定义标签" v-model="item.model" maxlength="4">
                </div>
                <div class="newBtn" v-show="tagList.length !== 4">
                  <Icon class="iconMiddle" type="ios-plus-outline" color="#ff8b18" size="16" @click.native="addTag"></Icon>
                  <span>添加自定义标签</span>
                </div>
              </div>
              <div class="newTagHint">提示：自定义标签名称四字以内，最多可添加四个。</div>
            </div>
            <div class="confirmPart" v-show="!isEdit">
              <Button type="info" class="newGroupBtn confirmEdit" @click="addNewDish(0)">新建菜品</Button>
              <span @click="cancelAddDish">放弃新建</span>
            </div>
            <div class="confirmPart" v-show="isEdit">
              <Button type="info" class="newGroupBtn confirmEdit" @click="addNewDish(1)">确认编辑</Button>
              <span @click="cancelAddDish">放弃编辑</span>
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
      tagNum: 0,
      specNum: 0,
      chillList: ['不辣', '微辣', '中辣', '特辣'],
      chilliModel: '',
      tagList: [],
      specList: [],
      description: '',
      isShowCurCateList: false,
      dishCate: '',
      dishCateId: 0,
      tempSelect: {},
      isNameNull: 0,
      isCateNull: 0,
      isImgNull: 0,
      isSizeOut: 0,
      isPriceNull: 0,
      dishName: '',
      dishPrice: '',
      dishId: -1,
      dishImg: require('../../../assets/images/yulan.jpg')
    };
  },
  computed: {
    categories: function () {
      return this.$store.state.categories;
    },
    filterList: function () {
      return this.categories.filter(item => (item.name.indexOf(this.dishCate) !== -1));
    },
    isEdit: function () {
      return this.$store.state.isEditDish;
    }
  },
  methods: {
    addTag: function () {
      this.tagList.push({
        id: this.tagNum++,
        model: ''
      });
    },
    deleteTag: function (id) {
      for (let i = 0; i < this.tagList.length; i++) {
        if (this.tagList[i].id === id) {
          this.tagList.splice(i, 1);
          break;
        }
      }
    },
    addSpecCate: function () {
      this.specList.push({
        specId: this.specNum++,
        specNameModel: '',
        defaultName: '',
        subItemNum: 1,
        specItemList: [
          {
            subId: 0,
            nameModel: '',
            priceModel: '',
            isNull: 0
          }
        ]
      });
    },
    delSpecCate: function (id) {
      for (let i = 0; i < this.specList.length; i++) {
        if (this.specList[i].specId === id) {
          this.specList.splice(i, 1);
          break;
        }
      }
    },
    addSpecItem: function (specItem) {
      specItem.specItemList.push({
        subId: specItem.subItemNum++,
        nameModel: '',
        priceModel: '',
        isNull: 0
      });
    },
    delSpecItem: function (id1, id2) {
      for (let i = 0; i < this.specList.length; i++) {
        if (this.specList[i].specId === id1 && this.specList[i].specItemList.length > 1) {
          for (let j = 0; j < this.specList[i].specItemList.length; j++) {
            if (this.specList[i].specItemList[j].subId === id2) {
              this.specList[i].specItemList.splice(j, 1);
              break;
            }
          }
          break;
        }
      }
    },
    nameOnfocus: function () {
      this.isNameNull = 0;
    },
    nameOnblur: function () {
      if (this.dishName === '') {
        this.isNameNull = 1;
      }
    },
    cateOnfocus: function () {
      this.isCateNull = 0;
      this.isShowCurCateList = true;
      if (this.dishCate === '') {
        this.tempSelect = {
          name: '',
          id: -1
        };
      } else {
        this.tempSelect = {
          name: this.dishCate,
          id: this.dishCateId
        };
      }
    },
    cateOnblur: function () {
      this.dishCate = this.tempSelect.name;
      this.dishCateId = this.tempSelect.id;
      this.isShowCurCateList = false;
      if (this.dishCate === '') {
        this.isCateNull = 1;
      }
    },
    onkeyup: function () {
      this.tempSelect = {
        name: this.dishCate,
        id: -1
      };
    },
    selectCate: function (selectValue) {
      this.tempSelect = {
        name: selectValue.name,
        id: selectValue.id
      };
    },
    mouseout: function () {
      this.tempSelect = {
        name: this.dishCate,
        id: this.dishCateId
      };
    },
    priOnfocus: function () {
      this.isPriceNull = 0;
    },
    priOnblur: function () {
      if (this.dishPrice === '') {
        this.isPriceNull = 1;
      }
    },
    subFunction: function (sign) {
      let dishSpicy;
      if (this.chilliModel === '' || this.chilliModel === '不辣') {
        dishSpicy = 0;
      } else if (this.chilliModel === '微辣') {
        dishSpicy = 1;
      } else if (this.chilliModel === '中辣') {
        dishSpicy = 2;
      } else if (this.chilliModel === '特辣') {
        dishSpicy = 3;
      }
      let newDishObj = {
        category_id: this.dishCateId,
        name: this.dishName,
        price: Number(this.dishPrice),
        spicy: dishSpicy,
        image_url: [
          this.$store.state.curImg
        ]
      };
      if (this.description === '') {
        newDishObj.description = null;
      } else {
        newDishObj.description = this.description;
      }
      let specifications = [];
      if (this.specList.length === 0) {
        newDishObj.specifications = null;
      } else {
        for (let i = 0; i < this.specList.length; ++i) {
          let temp = {
            name: this.specList[i].specNameModel,
            require: true,
            options: []
          };
          for (let j = 0; j < this.specList[i].specItemList.length; ++j) {
            if (this.specList[i].defaultName === this.specList[i].specItemList[j].nameModel) {
              temp.default = j;
            }
            temp.options.push({
              name: this.specList[i].specItemList[j].nameModel,
              delta: Number(this.specList[i].specItemList[j].priceModel)
            });
          }
          specifications.push(temp);
        }
        newDishObj.specifications = specifications;
      }
      let tag = [];
      for (let i = 0; i < this.tagList.length; ++i) {
        if (this.tagList[i].model !== '') {
          tag.push(this.tagList[i].model);
        }
      }
      if (tag.length === 0) {
        newDishObj.tag = null;
      } else {
        newDishObj.tag = tag;
      }
      // console.log('subFunction:', newDishObj);
      if (sign) {
        this.$store.dispatch('modifyDish', {
          id: this.dishId,
          data: newDishObj
        }).then((err) => {
          if (err) {
          } else {
            this.$store.dispatch('getDish').then((err) => {
              if (err) {
                this.errorMsg = err;
              } else {
                this.$router.push('/main/dish/management');
              }
            });
          }
        });
      } else {
        this.$store.dispatch('addDish', newDishObj).then((err) => {
          if (err) {
          } else {
            this.$store.dispatch('getDish').then((err) => {
              if (err) {
                this.errorMsg = err;
              } else {
                this.$store.commit('SAVE_CUR_CATENAME', this.dishCate);
                this.$router.push('/main/dish/management');
              }
            });
          }
        });
      }
    },
    addNewDish: function (sign) {
      // console.log(this.specList);
      if (this.$store.state.curImg === '') {
        this.isImgNull = 1;
      }
      if (this.dishName === '') {
        this.isNameNull = 1;
      }
      if (this.dishCate === '') {
        this.isCateNull = 1;
      }
      if (this.dishPrice === '') {
        this.isPriceNull = 1;
      }
      let flag = 0;
      for (let i = 0; i < this.specList.length; ++i) {
        if (this.specList[i].defaultName === '' || this.specList[i].nameModel === '') {
          flag = 1;
        }
        for (let j = 0; j < this.specList[i].specItemList.length; ++j) {
          if (this.specList[i].specItemList[j].nameModel === '') {
            this.specList[i].specItemList[j].isNull = 1;
            flag = 1;
          }
        }
      }
      if (this.isNameNull || this.isCateNull || this.isImgNull || this.isPriceNull ||
      this.isSizeOut || flag) {
        this.$Modal.warning({
          title: '菜品添加提示',
          content: '信息不完整,请补充必填信息'
        });
      } else {
        if (this.dishCateId === -1) {
          this.$store.dispatch('addCate', this.dishCate).then((err) => {
            if (err) {
              this.errorMsg = err;
            } else {
              this.dishCateId = this.$store.state.curNewCate;
              this.subFunction(sign);
            }
          });
        } else {
          this.subFunction(sign);
        }
      }
    },
    cancelAddDish: function () {
      this.$router.push('/main/dish/management');
    }
  },
  mounted () {
    let tempObj = this.$store.state.curDish;
    // console.log('newDish:', tempObj);
    if (tempObj.flag) {
      this.dishName = tempObj.name;
      this.dishCate = tempObj.category;
      this.dishCateId = tempObj.category_id;
      this.dishPrice = tempObj.price;
      this.description = tempObj.description;
      this.dishId = tempObj.dish_id;
      this.dishImg = tempObj.image_url[0];
      if (!this.description) {
        this.description = '';
      }

      if (tempObj.spicy === 0) {
        this.chilliModel = '不辣';
      } else if (tempObj.spicy === 1) {
        this.chilliModel = '微辣';
      } else if (tempObj.spicy === 2) {
        this.chilliModel = '中辣';
      } else {
        this.chilliModel = '特辣';
      }
      if (tempObj.tag) {
        for (let i = 0; i < tempObj.tag.length; ++i) {
          this.tagList.push({
            id: this.tagNum++,
            model: tempObj.tag[i]
          });
        }
      }
      if (tempObj.specifications) {
        for (let i = 0, len = tempObj.specifications.length; i < len; ++i) {
          this.specList.push({
            specId: this.specNum++,
            specNameModel: tempObj.specifications[i].name,
            subItemNum: 1,
            specItemList: []
          });
          for (let j = 0, sLen = tempObj.specifications[i].options.length; j < sLen; ++j) {
            this.specList[i].specItemList.push({
              subId: this.specList[i].subItemNum++,
              nameModel: tempObj.specifications[i].options[j].name,
              priceModel: tempObj.specifications[i].options[j].delta,
              isNull: 0
            });
          }
          this.specList[i].defaultName = this.specList[i].specItemList[tempObj.specifications[i].default].nameModel;
        }
      }
    }

    // 将this对象保存起来，防止冲突
    var that = this;
    var self = this.$store;
    document.getElementById('uploadImg').onchange = function () {
      // 获取当前选到的文件对象
      var imgFile = this.files[0];
      // console.log(this.files[0].size / 1024000);
      // 判断文件大小是否符合要求
      if ((this.files[0].size / 1024000) > 1) {
        that.isSizeOut = 1;
      } else {
        that.isSizeOut = 0;
        // 上传图片
        self.dispatch('uploadImg', this.files[0]).then((err) => {
          if (err) {
          } else {
            that.isImgNull = 0;
            // 使用FileReader将刚刚选择的图片显示出来
            var fr = new FileReader();
            fr.onload = function () {
              document.getElementById('dishImg').src = fr.result;
            };
            fr.readAsDataURL(imgFile);
          }
        });
      }
    };
  },
  beforeMount () {
    this.$store.commit('UPDATE_INDEX', 2);
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
.mainContanier {
  display: flex;
  min-height: 100vh;

  .right {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    width: 100%;

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
      padding: 0px 22px 0 22px;
      margin-top: 79px;
      margin-left: 163px;

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

          .curCateList {
            border:1px solid #e6e6e6;
            border-top: none;
            width:587px;
            font-size: 14px;
            position: absolute;
            background: #ffffff;
            z-index: 9999;
            div {
              padding: 10px;
              cursor: default;
            }
            div:hover {
              background:#fff8e3;
              border-radius:4px;
            }
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

              #dishImg {
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
            outline: none;
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

                .hintPart {
                  margin-bottom: 60px;
                }

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
            }
            .addNewSpecItem {
              margin-left: 164px;
              margin-bottom: 15px;

              >span {
                cursor: default;
              }
            }
          }

          .addNewSpecCate {
            margin-top: 26px;
            >span {
              cursor: default;
            }
          }

          .newSpecificationsHint {
            font-family:PingFangSC-Regular;
            font-size:14px;
            color:#dadada;
            margin-top: 10px;
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

            // .chilliImg {
            //   height: 20px;
            //   width: 20px;
            //   background: url('../../assets/images/spicy-grey.svg')
            // }

            // .chilliImg:hover {
            //   background: url('../../assets/images/chilli.svg')
            // }

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
              cursor: default;
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
