import request from "../../utils/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //商品的详情
    detail: {},
    //记录tab栏当前的索引
    current: 0,
    //预览图片
    picUrls: []
  },
  //监听页面加载
  onLoad: function (options) {
    console.log(options)
    request({
      url: "/goods/detail",
      data: {
        goods_id: options.id
      }
    }).then(res => {
      const { message } = res.data;
      //获取图片
      const picUrls = message.pics.map(v => {
        return v.pics_big
      });
      this.setData({
        detail: message,
        picUrls   //预览图片接口的使用
      })
    })
  },

  //商品详情的tab切换
  handleTab(e) {
    const { index } = e.currentTarget.dataset;

    this.setData({
      current: index
    })
  },

  //预览图片
  handlePice(e) {
    //获取当前点击的图片的索引值
    const { index } = e.currentTarget.dataset;

    wx.previewImage({
      //当前显示的图片
      current: this.data.picUrls[index],
      //预览图片的http链接
      urls: this.data.picUrls,
    })
  },
  //跳转到购物车页面
  hanleCart() {
    wx.switchTab({
      url: '/pages/cart/index'
    })
  }
})