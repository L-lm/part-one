Page({
  onTap:function(){
    // wx.navigateTo({
    //   url: '../posts/posts'
    // })
    //该方法可返回原始页面



    // wx.redirectTo({
    //   url: '../posts/posts',
    // })
    wx.switchTab({
      url: '../posts/posts'
    });
    // 该方法只能返回主页面
    // console.log("onTap")
  },
})