import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //输入框的值
    inputValue: "",
    //上次输入框的值
    lastValue: "",
    //搜索建议
    recommend: [],
    //开关
    loading: false,
    //本地存储历史记录
    history: []
  },


  onLoad: function (options) {
    //获取本地的存储
    let arr = wx.getStorageSync("history");
    //如果本地没有一个数组那就不是一个数组
    if (!Array.isArray(arr)) {
      arr = [];
    }

    this.setData({
      history: arr
    })
  },


  //监听输入框的输入事件
  handleInput(e) {
    const { value } = e.detail;
    this.setData({
      inputValue: value
    });

    //如果value有值才发起请求
    if (!value) {
      //把搜索建议的数组清空
      this.setData({
        recommend: []
      });
      return;
    };

    //请求搜索建议
    this.getRecommend();
  },

  //请求搜索的建议
  getRecommend() {

    //进去的时候灯是开着的
    if (this.data.loading == false) {

      //进门后开灯
      this.setData({
        loading: true,

        //记录当前的搜索输入框的值
        lastValue: this.data.inputValue
      })

      //请求搜索建议
      request({
        url: "/goods/qsearch",
        data: {
          query: this.data.inputValue
        }
      }).then(res => {
        const { message } = res.data;

        //保存到搜索建议的数组
        this.setData({
          recommend: message,
          loading: false    //出去的时候记得关灯
        });

        //判断是否是inputvalue值是最新 如果不是那就在次发送请求
        if (this.data.lastValue !== this.data.inputValue) {
          this.getRecommend();
        }

      })
    }
  },

  //点击取消按钮的时候触发
  handleButton() {

    //清空输入框的值和搜索建议的列表
    this.setData({
      inputValue: "",
      recommend: []
    })
  },
  
  //输入框失去焦点的时候触发
  handleBlur() {
    this.setData({
      recommend: []
    })
  },

  //清空本地的存储
  handleClear() {
    this.setData({
      history: []
    })


    //清空本地的历史数据
    wx.setStorageSync('history', [])
  },

  //按下回车按钮的事件
  handleEnten() {
    
    //每次存储之前先把本地的数据先获取回来
    let arr = wx.getStorageSync("history");

    //如果本地没有数据或者arr不是一个数组
    if (!Array.isArray(arr)) {
      arr = [];
    }

    //添加到数组的第一位
    arr.unshift(this.data.inputValue);

    //数组去掉重复的
    arr = [...new Set(arr)]

    //把关键词保存到本地
    wx.setStorageSync('history', arr)

    //跳转到商品搜索列表页
    wx.redirectTo({
      url: '/pages/goods_list/index?keyword=' + this.data.inputValue
    })
  }
})