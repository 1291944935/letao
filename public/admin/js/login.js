$(function() {
  // 表单校验功能
  // 1,初始化表单校验，找到表单，调用bootstrapValidator
   $("form").bootstrapValidator({
     //0.1. 指定校验字段
     fields: {
      // 校验用户名，对应name表单的name属性
      username: {
        validators: {
          notEmpty: {
            message:"用户名不能为空"
          },
          stringLength:{
            message:"用户名长度必须是3-9位",
            min: 3,
            max: 9
          },
          callback: {
            message: "用户名不正确"
          }
        }
      },
      password: {
        validators: {
           //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '用密码长度必须是6-12位'
          },
          callback: {
            message: "密码不正确"
          }
        }
      }
     },
      //0.2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    }
   });

   //2,当表单校验成功的时候，阻止表单的跳转，并且使用ajax进行数据的提交
   //成功的时候触发。
  $("form").on("success.form.bv",function(e){
    e.preventDefault(),
    //发送ajax请求
    $.ajax({
      type:"post",
      url: "/employee/employeeLogin",
      data: $("form").serialize(),
      success: function (info){
        if(info.success) {
          //跳转首页
          location.href = "index.html";
        }
        
        if(info.error === 1000) {
          //手动让username校验失败
          //参数1，更新哪个字段
          //参数2，更新为什么状态 INVALID   VALID
          $("form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }

        if(info.error === 1001) {
          $("form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }
      }
    })


  })

  //3,重置表单样式
  $("[type='reset']").on("click",function(){
    $("form").data("bootstrapValidator").resetForm(true);
  });






})