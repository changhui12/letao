/**
 * Created by HUCC on 2018/3/5.
 */
$(function () {

  //1. 发送ajax请求，加载一级分类的数据
  $.ajax({
    type:'GET',
    url:'/category/queryTopCategory',
    success:function (info) {
      //console.log(info);
      $(".first").html( template("firstTpl", info) );

      //渲染2级分类
      renderSecond(info.rows[0].id);
    }
  });


  //2. 点击一级菜单，重新渲染二级菜单
  $(".first").on("click", "li", function () {

    $(this).addClass("now").siblings().removeClass("now");

    var id = $(this).data("id");
    renderSecond(id);

    //让区域滚动重新到0，0的位置
    mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,300);
  });


  //渲染二级分类的函数
  function renderSecond(id) {
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data: {
        id:id
      },
      success:function (info) {
        console.log(info);
        $(".second").html( template("secondTpl", info) );
      }
    })
  }




});