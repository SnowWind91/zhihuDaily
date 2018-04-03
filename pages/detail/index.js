//detail.js
var WxParse = require('../wxParse/wxParse.js');
Page({
  data: {
    storyId:'',
    story:{},
    body: '',
    topImg:'',
    image_source:'',
    title:''
  },
  onLoad: function (e) {
    var storyId = e.id;
    this.data.storyId = storyId;
  },
  onShow: function () {
    var that = this;
    // 初始化原数据
    wx.showLoading();
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/' + that.data.storyId,
      success: (res) => {
        console.log(res);
        wx.hideLoading();
        if (res.statusCode != 200) {
          wx.showModal({
            title: '错误',
            content: res.errMsg,
            showCancel: false
          })
          return;
        }
        WxParse.wxParse('article', 'html', res.data.body, that, 5)
        that.setData({
          story: res.data,
          topImg: res.data.image,
          title:res.data.title,
          image_source: res.data.image_source
          // body: res.data.body.replace(/div/g, 'view')
        });
      }
    })
  }
})