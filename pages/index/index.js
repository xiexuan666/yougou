import request from "../../utils/request.js";
Page({
  data: {
    //轮播图的数据
    banners: [],
    //菜单栏的数据
    menus:[]
  },
  onLoad() {
    //请求轮播图接口
    request({
      url: "/home/swiperdata"
    }).then(res => {
      console.log(res)
      //message是轮播图的数组
      const { message } = res.data;
      console.log(message)
      //赋值给banners
      this.setData({
        banners: message
      })
    })
  },
})