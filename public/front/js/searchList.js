$(function(){

  //用于获取地址栏中的参数
  function getSearch() {
    //1. 获取到地址栏中的key对应的值，把这个值放到搜索框中
    var search = location.search;
    //2. 地址栏对中文进行转码
    search = decodeURI(search);
    //3. 去掉?号
    search = search.slice(1);
    //4. 变成一个数组
    var arr = search.split("&");
    var obj = {};
    arr.forEach(function(e, i){
      var k = e.split("=")[0];
      var v = e.split("=")[1];
      obj[k] = v;
    });
    return obj;
  }

  var page = 1;
  var pageSize = 10;

  //获取地址栏中的参数
  var key = getSearch().key;
  //设置给input框
  $(".lt_search input").val(key);

  //发送ajax请求，获取搜索到事件数据
  $.ajax({
    type: 'get',
    url: '/product/queryProduct',
    data: {
      proName: key,
      page: page,
      pageSize: pageSize
    },
    success: function(info) {
      console.log(info);
      //结合模板引擎渲染出来
      $(".lt_product").html( template("tpl", info) );
    }
  })
});