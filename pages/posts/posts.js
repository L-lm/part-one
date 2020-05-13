// pages/posts/posts.js
var postsData=require('../../data/posts-data.js')
// 只能用相对路径
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 单项数据绑定 数据不能自动绑定页面修改 
    // 双向数据绑定 页面修改可以修改数据
  },
    // 不存在DOM结点
    // 小程序-数据绑定


  /**
   * 生命周期函数--监听页面加载
   * 向服务器提取数据
   */
  onLoad: function (options) {

    this.setData({
      posts_key:postsData.postList
      })
    // this.setData({ posts_content})ES6的简化形式
    // 相当于this.setData({posts_content：posts_content})ES6的简化形
    // wx:for="{{posts_content}}"  wx:for-itme的默认值就是"item"  
    // wx:for-index="index" 数组序号 从0开始
  },
  onPostTap:function(event){
    var postId=event.currentTarget.dataset.postid;
    //  console.log(postId)
    wx.navigateTo({
      url: "../posts/post-detail/post-detail?id="+postId
    })
  }
})