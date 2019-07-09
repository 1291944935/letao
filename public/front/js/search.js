$(function () {

  //用户获取localStory中的lt_history
  function getHistory() {
    var result = localStorage.getItem("lt_history") || "[]";
    result = JSON.parse(result);
    return result;
  }

  function render() {
    //1. 获取到存储在localStory中的数据 key的名字 lt_history
    var history = getHistory();
    //2. 准备模板，结合数据进行渲染
    $(".lt_history").html(template("tpl", { rows: history }));
  }
  //1. 渲染搜索的历史记录
  render();

  //2. 清空数据的功能
  $(".lt_history").on("click", ".btn_empty", function () {
    mui.confirm("你确定要清空所有的历史记录吗？", "温馨提示", ["是", "否"], function (e) {
      //通过e.index可以获取到点击的按钮的下标
      if (e.index === 0) {
        //删除数据
        localStorage.removeItem("lt_history");
        //重新渲染
        render();
      }
    });
  });

  //3. 删除数据
  $(".lt_history").on("click", ".btn_delete", function () {
    //获取下标
    var index = $(this).data("index");
    mui.confirm("你是否要删除这条历史记录？", "温馨提示", ["否","是"], function(e){
      if(e.index === 1){
        //获取数组
        var history = getHistory();
        //删除数组指定下标
        history.splice(index, 1);
        //把数组存回去
        localStorage.setItem("lt_history", JSON.stringify(history));
        //重新渲染
        render();
      }
    });
  });

  //4. 增加功能
  $(".lt_search button").on("click", function () {
    var txt = $(".lt_search input").val();
    $(".lt_search input").val('');
    if (txt === "") {
      mui.toast("请输入搜索的内容");
      return;
    }
    //获取历史记录
    var history = getHistory();
    //把输入的内容添加到历史记录
    var index = history.indexOf(txt);//获取txt在数组中的下标
    if (index > -1) {
      history.splice(index, 1);
    }
    //如果长度大于等于10，需要把数组的最后一条给删除
    if (history.length >= 10) {
      history.pop();
    }
    history.unshift(txt);
    //重新存回localStory
    localStorage.setItem("lt_history", JSON.stringify(history));
    //重新渲染
    render();

    //页面需要跳转
    location.href = "searchList.html?key="+txt;

  });


});