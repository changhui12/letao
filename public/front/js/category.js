$(function() {
    // 发送ajax请求，获取一级分类数据，并渲染
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategory',
        success: function(info) {
            // console.log(info);
            // 渲染一级分类
            $('.category-nav').html(template('firstTpl',info));

            // 渲染二级分类
            // 默认显示第一个一级分类下面的二级分类
            var id = info.rows[0].id;
            function renderSecond() {
                $.ajax({
                    type: 'get',
                    url: '/category/querySecondCategory',
                    data: {id: id},
                    success: function(info) {
                        // console.log(info);
                        $('.category-content').html(template('secondTpl',info));
                    }
                })
            }
            renderSecond(id);
            // 当点击一级分类时，需渲染出对应的二级分类
            $('.category-nav').on('click','li',function() {
                $(this).addClass('now').siblings().removeClass('now');
                id = $(this).data('id');
                renderSecond(id);
                //让区域滚动重新到0，0的位置
                mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,300);
            })
        }
    })
})