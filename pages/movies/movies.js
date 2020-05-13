// pages/movies/movies.js
var util = require('../../utils/utils.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    containerShow: true,
    searchPanelShow: false,
    searchResult: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 三组api
    var inTheatersUrl = app.globalData.doubanBase +
      "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase +
      "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase +
      "/v2/movie/top250" + "?start=0&count=3";

    this.getMoiveListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMoiveListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMoiveListData(top250Url, "top250", "豆瓣Top250");

  },

  //搜索栏聚焦事件
  onBindFocus: function(event) {
    console.log("聚焦");
    this.setData({
      containerShow: false,
      searchPanelShow: true,
    })
  },

  // 搜索栏触发搜索
  onBindChange: function(event) {
    var text = event.detail.value;
    console.log(text);
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMoiveListData(searchUrl, "searchResult", "");
  },

  // 取消搜说
  onCancelImg: function(event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      // searchResult:{},
    })
    event.detail.value = ' ';
  },
  //通过catchtap="onMoreTap" 获取more-movie电影模块
  onMoreTap: function(event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category,
    })
  },

  // 点击跳转电影详情
  onMovieTap: function (event) {
    var movieId=event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieId,
    })
  },


  // 调用API连接豆瓣获取数据
  getMoiveListData: function(url, settedkey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": ""
      },
      success: function(res) {
        // console.log(res);
        that.processDoubanData(res.data, settedkey, categoryTitle);
      },
      fail: function() {
        console.log("调用失败")
      },
    })
  },






  // 从获取的电影数据中截取有用的信息，传入data{}中
  processDoubanData: function(moviesDouban, settedkey, categoryTitle) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        stars: util.convertToStartArray(subject.rating.stars)
      }
      movies.push(temp);
    }
    var readyData = {};
    readyData[settedkey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData);
  },

})