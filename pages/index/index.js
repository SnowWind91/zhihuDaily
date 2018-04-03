//index.js


Page({
  data: {
    top_stories: [],
    stories: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  onLoad() {
    var that = this
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      success: function (res) {
        console.log(res);
        if (res.data.code == 404) {
          wx.showModal({
            title: '提示',
            content: 'API请求失败',
            showCancel: true
          })
        } else {
          that.setData({
            top_stories: res.data.top_stories,
            stories: res.data.stories
          })

          console.log(that.data.top_stories)
        }
      }
    })
  },
  toDetail(e) {
    console.log(e);
    let id = e.currentTarget.dataset.id; 
    wx.navigateTo({
      url: "/pages/detail/index?id="+id
    })
  }
})
