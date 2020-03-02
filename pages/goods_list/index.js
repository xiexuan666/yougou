import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //关键词
    keyword: '',
    //商品的列表
    goods: [],
    //加载中
    hasMore: 'true',
    //页面
    pagenum:1,
    //是否正在加载中
    loading:true
  },
  onLoad: function (options) {
    const { keyword } = options;
    this.setData({
      keyword
    });
    this.getGoods();
  },
  getGoods() {
    //如果没有更多了，就不会再请求了
    if (this.data.hasMore == false) {
      return;
    }
    setTimeout(v => {
      //请求商品列表
      request({
        url: "/goods/search",
        data: {
          query: this.data.keyword,  //关键词
          pagenum: this.data.pagenum, //页数
          pagesize: 10,
        }
      }).then(res => {
        const { message } = res.data;
        //修改godds下面的价格
        const goods = message.goods.map(v => {
          //给价格保留两个小数点
          v.goods_price = Number(v.goods_price).toFixed(2);
          return v
        })
        //把message 商品列表保存到list
        this.setData({
          //合并原来的商品和请求回来的商品
          goods: [...this.data.goods, ...goods],
          //当前这次请求完毕
          loading: false
        });
        // 判断这是否是最后一页
        if (this.data.goods.length >= message.total) {
          this.setData({
            hasMore: false
          })
        }
      })
    }, 2000)
  },


  //页面上拉的时候触发
  onReachBottom() {
    if (this.data.loading === false) {
      this.setData({
        //每次发送请求的的时候重新设置loagig为正在加载
        loading: true,
        //页数加1
        pagenum: this.data.loading + 1
      });
      //请求商品列表
      this.getGoods();
    }
  }
})