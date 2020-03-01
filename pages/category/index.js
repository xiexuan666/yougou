import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    list:[]
  },
  //监听页面加载
  onLoad:function (options){
    //请求分类页的数据
    request({
      url:"/categories"
    }).then(res=>{
      //把数据列表保存到data
      const {message} = res.data;
      this.setData({
        list:message
      })
    })
  },
  //点击左边的菜单栏的时候触发
  handleClick(e){
    // index参数
    const {index} = e.currentTarget.dataset;
    //保存到当前点击的索引到data
    this.setData({
      current:index
    })
  } 
})