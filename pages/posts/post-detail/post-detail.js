// pages/posts/post-detail/post-detail.js
var postsData = require('../../../data/posts-data.js')

Page({
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var postId = options.id;
    this.setData({
      currentPostId:postId
    })
    var postData = postsData.postList[postId];
    // console.log(postData);
    // this.data.postData=postData;这个方法不行
    this.setData({
      postData: postData
    })
    
    var postsCollected = wx.getStorageSync("posts_Collected")
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      if (postCollected) {
        
        console.log(postCollected)
        this.setData({
          collected: postCollected
        })
      }
    }
    else {
      postsCollected = {}
      postsCollected[postId] = false;
      wx.setStorageSync("posts_Collected", postsCollected)
    }
  },
  onCollectionTap: function(events) {
    var postsCollected = wx.getStorageSync("posts_Collected");
    var postCollected = postsCollected[this.data.currentPostId];
    // 收藏变未收藏 未收藏变收藏
    postCollected =!postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    // 更新文章是否收藏的缓存值
    wx.setStorageSync("posts_Collected", postsCollected);
    // 更新数据绑定变量值,从而实现切换图片
    this.setData({
      collected: postCollected
    })
  },
  onShareTap:function(event){
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ好友",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor:"#405f80",
      success:function(res){
        wx.showModal({
          title: '用户'+itemList[res.tapIndex],
          content: '用户是否取消？'+res.cancel+"现在无法时间分享功能，什么时候可以支持"
        })
      }

    })
  },
  onMusicTap:function(event){
    wx.playBackgroundAudio({
      dataUrl: 'string',
      title
    })

  }

})