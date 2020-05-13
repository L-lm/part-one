// 电影评分，星星的数据转换
function convertToStartArray(stars){
  var num=stars.toString().substring(0,1);
  var array=[];
  for(var i=1;i<=5;i++){
    if(i<=num){
      array.push(1);
    }
    else{
      array.push(0);
    }
  }
  return array;
}

//名字拼接
function convertToCastString(casts){
  var castsjoin="";
  for(var idx in casts){
    castsjoin=castsjoin+casts[idx].name+"/";
    }
    return castsjoin.substring(0,castsjoin.length-2)
}

//
function convertToCastInfos(casts){
  var castArry=[];
  for(var idx in casts){
    var cast={
    img:casts[idx].avatars ? casts[idx].avatars.large :"",
    name:casts[idx].name
    }
    castArry.push(casts);
  }
  return castArry;
}
function http(url,callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": ""
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function () {
      console.log("调用失败")
    },
  })
}

module.exports={
  convertToStartArray: convertToStartArray,
  http:http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}
// [1,1,1,1,1][1,1,1,0,0]