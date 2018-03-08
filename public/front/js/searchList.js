$(function() {

    // 1. 根据搜索的关键字（search页跳转过来的）渲染出商品，并将关键字填充到input框中
    // 1.1 根据url地址获取到key值，填充到input框中
    // 1.2 发送ajax请求，传入的参数由变量param充当，param先传入三个必要参数
    // 1.3 根据数据和模板引擎渲染出商品
    var key = getSearch('key');
    $('.lt-search input').val(key);
    // console.log(key);
    function render() {
        var param = {};
        param.proName = key;
        param.page = 1;
        param.pageSize = 100;

        //对于price与num两个参数不一定要加
        //判断价格是否有now这个类，如果有now这个类，就需要传递price
        //判断库存是否有now这个类，如果有now这个类，就需要传递num
        //如果确定值：1 升序   2 降序

        var temp = $('.lt_sort a.now');  // 根据temp的长度来判断是否有now
        // console.log(temp);
        if(temp.length > 0) {   // 满足条件，需要排序
            var sortName = temp.data('type');   // 获取有now这个类的元素的data-type属性（price/num）
            var sortValue = temp.find("span").hasClass("fa-angle-down")?2:1;   // 根据箭头的类名来判断需传到后台的值
            //把sortName与sortValue添加给param
            param[sortName] = sortValue;
        }

        
        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: param,
            success: function(info) {
                // console.log(info);
                $('.index-product').html(template('tpl',info));
            }
        })
    }
    render();
    

    // 2. 点击搜索按钮，根据搜索的关键字来渲染页面
    // 2.1 给按钮注册点击事件
    // 2.2 获取输入框中输入的关键字
    // 2.3 发送ajax请求
    // 2.4 根据返回的数据和模板引擎渲染页面
    // 2.5 记录搜索历史
    $('.lt-search button').on('click',function() {
        // 把所有的a的now全部去掉，并且把a的箭头全部向下
        $('.lt_sort a').removeClass('now').find("span").removeClass('fa-angle-up').addClass('fa-angle-down');

        key = $('.lt-search input').val();
        render();

        var arr = JSON.parse(localStorage.getItem('search_list') || '[]');
        var index = arr.indexOf(key)
        if(index != -1) {
            arr.splice(index,1);
        }
        if(arr.length >= 10) {
            arr.pop();
        }
        arr.unshift(key);
        localStorage.setItem('search_list',JSON.stringify(arr));
    })

    // 3. 排序功能  
    // 根据是否有now类判断用户是否点击了“价格”或“库存”，跟据a标签中span的箭头的类来判断是升序还是降序
    // 3.1 给lt_sort 下的(有data-type属性的)a标签注册点击事件（价格、库存）
    // 3.2 判断点击对象是否有now类，如果没有，添加now类，并排他，使箭头向下（默认）
    //     如果有，改变点击对象下span的箭头方向
    $('.lt_sort a[data-type]').on('click',function() {
        var $this = $(this);    // 优化代码

        if($this.hasClass("now")){
            //切换箭头
            $this.find("span").toggleClass("fa-angle-up").toggleClass("fa-angle-down");
        }else {
            $('.lt_sort a[data-type]').removeClass('now');
            $this.addClass("now");
            //把所有的箭头都向下
            $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
        }

        // if( $this.hasClass('now') ) {
        //     $this.find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        //     console.log('有');
        // } else {
        //     $this.addClass("now").siblings().removeClass("now");
        //     $(".lt_sort span").removeClass('fa-angle-up').addClass('fa-angle-down');
        //     console.log('无');
        // }
        render();
    })
})