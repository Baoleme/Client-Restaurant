<template>
  <div class="mainContanier">
    <Menu />
    <div class="right">
      <TopLine class="top"/>
      <div class="content">
        <div class="firstPart">
          <div class="chooseDish">
            <Icon class="icon" type="ios-search-strong" size="23" color="#FCC138"></Icon>
            <Input class="input" placeholder="商品名称" clearable size="small"/>
          </div>
          <div class="goodsState">
            <span>商品状态</span>
            <CheckboxGroup v-model="filter" class="checkboxGroup">
              <Checkbox class="checkBox" label="售卖中"><span>售卖中</span></Checkbox>
              <Checkbox class="checkBox" label="已下架"><span>已下架</span></Checkbox>
            </CheckboxGroup>
          </div>
          <div class="newGruop">
            <Button type="ghost" class="newGroupBtn" @click="gotoNewCate">新建分类</Button>
            <Button type="info" class="newGroupBtn">新建菜品</Button>
          </div>
        </div>
        <div class="secondPart">
          <div class="category">
            <div class="">
              <div class="title">
                <span>菜品分类</span>
                <Icon type="gear-b" size="16" @click.native="editCategory" :class="{activeGear: isEditCate === true}"></Icon>
              </div>
              <div v-for="(item, index) in categories" :key="index">
                <div class="menuItem" @click="goto(index)" :class="{subActive: activeSubIndex === index}">
                  <div class="menuItemEdit">
                    <Icon class="iconMiddle" type="ios-minus-outline" color="#ff8b18" size="18" v-show="isEditCate === true" @click.native="delCate(categories[index].id)"></Icon>
                    <input class="menuIteminput" disabled="true" :class="{textActive: activeSubIndex === index}" :value="categories[index].name" @blur="changeCate(index)"/>
                  </div>
                  <span class="moveTips" v-show="isEditCate === false">按住拖动</span>
                </div>
              </div>
              <div class="menuItem" v-show="isEditCate === true & isAddNow === false" @click="newCateInput">
                <div class="menuItemEdit">
                  <Icon class="iconMiddle" type="ios-plus-outline" color="#ff8b18" size="18"></Icon>
                  <span class="menuIteminput">添加分类…</span>
                </div>
                <div></div>
              </div>
              <div v-show="isAddNow === true">
                <input type="text" placeholder="新分类名" class="addCateInput" v-model="newCateName">
                <Icon type="checkmark" color="#fe8966" size="15" class="checkmark" @click.native="addNewCate"></Icon>
              </div>
            </div>
          </div>
          <div class="detailPart">
            <div class="curCategory">
              <div class="curCategoryLeft">
                <span contenteditable="false" id="curCateName" :class="{isCurEdit: isCurEdit === true}">{{curCategory.name}}</span>
                <Icon type="edit" size="16" @click.native="editCurCate(curCategory.id)" :class="{isCurEditIcon: isCurEdit === true}"></Icon>
              </div>
              <!-- <div class="curCategoryLeft">
                <input  class="curCategoryInput" type="text" v-model="test">
                <Icon type="edit" size="16"></Icon>
              </div> -->
              <div class="curCategoryRight">快速编辑</div>
            </div>
            <div class="dishes">
              <div class="dish" v-for="(dish, index) in dishes" :key="index">
                <div class="tagLine">
                  <div class="leftTag">
                    <div class="rectangle"></div>
                    <div class="No">{{index+1}}</div>
                  </div>
                  <div class="rightTag">
                    <div class="tag" :class="{tagBlue: dish.state === '售卖中', tagGrey: dish.state === '已下架'}">
                      <div class="circle"></div><span>{{dish.state}}</span>
                    </div>
                    <div>
                      <img class="deleteBtn" src="@/assets/images/delete-button.png" alt="deleteBtn">
                    </div>
                  </div>
                </div>
                <div class="dishBody">
                  <div class="bodyLeft"><img class="dishImg" :src="dish.image_url"/></div>
                  <div class="bodyRight">
                    <div class="dishNameLine">
                      <span class="dishName">{{dish.name}}</span>
                      <div>
                        <img src="@/assets/images/chilli.svg" alt="chilli" class="chilli" v-if="dish.spicy > 2">
                        <img src="@/assets/images/chilli.svg" alt="chilli" class="chilli" v-if="dish.spicy > 1">
                        <img src="@/assets/images/chilli.svg" alt="chilli" class="chilli" v-if="dish.spicy > 0">
                      </div>
                    </div>
                    <div class="brief">{{dish.description}}</div>
                    <div class="tagList">
                      <span v-for="(tag, index) in dish.tag" :key="index" :class="{tag1: index % 4 === 0, tag2: index % 4 === 1, tag3: index % 4 === 2, tag4: index % 4 === 3}">{{tag}}</span>
                    </div>
                    <div class="price"><span>¥{{dish.price}}</span>起</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bottomHint">
              <div class="shortLine"></div>
              <p>已到达本分类底部</p>
              <!-- <p>继续滑动前往下一分类</p> -->
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
      // settings: {
      //   categories: ['售卖中', '已下架', '售卖中', '已下架'],
      // },
      activeSubIndex: 0,
      filter: ['售卖中', '已下架'],
      isEditCate: false,
      isAddNow: false,
      isCurEdit: false,
      newCateName: ''
    };
  },
  computed: {
    // mytest: {
    //   get: function () {
    //     return this.categories.slice();
    //   },
    //   set: function () {
    //     // return this.$store.state.categories;
    //   }
    // },
    categories () {
      return this.$store.state.categories;
    },
    curCategory () {
      return this.categories[this.activeSubIndex];
    },
    dishes: {
      get: function () {
        return this.$store.state.dishList[this.activeSubIndex].dish;
      },
      set: function () {
      }
    }
  },
  methods: {
    goto (index) {
      // console.log(index);
      this.activeSubIndex = index;
    },
    editCategory () {
      let menuItem = document.getElementsByClassName('menuIteminput');
      if (this.isEditCate) {
        this.isEditCate = false;
        this.isAddNow = false;
        for (let i = 0; i < menuItem.length; ++i) {
          menuItem[i].disabled = true;
        }
      } else {
        this.isEditCate = true;
        for (let i = 0; i < menuItem.length; ++i) {
          menuItem[i].disabled = false;
        }
      }
    },
    newCateInput () {
      this.isAddNow = true;
    },
    addNewCate () {
      this.isAddNow = false;
      if (this.newCateName !== '') {
        this.$store.dispatch('addCate', this.newCateName).then((err) => {
          if (err) {
            this.errorMsg = err;
          } else {
            this.newCateName = '';
          }
        });
      }
    },
    gotoNewCate () {
      this.isAddNow = true;
      this.isEditCate = true;
    },
    delCate (id) {
      // console.log(id);
      this.$store.dispatch('delCate', id).then((err) => {
        if (err) {
          this.errorMsg = err;
        } else {
        }
      });
    },
    changeCate (index) {
      let newName = document.getElementsByClassName('menuIteminput')[index].value;
      console.log(newName);
      this.$store.dispatch('changeCate', {
        name: newName,
        id: this.categories[index].id
      }).then((err) => {
        if (err) {
          this.errorMsg = err;
        } else {
        }
      });
    },
    changCurName (id) {
    },
    editCurCate (id) {
      if (this.isCurEdit) {
        document.getElementById('curCateName').contentEditable = false;
        let newName = document.getElementById('curCateName').innerText;
        console.log(newName);
        this.$store.dispatch('changeCate', {
          name: newName,
          id: id
        }).then((err) => {
          if (err) {
            this.errorMsg = err;
          } else {
          }
        });
      } else {
        document.getElementById('curCateName').contentEditable = true;
      }
      this.isCurEdit = !this.isCurEdit;
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

    .content {
      display: flex;
      flex: 10;
      flex-direction: column;
      background-color:#f6f6f6;
      padding: 22px 22px 0 22px;

      .firstPart {
        background-color: #ffffff;
        margin-bottom: 13px;
        height: 58px;
        border-radius:4px;
        display: flex;
        justify-content: space-between;

        .chooseDish {
          display: flex;
          margin: 14px 0 0px 3px;

          .icon {
            position: relative;
            left: 30px;
            z-index: 10;
            padding-top: 5px;
          }
          .input {
            width: 281px;
          }
        }

        .goodsState {
          margin-top: 20px;
          font-size: 14px;
          letter-spacing:1.12px;
          text-align:left;
          font-family:PingFangSC-Regular;
          color:#493f3a;
          flex: 1;
          padding-left: 100px;

          .checkboxGroup {
            display: inline-block;
            .checkBox {
              font-family:PingFangSC-Regular;
              font-size:14px;
              letter-spacing:1.12px;

              span {
                padding-left: 8px;
              }
            }
            .checkBox:nth-child(1) {
              padding-left: 34px;
            }
            .checkBox:nth-child(2) {
              padding-left: 20px;
            }
          }
        }

        .newGruop {
          margin: 17px 26px;

          .newGroupBtn {
            width: 86px;
            height: 26px;
            line-height: 1;
            margin-left: 20px;
          }
        }
      }

      .secondPart {
        display: flex;
        flex: 1;

        .category {
          background-color: #ffffff;
          border-radius:6px 0 0 0;
          width:207px;
          height:100%;
          box-shadow:0 2px 15px 0 rgba(193,193,193,0.42);
          z-index: 10;
          font-size:14px;

          .activeGear {
            color: #ff8b18;
          }

          .title {
            font-family:PingFangSC-Medium;
            letter-spacing:1.12px;
            text-align:left;
            padding: 18px 0 14px 20px;

            span {
              padding-right: 56px;
            }
          }

          .menuItem {
            width:167px;
            height:52px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: auto;
            cursor: default;
            text-align: left;

            .menuItemEdit {
              margin-left: 15px;
            }

            .menuIteminput {
              outline: none;
              border: none;
              width: 80px;
              margin-left: 5px;
              background: transparent;
            }

            // span:nth-child(1) {
            //   margin-left: 15px;
            // }
            .moveTips {
              right: 2px;
              font-size: 12px;
              margin-right: 11px;
              color: #ff8b18;
              opacity: 0;
            }

            .textActive {
              color: #ff8b18;
            }
          }

          .addCateInput {
            width: 138px;
            margin: auto;
            border:1px solid #ffc993;
            border-radius:4px;
            height:29px;
            padding: 2px 20px 2px 6px;
            outline: none;
            display: block;
            margin-top: 10px;
          }

          .checkmark {
            position: relative;
            right: -56px;
            bottom: 24px;
          }

          .menuItem:hover > .moveTips {
            opacity: 1;
          }

          .subActive {
            background:rgba(255,236,173,0.33);
            border-radius:6px;
          }
        }

        .detailPart {
          background-color: #ffffff;
          border-radius:0 6px 0 0;
          width: 100%;

          .curCategory {
            border-bottom:1px solid #e6e6e6;
            height:61px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .curCategoryLeft {
              font-family:PingFangSC-Light;
              font-size:20px;
              letter-spacing:1.12px;
              text-align:left;
              padding-left: 23px;

              .isCurEdit {
                border:1px solid #ffc993;
                border-radius:4px;
                padding: 0px 4px;
              }

              .isCurEditIcon {
                color: #ff8b18;
              }
            }
            .curCategoryRight {
              font-size: 12px;
              padding-right: 19px;
              cursor: default;
            }
          }

          .dishes {
            display: flex;
            flex-flow: row wrap;
            align-content: flex-start;

            .dish {
              flex: 0 0 46%;
              box-shadow:0 3px 4px 3px rgba(0,0,0,0.04);
              border-radius:5px;
              border: 1px solid #f0f0f0;
              height:164px;
              display: flex;
              flex-direction: column;

              .tagLine {
                flex: 0 0 11%;
                display: flex;
                justify-content: space-between;
                margin: 10px 0;

                .leftTag {
                  display: flex;
                  .rectangle {
                    background:#ff8b18;
                    width:5px;
                    height:16px;
                  }

                  .No {
                    font-size: 14px;
                    padding-left: 6px;
                    font-family:PingFangTC-Medium;
                  }
                }

                .rightTag {
                  display: flex;
                  .tag {
                    border-radius:4px;
                    width:60px;
                    height:17px;

                    .circle {
                      width:10px;
                      height:10px;
                      border-radius:100%;
                      display: inline-block;
                    }
                    span {
                      padding-left: 4px;
                    }
                  }

                  .tagBlue {
                    background: #edf8ff;

                    .circle {
                      background:#c8eaff;
                      border:2px solid #67c6ff;
                    }

                    span {
                      color: #67c6ff;
                    }
                  }

                  .tagGrey {
                    background: #f0f0f0;

                    .circle {
                      background:#ffffff;
                      border:2px solid #cecece;
                    }

                    span {
                      color:#9b9b9b;
                    }
                  }

                  .deleteBtn {
                    height: 15px;
                    width: 15px;
                    margin: 0 16px;
                  }
                }
              }

              .dishBody {
                display: flex;

                .bodyLeft {
                  .dishImg {
                    border-radius:3.15px;
                    width:105px;
                    height:105px;
                    margin: 10px;
                  }
                }

                .bodyRight {
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;

                  .dishNameLine {
                    margin: 8px 0 0px 0;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    flex: 1;

                    .dishName {
                      font-family:PingFangSC-Medium;
                      font-size:20px;
                      letter-spacing:0.31px;
                      overflow: hidden;
                      text-overflow:ellipsis;
                      white-space: nowrap;
                      width: 20vw;
                      text-align:left;
                    }

                    .chilli {
                      width:18px;
                      height:18px;
                      margin-top: 4px;
                    }
                  }

                  .brief {
                    font-family:PingFangSC-Light;
                    font-size:14px;
                    color:#9b9b9b;
                    letter-spacing:0.32px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    // width: 344px;
                    width: 24vw;
                    text-align: left;
                    flex: 1;
                  }

                  .tagList {
                    // margin-top: 5px;
                    flex: 1;

                    span {
                      padding: 2px 3px;
                      font-family:PingFangSC-Medium;
                      font-size: 13px;
                      height: 24px;
                      border-radius:3px;
                      margin-right: 5px;
                      letter-spacing:0.32px;
                    }

                    .tag1 {
                      border:1px solid #67c6ff;
                      color: #67c6ff;
                    }

                    .tag2 {
                      border:1px solid #a9d87a;
                      color:#a9d87a;
                    }

                    .tag3 {
                      border:1px solid #f8c86b;
                      color:#f8c86b;
                    }

                    .tag4 {
                      border:1px solid #ff9b7d;
                      color:#ff9b7d;
                    }
                  }

                  .price {
                    font-family:PingFangSC-Light;
                    font-size:15px;
                    color:#9b9b9b;
                    text-align:left;
                    flex: 1;
                    margin-bottom: 1px;
                    span {
                      font-family:PingFangSC-Medium;
                      font-size:23px;
                      color:#fe8966;
                      padding-right: 3px;
                    }
                  }
                }
              }
            }

            .dish:nth-child(2n+1) {
              margin: 25px 30px 0px 25px;
            }
            .dish:nth-child(2n) {
              margin: 25px 25px 0px 0;
            }
          }

          .bottomHint {
            font-family:PingFangSC-Regular;
            font-size:12px;
            color:#dadada;
            letter-spacing:0.86px;
            text-align:center;

            .shortLine {
              opacity:0.24;
              border-top:1px solid #979797;
              width:304px;
              height:1px;
              margin: auto;
              margin-bottom: 10px;
              margin-top: 43px;
            }

            p {
              margin-bottom: 15px;
            }
          }
        }
      }
    }
  }
  .iconMiddle {
    vertical-align: middle;
  }
}
</style>
