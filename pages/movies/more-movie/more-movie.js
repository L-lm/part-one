// pages/movies/more-movie/more-movie.js
var util = require('../../../utils/utils.js')
var app = getApp();
Page({
  data: {
    movies:{},
    navigataeTitle: "",
    requestUrl:"",
    totalCount:0,
    isEmpty:true,
  },
  onLoad: function(options) {
    var category = options.category;
    this.data.navigataeTitle = category;
    switch(category){
      case "正在热映":
       var dataUrl =app.globalData.doubanBase +
          "/v2/movie/in_theaters";
      break;
      case "即将上映":
       var dataUrl = app.globalData.doubanBase
          + "/v2/movie/coming_soon";
      break;
      case "豆瓣Top250":
       var dataUrl = app.globalData.doubanBase
          + "/v2/movie/top250";
      break;
    }
    this.data.requestUrl=dataUrl;
    util.http(dataUrl, this.processDoubanData)
  },

  // 处理获取的电影数据
  processDoubanData: function (moviesDouban){
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
    var totalMovies={};

    // 绑定新加载的数据和旧的数据连接在一起
    if(!this.data.isEmpty){
      // 如果isEmpty是false,就把新加载的20条数据加到旧的数据后面
      totalMovies=this.data.movies.concat(movies);
    }
    else{
      // 如果是第一次加载数据isEmpty是true，此时不需要数据的连接
      totalMovies=movies;
      this.data.isEmpty=false;
    }
    this.setData({
      movies:totalMovies,
    });
    this.data.totalCount+=20;
    // 加载完成后隐藏loading
    wx.hideNavigationBarLoading();
  },

  // 获取传入的电影类型标题
  onReady: function(event) {
    wx.setNavigationBarTitle({
      title: this.data.navigataeTitle,
    })
  },
  // 下滑加载更多数据
  onScrollLower:function(event){
    console.log("触发")
    var nextUrl = this.data.requestUrl+"?start="+this.data.totalCount+"&count=20";
      util.http(nextUrl,this.processDoubanData);
      // 开始加载loading
      wx.showNavigationBarLoading();
  },
  // 点击跳转电影详情
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId,
    })
  },
})