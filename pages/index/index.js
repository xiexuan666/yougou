import request from "../../utils/request.js";
Page({
  data: {
    //轮播图的数据
    banners: [],
    //菜单栏的数据
    menus:[],
    //楼层
    floors:[],
    //是否回到顶部
    isShowTop:[]
  },
  onLoad() {
    //请求轮播图接口
    request({
      url: "/home/swiperdata"
    }).then(res => {
      //message是轮播图的数组
      const { message } = res.data;
      //赋值给banners
      this.setData({
        banners: message
      })
    })
    //请求中间导航接口
    request({
      url:"/home/catitems"
    }).then(res => {
      const {message}  = res.data;
      this.setData({
        menus:message
      })
    })
    //请求楼梯层
    request({
      url:"/home/floordata"
    }).then(res => {
      console.log(res)
      const {message} = res.data;
      this.setData({
        floors:message
      });
    })
  },
  //小程序回到顶部
  handleToTop(){
    wx.pageScrollTo({
      scrollTop: 0,
      duration:300
    })
  },
})