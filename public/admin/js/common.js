// common.js，这里面是所有的通用的js功能

//如果不是login页面，需要首先发送ajax请求，判断用户是否登录了
// if (location.href.indexOf("login.html") == -1) {
//   $.ajax({
//     type: "get",
//     url: "/employee/employeeLogout",
//     success: function(info){
//       if (info.error){
//         location.href = "login.html";
//       }
//     }
//   });
// }


//配置关闭了进度环，可配置也可不配置
// NProgress.configure({showSpinner: false });
//所有的ajax开始的时候，会触发的事件
$(document).ajaxStart(function(){
  NProgress.start();
});
//所有的ajax结束的时候，会触发的事件
$(document).ajaxStop(function(){
  NProgress.done();
});


//二级分类的显示与隐藏
//点击分类管理，显示与隐藏二级菜单；
$(".child").prev().on("click",function(){
  $(this).next().slideToggle();
})

//点击切换按钮，显示与隐藏侧边栏
$(".icon_menu").on("click",function(){
  $(".lt_aside").toggleClass("now");
  $(".lt_main").toggleClass("now");
});

//点击退出按钮，显示退出模态框
$(".icon_logout").on("click",function(){
  $("#tuichumotaikuang").modal("show")
})

//点击退出---确定按钮，退回到登录页面
$(".btn_logout").on("click",function(){
  console.log(111)
  $.ajax({
    type: "get",
    url: "/employee/employeeLogout",
    success: function(info){
      if (info.success) {
        location.href = "login.html";
      }
    }
  });
});
