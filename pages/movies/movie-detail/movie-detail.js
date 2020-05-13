// pages/movies/movie-detail/movie-detail.js
var util = require('../../../utils/utils.js')
var app = getApp();
Page({
  data: {
    movie:{},
    director:{}
  },
  onLoad: function(options) {
    var movieId = options.id;
    console.log(movieId);
    var url = app.globalData.doubanBase +
      "/v2/movie/subject/" + movieId;
      util.http(url,this.processDoubanData)
  },
  processDoubanData:function(data){
    console.log(data);
    var director={
      avatar:"",
      name:"",
      id:""
    }
    // 豆瓣返回数据directors,avatars
    //为什么该方法中的下标值都为0呢？
    // 因为data传递的数据只有一条，就是你点击的那一条
    if(data.directors[0]!=null){
      if(!data){
        return;
      }
      if(data.directors[0].avatars!=null){
        director.avatar=data.directors[0].avatars.large;
      }
      director.name=data.directors[0].name;
      director.id=data.directors[0].id;
    }
    var movie={
      //三元表达式：判断data.images是否存在，为true时显示图片 位false时图片显示位空
      movieImg:data.images ? data.images.large :"",
      country:data.countries[0],
      title:data.title,
      originalTitle:data.original_title,
      wishCount:data.wish_count,
      commentCount:data.comments_count,
      year:data.year,
      generes:data.genres.join("、"),
      stars: util.convertToStartArray(data.rating.stars),
      score:data.rating.average,
      casts:util.convertToCastString(data.casts),
      castsInfo:util.convertToCastInfos(data.casts),
      summary:data.summary
    }
    this.setData({
      movie:movie,
      director:director
    })
  },
  //点击显示大图预览
  viewMoviePostImg:function(event){
    var src=event.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src],//需要预览的图片http链接列表
      current:src //当前显示图片的http链接

    })
  },
})