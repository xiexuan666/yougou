// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //收货地址
    address: {},
    //本地商品列表
    goods: [],
    // 总价格
    allPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取本地的收货地址
    this.setData({
      // 如果本地没有address就等于一个空对象
      address: wx.getStorageSync("address") || {}
    })
  },



  onShow() {
    // 因为data和onload只会执行一次，所以需要在每次打开页面都获取一次本地的数据
    this.setData({
      goods: wx.getStorageSync("goods") || []
    });

    // 计算总价格
    this.handleAllPrice();
  },


  // 获取收货地址
  handleGetAddress() {
    wx.chooseAddress({
      success: (res) => {
        // 把收货地址保存到data
        this.setData({
          address: {
            // 收货人
            name: res.userName,
            // 手机号码
            tel: res.telNumber,
            // 详细地址
            detail: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        });
        // 保存到本地
        wx.setStorageSync('address', this.data.address);
      }
    })
  },


  // 计算总价格
  handleAllPrice() {
    let price = 0;
    // 循环添加商品的价格
    this.data.goods.forEach(v => {
      // v是数组的对象
      price += v.goods_price * v.number;
    })

    // 修改总价格
    this.setData({
      allPrice: price
    })

    // 修改本地的数据
    wx.setStorageSync("goods", this.data.goods)
  },

  //数量加1
  handleJian(e) {
    //index是点击的索引值，number是1，也可能是-1
    const {
      index,
      number
    } = e.currentTarget.dataset;

    //给当前点击的视频数量加1，但是页面不会刷新
    this.data.goods[index].number += number;

    //判断如果数量为0时候，提示用户可不可以商品
    if (this.data.goods[index].number === 0) {

      //弹窗
      wx.showModal({
        title: '提示',
        content: '是否删除商品',
        success: (res) => {
          //确认删除
          if (res.confirm) {
            //删除商品
            this.data.goods.splice(index, 1)
          } else {
            //如果点击取消的话就重新加1
            this.data.goods[index].number += 1;
          }

          //重新data的goods的值
          this.setData({
            goods: this.data.goods
          })
        }
      })
    }

    //重新修改datagoods的值
    this.setData({
      goods: this.data.goods
    });

    //计算总价
    this.handleAllPrice();
  },

  //通过输入框编辑商品的数量
  handleBlur(e) {
    //index点击的商品
    const {
      index
    } = e.currentTarget.dataset;
    //value输入框的值
    let {
      value
    } = e.detail;
    //转换数量
    value = Math.floor(Number(value))
    // 如果数量小于1，就等于1
    if (value < 1) {
      value = 1;
    }
    // 修改商品的数量
    this.data.goods[index].number = value;
    //重新修改data的goods的值
    this.setData({
      goods: this.data.goods
    });
    //计算总价格
    this.handleAllPrice();
  },

  //点击选中的图标
  handleSelect(e) {
    const {index} = e.currentTarget.dataset;
    console.log(e)
    //当商品选中的状态
    const {select} = this.data.goods[index];
    //取反修改当前选中的状态
    this.data.goods[index].select = !select;

    //修改data里面的goods的值
    this.setData({
      goods: this.data.goods
    });
    //计算总价格
    this.handleAllPrice();

    //判断全选状态
    this.handleAllSelect();
  },

  //判断全选中的状态
  handleAllSelect() {

    //一开始商品全部选中
    let currentSelect = true;

    //遍历全部的商品， 只要有一个商品的状态是false，，那就等于false
    this.data.goods.forEach(v => {
      //如果有一个商品是false，后面就不用判断了
      if (currentSelect === false) {
        return;
      }

      //把选中的状态改成false
      if (v.select === false) {
        currentSelect = false;
      }
    });
    
    //保存全选状态
    this.setData({
      allSelect:currentSelect
    });
  },

   //点击全选的触发
  handleTabAllSelect() {
    const {allSelect} = this.data;

    //循环每个商品的状态
    this.data.goods.forEach (v => {
      v.select =! allSelect
    });
 
   this.setData ({
     //重新修改data的goods的值
     goods:this.data.goods,
     //保存全选的状态
     allSelect : !allSelect
   })

    //计算总价格
    this.handleAllPrice();

  }
})