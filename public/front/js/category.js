// import { template } from "handlebars";

// 分类页js功能
$(function () {

  // 获取一级分类
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    success: function (info) {
      console.log(info)
      var html = template("tpl1", info)
      $(".category_left ul").html(html)
      renderSecond(info.rows[0].id);
    }
});

// 点击一级分类，动态渲染右侧二级分类内容
$(".category_left").on("click", "li", function () {
  $(this).addClass("now").siblings().removeClass("now");

  var id = $(this).data("id");
  renderSecond(id);

  mui('.category_right mui-scroll-wrapper').scroll().scrollTo(0,0,100);//100毫秒滚动到顶

})

function renderSecond(id) {
  $.ajax({
    type: "get",
    url: "/category/querySecondCategory",
    data: {
      id: id
    },
    success: function (info) {
      console.log(info)
      var html = template("tpl2", info)
      $(".category_right ul").html(html)
    }
  })
}



})